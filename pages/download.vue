<template lang="pug">
.page.page-download

  .section-hero
    .container.flex.flex-col.items-center
      .hero-headline
        | {{ $t('downloadPage.headline') }}
        .hero-try-action
          | {{ $t('downloadPage.headlineLinkYouCanTry') }}
          track-link(
            :to="PATH.AFFINE_DOWNHILLS" v-mobile-intercept target="_blank"
            action="Link"
            :params="{ 'resolve': 'Online Demo' }"
          ) {{ $t('downloadPage.headlineLink') }}

      .release-tabs.flex.gap-4(
      )
        circle-loading(
          v-if="!tabs.length"
        )
        template(
          v-else
        )
          .release-tab.flex(
            v-for="(tab, index) in tabs"
            :class="{ 'is-current': index === currentTabIndex}"
            @click="() => currentTabIndex = index"
          )
            .text-wrapper.flex
              .info-name( v-if="tab.name" ) {{ tab.name }}
              .info-version {{ tab.version }}

          nuxt-link.release-tab.flex(
            :to="`${PATH.AFFiNE_GITHUB}/releases`"
            target="_blank" rel="nofollow"
          )
            .text-wrapper
              .info-version More

      .release-cards.flex.items-start
        release-card(
          v-for="data in releaseCards"
          :key="data.name"
          :isLatest="currentTabIndex === 0"
          :isShowTitleGlow="data.title == 'Stable'"
          :releases="finalReleases"
          v-bind="data"
        )

      .mobile-version-notes
        nuxt-icon( name="mobile" filled )
        | {{ $t('downloadPage.mobileVersionNotes') }}

  .section-why
    .container.flex.flex-col.items-start
      .section-subtitle.text-brand-grad {{ $t('downloadPage.why') }}
      ul.reason-list
        li {{ $t('downloadPage.reasonA') }}
        li {{ $t('downloadPage.reasonB') }}
        li {{ $t('downloadPage.reasonC') }}
        li {{ $t('downloadPage.reasonD') }}

  .section-sns
    overview-sns
</template>

<script lang="ts" setup>
import semver from 'semver'
import { PATH } from '~/utils/constants'
import { primaryAPI } from '~/apis'

import betaIconUrl from '~/assets/download/beta.png'
import canaryIconUrl from '~/assets/download/canary.png'
import stableIconUrl from '~/assets/download/stable.png'

const { t } = useI18n()

enum ReleaseType {
  Beta = 'beta',
  Canary = 'canary',
  Stable = 'stable',
}

const tabs = ref<ReleaseType[]>([])
const currentTabIndex = ref(0)

const finalReleases = computed(() => {
  const currentTab = tabs.value[currentTabIndex.value]

  if (!currentTab) return releases

  return Object.assign({}, releases, currentTab.releaseMap)
})

const releases: Record<string, Release> = reactive({
  beta: {
    tag_name: '',
    prerelease: false,
    assets: []
  },
  canary: {
    tag_name: 'v0.5.4-canary.3',
    prerelease: true,
    assets: []
  },
  stable: {
    tag_name: '',
    prerelease: false,
    assets: []
  },
})

const releaseCards = computed(() => {
  return [
    {
      title: t('downloadPage.beta'),
      updateFrequency: t('downloadPage.betaUpdateFrequency'),
      desc: t('downloadPage.betaDesc'),
      icon: betaIconUrl,
      ...finalReleases.value.beta
    },
    {
      title: t('downloadPage.stable'),
      updateFrequency: t('downloadPage.stableUpdateFrequency'),
      desc: t('downloadPage.stableDesc'),
      icon: stableIconUrl,
      ...finalReleases.value.stable
    },
    {
      title: t('downloadPage.canary'),
      desc: t('downloadPage.canaryDesc'),
      updateFrequency: t('downloadPage.canaryUpdateFrequency'),
      icon: canaryIconUrl,
      // tips: t('downloadPage.manuallyUpdateTips'),
      ...finalReleases.value.canary
    },
  ]
})

