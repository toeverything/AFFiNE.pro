<template lang="pug">
.release-card.inline-flex.flex-col(
  ref="el"
)
  .card-wrapper.inline-flex.flex-col.items-center(
    :enableParallax="!$device.isMobile"
    :lightSize="340"
  )
    .update-frequency( v-html="updateFrequency" )
    //- .release-tag( v-if="hasAssets" ) {{ tag_name.substring(1) }}
    .card-icon(
      :style="{ backgroundImage: `url(${icon})` }"
    )
    .card-title Download AFFiNE
    .card-desc.text-center( v-html="desc" )
    brand-glow-button(
      @click="() => handleDownloadClick(defaultAsset, title)"
      :needShadow="!tag_name?.includes('canary')"
      :disabled="!hasAssets"
    )
      | {{ hasAssets ? $t('download') : $t(isObsolete ? 'outdated' : 'comingSoon') }}
      | {{ $t('for') }}{{ defaultAssetPlatformName }}

    .download-other-version(
      @click="isShowOtherVersionModal = true"
    ) Click here to download other version

    .other-version.hidden( v-if="hasAssets" )
      .other-version-title.flex.items-center(
        :class="{ 'is-active': isShowOtherVersion }"
        @click="() => isShowOtherVersion = !isShowOtherVersion"
      )
        nuxt-icon( name="ArrowRightSmall" )
        | {{ $t('downloadPage.otherVersion') }}

      el-collapse-transition
        .expand-container( v-show="isShowOtherVersion" )
          template( v-if="assetsMap.mac.length" )
            .other-version-title {{ $t('downloadPage.otherVersionFor') }} {{ Platform.Mac }}
            ul
              li( v-for="asset in assetsMap.mac" )
                nuxt-link( :to="asset.url" ) {{ asset.name }}

          template( v-if="assetsMap.windows.length" )
            .other-version-title  {{ $t('downloadPage.otherVersionFor') }} {{ Platform.Win }}
            ul
              li( v-for="asset in assetsMap.windows" )
                nuxt-link( :to="asset.url" ) {{ asset.name }}

          template( v-if="assetsMap.linux.length" )
            .other-version-title  {{ $t('downloadPage.otherVersionFor') }} {{ Platform.Linux }}
            ul
              li( v-for="asset in assetsMap.linux" )
                nuxt-link( :to="asset.url" ) {{ asset.name }}

  .info-tips.mt-14px( v-if="tips" ) {{ tips }}

  download-canary-modal(
    v-if="title == 'Canary'"
    v-model="isShowCanaryModal"
    :releases="releases"
    :defaultAsset="defaultAsset"
  )

  el-dialog.other-version-modal(
    v-model="isShowOtherVersionModal"
    width="346px"
    title="Other Version"
    append-to-body
  )
    template( v-if="assetsMap.mac.length" )
      .other-version-title {{ $t('downloadPage.otherVersionFor') }} {{ Platform.Mac }}
      ul.other-version
        li( v-for="asset in assetsMap.mac" )
          nuxt-link( :to="asset.url" ) {{ asset.name }}

    template( v-if="assetsMap.windows.length" )
      .other-version-title  {{ $t('downloadPage.otherVersionFor') }} {{ Platform.Win }}
      ul.other-version
        li( v-for="asset in assetsMap.windows" )
          nuxt-link( :to="asset.url" ) {{ asset.name }}

    template( v-if="assetsMap.linux.length" )
      .other-version-title  {{ $t('downloadPage.otherVersionFor') }} {{ Platform.Linux }}
      ul.other-version
        li( v-for="asset in assetsMap.linux" )
          nuxt-link( :to="asset.url" ) {{ asset.name }}
</template>

<script setup lang="ts">
import { useMouseInElement, useDateFormat } from '@vueuse/core'

const el = ref(null)
const isShowOtherVersionModal = ref(false)
const isShowCanaryModal = ref(false)
const { isOutside } = useMouseInElement(el, { handleOutside: false })

const props = defineProps<{
  isLatest: boolean
  isShowTitleGlow: boolean
  title: string
  desc: string
  updateFrequency: string
  icon: string
  tips?: string
  tag_name: string
  prerelease: boolean
  published_at: string
  releases: Record<string, Release>
  assets: Asset[]
}>()

const Platform = {
  Mac: 'macOS',
  MacArm: 'Apple Silicon (Arm64)',
  Win: 'Windows',
  Linux: 'Linux'
}

const mixpanel = useMixpanel()
const $device = useDevice()
const isObsolete = computed(() => !props.isLatest && !props.isShowTitleGlow)
const publishDate = useDateFormat(new Date(props.published_at || Date.now()), 'MMM DD, YYYY')
const hasAssets = computed(() => !isObsolete.value && !!props.tag_name && props.assets.length > 0)
const isArm64 = ref(false)
const isShowOtherVersion = ref(false)

const isWinAsset = (asset: Asset) => asset.name.includes('windows')
const isWinExeAsset = (asset: Asset) => isWinAsset(asset) && asset.name.endsWith('.exe')
const isMacAsset = (asset: Asset) => asset.name.includes('macos')
const isMacArmAsset = (asset: Asset) => isMacAsset(asset) && asset.name.includes('arm64')
const isLinuxAsset = (asset: Asset) => asset.name.includes('linux')

