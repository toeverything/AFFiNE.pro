<template lang="pug">
.overview-hero.flex.flex-col.items-center
  .section-title(
    v-html="$t('overviewPage.heroTitle')"
  )
  .section-title.section-subtitle.text-brand-grad {{ $t('overviewPage.heroSubtitle') }}
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

  .section-title
    @media $mediaInXS
      font-size: 40px !important
      max-width: 324px

  .section-subtitle
    margin-top: 24px
    margin-bottom: fluid-value(53, 104)

  .section-desc
    font-weight: 700
    font-size: fluid-value(16, 24)
    line-height: (29/24)
    margin-bottom: fluid-value(48, 87)

  .hero-action
    margin-bottom: fluid-value(134, 235)

  .overview-live-demo
    margin-bottom: fluid-value(110, 170)
</style>
