<template lang="pug">
.overview-privacy-first.flex.flex-col.items-center
  .section-title.section-grad2-title {{ $t('overviewPage.privacyFirstTitle') }}
  .privacy-card-list.flex.flex-wrap
    hover-spotlight-card.privacy-card.item-a
      .card-bg
        nuxt-icon.card-icon(
          name="lock-alt"
          filled
        )
        .card-text {{ $t('overviewPage.privacyFirstItemA') }}
    hover-spotlight-card.privacy-card.item-b
      .card-bg
        nuxt-icon.card-icon(
          name="desktop-computer"
          filled
        )
        .card-text {{ $t('overviewPage.privacyFirstItemB') }}
    hover-spotlight-card.privacy-card.item-c
      .card-bg
        nuxt-icon.card-icon.icon-a-vector(
          name="A-Vector"
          filled
        )
        .card-text {{ $t('overviewPage.privacyFirstItemC') }}
    hover-spotlight-card.privacy-card.item-d
      .card-bg
        nuxt-icon.card-icon(
          name="Insync"
          filled
        )
        .card-text( v-html="$t('overviewPage.privacyFirstItemD')" )
  nuxt-link.hero-action.try-it-button(
    :to="PATH.AFFINE_DWONHILLS" target="_blank"
  ) {{ $t('tryItOnline') }}
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { PATH } from '~/utils/constants'
</script>

<style lang="stylus">
.overview-privacy-first
  padding: 0 fluid-value(16, 60)
  margin-top: fluid-value(50, 146)
  --card-bg: linear-gradient(180deg, #fff 77.01%, rgba(255, 255, 255, 0) 136.9%);

  .section-title
    max-width: 1020px
    margin-bottom: fluid-value(40, 135)

  .privacy-card-list
    row-gap: fluid-value(30, 50)
    column-gap: fluid-value(20, 40)
    margin-bottom: fluid-value(50, 145)
    width: 100%
    max-width: 1432px

  .privacy-card
    flex: 40%
    background: $primary20
    border: 0.805866px solid var(--secondary)
    box-shadow: 0px 1.61173px 24.176px $secondary05
    border-radius: 13px
    padding: 4px
    aspect-ratio: 696/416

    .card-bg
      display flex
      align-items: flex-end
      position absolute
      inset: 4px
      padding: fluid-value(14, 29) fluid-value(18, 34)
      background: var(--card-bg);
      filter: drop-shadow(0px 1.61173px 24.176px rgba(0, 0, 0, 0.05));
      border-radius: 9.67039px;

    .card-icon
      position absolute
      right: 10%
      bottom: 14%
      font-size: fluid-value(50, 317)

      &.icon-a-vector
        bottom: 7%
        right: 5%

    .card-text
      position relative
      z-index: 2
      font-weight: 800;
      font-size: fluid-value(20, 32);
      line-height: (39/32)

  @media $mediaInSmallScreen
    .privacy-card-list
      flex-direction: column
      align-items: center

    .privacy-card
      flex: 1
      width: 100%
      max-width: 500px

      .card-icon
        font-size: fluid-value(150, 317)

  /html.dark &
    --card-bg: linear-gradient(180deg, #000000 77.01%, rgba(0, 0, 0, 0) 136.9%);

</style>