const loadData = async () => {
  const isBeta = (release: Release) => !release.prerelease && release.tag_name.includes('beta')
  const isCanary = (release: Release) => release.prerelease && release.tag_name.includes('canary')
  const isStable = (release: Release) => !release.prerelease
  const hasRelease = (release: Release) => release.tag_name && release.assets.length
  const getReleaseType = (release: Release) => {
    if (isBeta(release)) return ReleaseType.Beta
    if (isCanary(release)) return ReleaseType.Canary
    if (isStable(release)) return ReleaseType.Stable
    return null
  }

  try {
    tabs.value = await primaryAPI.getReleaseTabs()
  } catch(error) {
    // @TODO: handle request error
    console.log('[download] loadData error', error)
  }
}

useHead({
  title: t('download')
})

await loadData()
</script>

<style lang="stylus">
.page-download

  .section-hero
    min-height: 80vh
    padding: fluid-value(59, 108) 20px

    .hero-headline
      max-width: 1047px
      font-size: fluid-value(24, 36)
      line-height: 44/36
      font-weight: 800
      margin-bottom: fluid-value(81, 100)

      .hero-try-action
        font-weight: 400
        font-size: fluid-value(16, 24)
        margin-top: fluid-value(16, 24)

        a
          font-weight: 800

      @media $mediaInXS
        max-width: 280px

      a
        transition: 318ms
        position relative

        &:after
          content: ''
          position: absolute
          left: 0
          bottom: 0px
          width: 100%
          height: 2px
          background-color: white
          transition: 318ms

        &:hover
          color: var(--link-hover-color)

          &:after
            background-color: var(--link-hover-color)

    .release-cards
      margin-bottom: fluid-value(48, 86)
      gap: fluid-value(40, 73)
      width: 100%
      flex-wrap: wrap
      max-width: 1331px

      .release-card
        flex: 1 0
        min-width: 330px
        max-width: min(500px, 45vw)

        &:nth-child(2)
          @media $mediaInDesktop
            flex: 1.25 0
            position: relative
            --scale: 1.15

        .card-wrapper
          min-height: fluid-value(100, 500)

      @media $mediaInMobile
        flex-direction: column
        align-items: center

        .release-card
          width: 100%
          max-width: 70vw

    .mobile-version-notes
      background: white;
      border: 2px solid #E3E2E4;
      border-radius: 10px;
      display: flex;
      padding: 32px;
      gap: 32px;
      font-weight: 800;
      font-size: 20px;
      line-height: (44/20);
      max-width: 700px

      @media $mediaInXS
        font-size: 20px;
        line-height: 24px;

      .nuxt-icon
        font-size: 45px

  .release-tabs
    margin-bottom: fluid-value(40, 100)
    min-height: 50px

    .info-name
      padding-right: 0
      font-weight: bold
      transition: 318ms
      transform: translate(60%)
      width: 0
      overflow: hidden

    .release-tab
      transition: 318ms
      justify-content: center
      align-items: center
      padding: 14px 18px
      border-radius: 8px
      position: relative
      border: 1px solid #E3E2E4
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08);
      color: #424149
      cursor: pointer
      background: $secondary
      font-weight: 500

      .text-wrapper
        position: relative
        z-index: 3

      &:before
        content: ""
        pointer-events: none
        user-select: none
        position: absolute
        inset: 0px
        border-radius: inherit
        transition: 318ms
        padding: 1px
        background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 100%)
        -webkit-mask: linear-gradient(black, black) content-box content-box, linear-gradient(black, black)
        -webkit-mask-composite: xor
        mask-composite: exclude

      &:not(.is-current):hover
        background: linear-gradient(180deg, rgba(217, 217, 217, 0.20) 0%, rgba(255, 255, 255, 0.19) 14.06%, rgba(217, 217, 217, 0.10) 100%);

      &.is-current
        box-shadow: 0px 2px 10px 0px rgba(30, 150, 235, 0.20);
        padding: 0 fluid-value(20, 50)
        color: #1E96EB

        .info-name
          transform: translateX(0)
          min-width: var(--name-width, fit-content)
          width: auto
          padding-right: 8px

        &:before
          padding: 1.5px
          background: #1E96EB

  .section-why
    .container
      border-top: 1px solid var(--divider-color)
      padding: fluid-value(53, 96) 20px

    .section-subtitle
      font-weight: 800
      font-size: fluid-value(24, 48, 390, 768)
      margin-bottom: fluid-value(12, 35, 390, 768)

    .reason-list
      margin: 0
      font-size: fluid-value(14, 24, 390, 768)
      line-height: 200%
      padding-left: 30px

</style>
