<template lang="pug">
.page.page-download

  .section-hero
    .container.flex.flex-col.items-center
      .hero-headline
        | {{ $t('downloadPage.headline') }}
        nuxt-link( :to="PATH.AFFINE_DOWNHILLS" v-mobile-intercept target="_blank") {{ $t('downloadPage.headlineLink') }}

      .release-cards.flex.items-start
        release-card(
          v-for="data in releaseCards"
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

const releases: Record<string, Release> = reactive({
  beta: {
    tag_name: '',
    prerelease: true,
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
      desc: t('downloadPage.betaDesc'),
      icon: betaIconUrl,
      ...releases.beta
    },
    {
      title: t('downloadPage.canary'),
      desc: t('downloadPage.canaryDesc'),
      icon: canaryIconUrl,
      tips: t('downloadPage.manuallyUpdateTips'),
      ...releases.canary
    },
    {
      title: t('downloadPage.stable'),
      desc: t('downloadPage.stableDesc'),
      icon: stableIconUrl,
      // ...releases.stable
    },
  ]
})

const loadData = async () => {
  const isBeta = (release: Release) => release.prerelease && release.tag_name.includes('beta')
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
    const githubReleases = await primaryAPI.getReleases()
    githubReleases.map(release => {
      const { tag_name, assets, prerelease } = release
      const type = getReleaseType(release)
      if (!type || hasRelease(releases[type])) return
      releases[type] = {
        tag_name,
        assets,
        prerelease
      }
    })
  } catch(error) {
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
      margin-bottom: fluid-value(81, 157)

      @media $mediaInXS
        max-width: 280px

      a
        color: transparent
        background-image: linear-gradient(180deg, #7ca5ff, #286CFF)
        background-clip: text
        position relative
        transition: 318ms

        &:after
          content: ''
          position: absolute
          left: 0
          bottom: 0px
          width: 100%
          height: 2px
          background-color: #286CFF

        &:hover
          opacity: 0.85

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

        .card-wrapper
          min-height: fluid-value(100, 500)

      @media $mediaInMobile
        flex-direction: column
        align-items: center

        .release-card
          width: 100%
          max-width: 70vw

    .mobile-version-notes
      background: rgba(27, 27, 27, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.2);
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