const defaultAssetPlatformName = computed(() => {
  const asset = defaultAsset.value
  if (!asset) return

  if (isMacArmAsset(asset)) return Platform.MacArm
  if (isMacAsset(asset)) return Platform.Mac
  if (isWinAsset(asset)) return Platform.Win
  if (isLinuxAsset(asset)) return Platform.Linux
})

const defaultAsset = computed(() => {
  let asset
  const assets = props.assets || []

  if ($device.isMobileOrTablet) {
    asset = assets.find(el => isWinExeAsset(el))
  } else if ($device.isMacOS) {
    asset = isArm64.value
      ? assets.find(el => isMacArmAsset(el))
      : assets.find(el => !isMacArmAsset(el) && isMacAsset(el))
  } else if ($device.isWindows) {
    asset = assets.find(el => isWinExeAsset(el))
  }

  if (!asset) {
    asset = assets[0]
  }

  return asset
})

const assetsMap = computed(() => {
  let mac: Asset[] = []
  let windows: Asset[] = []
  let linux: Asset[] = []

  props.assets.map(asset => {
    if (isMacAsset(asset)) {
      return mac.push(asset)
    }
    if (isWinAsset(asset)) {
      return windows.push(asset)
    }
    if (isLinuxAsset(asset)) {
      return linux.push(asset)
    }
  })

  mac = mac.filter(el => el.name !== defaultAsset.value.name)
  windows = windows.filter(el => el.name !== defaultAsset.value.name)
  linux = linux.filter(el => el.name !== defaultAsset.value.name)

  return {
    mac,
    windows,
    linux,
  }
})

const handleDownloadClick = (asset: Asset, type?: string) => {
  if (type === 'Canary') {
    isShowCanaryModal.value = true
    return
  }
  if (!asset) return
  mixpanel.track('Button', { 'resolve': type })
  var link = document.createElement('a')
  link.download = asset.name
  link.href = asset.url
  link.click()
}

onBeforeMount(async () => {
  const { architecture } = await navigator.userAgentData?.getHighEntropyValues(['architecture'])
  if (architecture?.includes('arm')) {
    isArm64.value = true
  }
})

</script>

<style lang="stylus">
.release-card
  transform: perspective(800px) scale(var(--scale, 1))
  transform-style: preserve-3d

  .card-wrapper
    width: 100%
    border-radius: 16px;
    padding: 30px
    gap: fluid-value(16, 18)
    --light-color:rgba(#1E96EB, 0.1)

    .update-frequency
      margin-top: -1em

    .svg-icon-drawing
      position absolute
      top: 84px

      svg
        width: 151px
        height: 8px

    .release-tag
      margin: -1em
      font-size: fluid-value(11, 14)

    .card-title
      position: relative
      font-weight: 500;
      font-size: fluid-value(36, 40)
      line-height: 1
      line-height: 119.444%
      letter-spacing: (-1.6/40em)
      margin-bottom: -8px

      .title-glow
        position: absolute
        width: 200%
        aspect-ratio: 1/0.07
        border-radius: 45px
        background: rgba(255, 255, 255, 0.80)
        filter: blur(27.5px)
        left: 50%
        top: 50%
        transform: translate3d(-50%, -50%, 0)

    .card-icon
      width: fluid-value(180, 180)
      aspect-ratio: 1/1
      background-size: contain
      margin-bottom: 14px

    .card-desc
      white-space: pre-line
      font-size: fluid-value(14, 16)
      line-height: (20/16);
      max-width: 418px
      margin-bottom: 14px

  .brand-glow-button
    padding: 0 65px

  .platform-name
    margin-top: -0.3em
    font-size: 14px;
    line-height: 17px;

    @media $mediaInXS
      margin-top: -0.5em

  .publish-date
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    margin-top: -0.5em

  .info-tips
    font-weight: 500;
    font-size: 16px;
    line-height: (20/16);
    padding-left: 24px
    position relative

    &:before
      content: ''
      display: inline-block
      position absolute
      top: 8px
      left: 10px
      width: 4px
      height: 4px
      border-radius: 50%
      background-color: currentColor
      margin-right: 10px

.other-version-modal
  border-radius: 16px
  --el-dialog-padding-primary: 24px;

  .el-dialog__body
    padding: 14px 24px 14px

  .el-dialog__title
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 27px; /* 135% */
    letter-spacing: -0.4px;

  .el-dialog__close
    font-size: 20px

  .other-version
    width: 100%
    padding: 0 12px
    padding-left: 16px

    @media $mediaInXS
      font-size: 12px

    a
      line-height: 220.02%;
      text-underline-offset: 3px
      margin-bottom: 12px

      &:hover
        opacity: 0.85

  .other-version-title
    line-height: 24px;
    font-weight: 500;
    font-size: 16px;
    color: #8E8D91
    gap: 14px

    .nuxt-icon
      transition: 368ms
      transform: rotate(180deg)

    &.is-active
      .nuxt-icon
        transform: rotate(270deg)
</style>
