<template lang="pug">
.release-card.inline-flex.flex-col
  hover-spotlight-card.card-wrapper.inline-flex.flex-col.items-center(
    :enableParallax="!$device.isMobile"
    :lightSize="340"
  )
    .card-title {{ title }}
    .release-tag( v-if="hasAssets" ) {{ tag_name.substring(1) }}
    .card-icon(
      :style="{ backgroundImage: `url(${icon})` }"
    )
    .card-desc.text-center {{ desc }}
    brand-glow-button(
      @click="() => handleDownloadClick(defaultAsset)"
      :disabled="!hasAssets"
    ) {{ hasAssets ? $t('download') : $t('comingSoon') }}

    .platform-name( v-if="defaultAsset" )
      | {{ $t('for') }}
      | {{ defaultAssetPlatformName }}

    .other-version( v-if="hasAssets" )
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

</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  desc: string
  icon: string
  tips?: string
  tag_name: string
  prerelease: boolean
  assets: Asset[]
}>()

const Platform = {
  Mac: 'macOS',
  MacArm: 'Apple Silicon (Arm64)',
  Win: 'Windows',
  Linux: 'Linux'
}

const $device = useDevice()
const hasAssets = computed(() => props.tag_name && props.assets.length)
const isArm64 = ref(false)
const isShowOtherVersion = ref(false)

const isWinAsset = (asset: Asset) => asset.name.includes('windows')
const isWinExeAsset = (asset: Asset) => isWinAsset(asset) && asset.name.endsWith('.exe')
const isMacAsset = (asset: Asset) => asset.name.includes('macos')
const isMacArmAsset = (asset: Asset) => isMacAsset(asset) && asset.name.endsWith('arm64.dmg')
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

const handleDownloadClick = (asset: Asset) => {
  if (!asset) return
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
  transform: perspective(800px)
  transform-style: preserve-3d

  .card-wrapper
    width: 100%
    background: #1B1B1B;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    padding: 30px
    gap: fluid-value(24, 38)

    .release-tag
      margin: -1em
      font-size: fluid-value(11, 14)

    .card-title
      font-weight: 800;
      font-size: fluid-value(24, 32)
      line-height: 1

    .card-icon
      width: fluid-value(70, 134)
      aspect-ratio: 1/1
      background-size: contain

    .card-desc
      white-space: pre-line
      font-weight: 700
      font-size: fluid-value(14, 16)
      line-height: (20/16);

  .brand-glow-button
    padding: 0 65px

  .platform-name
    margin-top: -1.5em
    font-size: 14px;
    line-height: 17px;

    @media $mediaInXS
      margin-top: -0.5em

  .other-version
    width: 100%
    padding: 0 12px

    @media $mediaInXS
      font-size: 12px
      padding: 0 0

    ul
      padding-left: 24px
      margin: 4px

      a
        line-height: 220.02%;
        text-decoration: underline
        text-underline-offset: 3px
        &:hover
          opacity: 0.85

  .other-version-title
    height: 32px
    font-weight: 600;
    font-size: 16px;
    line-height: 220.02%;
    color: var(--primary-gray)
    gap: 14px
    cursor pointer

    .nuxt-icon
      transition: 368ms
      transform: rotate(180deg)

    &.is-active
      .nuxt-icon
        transform: rotate(270deg)

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
</style>