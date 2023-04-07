<template lang="pug">
.overview-hero.flex.flex-col.items-center
  h1.section-title(
    v-html="$t('overviewPage.heroTitle')"
  )
  h1.section-title.section-subtitle
    .alternative-wrapper.flex.justify-center
      overview-hero-alternatives
      .inline-gap &nbsp;
      .subtitle-text.text-brand-grad {{ $t('overviewPage.heroSubtitle') }}
  .section-desc {{ $t('overviewPage.heroDesc') }}
  nuxt-link.hero-action.try-it-button(
    :to="PATH.AFFINE_DWONHILLS" target="_blank"
  ) {{ $t('tryItOnline') }}
  overview-live-demo
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'
</script>

<style lang="stylus">
.overview-hero
  margin-top: 90px

  @media $mediaInXS
    margin-top: 55px

  .section-title
    margin: 0
    @media $mediaInXS
      font-size: 32px !important
      max-width: 324px

  .section-subtitle
    width: 100%
    margin-top: 24px
    margin-bottom: fluid-value(53, 104)
    @media $mediaInXS
      font-size: 24px !important

  .alternative-wrapper
    .overview-hero-alternatives
      @media $mediaInDesktop
        min-width: 260px
        text-align: right

        .content-title
          width: 100%
          text-align: right

    @media $mediaInMobile
      flex-direction: column
      gap: 4px

      .inline-gap
        display: none

  .section-desc
    font-weight: 700
    font-size: fluid-value(16, 24)
    line-height: (29/24)
    margin-bottom: fluid-value(48, 87)

  .hero-action
    margin-bottom: fluid-value(60, 235)

  .overview-live-demo
    margin-bottom: fluid-value(110, 170)
</style>
