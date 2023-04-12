<template lang="pug">
.overview-privacy-first.flex.flex-col.items-center
  h2.section-title.section-grad2-title {{ $t('overviewPage.privacyFirstTitle') }}
  .privacy-card-list.flex.flex-wrap
    hover-spotlight-card.privacy-card.item-a
      .card-bg
        nuxt-icon.card-icon(
          name="lock-alt"
          filled
        )
        h5.card-text {{ $t('overviewPage.privacyFirstItemA') }}
    hover-spotlight-card.privacy-card.item-b
      .card-bg
        nuxt-icon.card-icon.icon-computer(
          name="desktop-computer"
          filled
        )
        h5.card-text {{ $t('overviewPage.privacyFirstItemB') }}
    hover-spotlight-card.privacy-card.item-c
      .card-bg
        nuxt-icon.card-icon.icon-a-vector(
          name="A-Vector"
          filled
        )
        h5.card-text {{ $t('overviewPage.privacyFirstItemC') }}
    hover-spotlight-card.privacy-card.item-d
      .card-bg
        nuxt-icon.card-icon.icon-insync(
          name="Insync"
          filled
        )
        h5.card-text( v-html="$t('overviewPage.privacyFirstItemD')" )
  nuxt-link.hero-action.try-it-button.hidden(
    :to="PATH.AFFINE_DOWNHILLS" target="_blank"
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

    @media $mediaInSmallScreen
      font-size: 24px

  .privacy-card-list
    row-gap: fluid-value(17, 38)
    column-gap: fluid-value(12, 40)
    margin-bottom: fluid-value(50, 145)
    width: 100%
    max-width: 1180px

  .privacy-card
    flex: 40%
    background: $primary20
    border: 0.805866px solid var(--secondary)
    box-shadow: 0px 1.61173px 24.176px $secondary05
    border-radius: 13px
    padding: 4px
    aspect-ratio: 522/312

    .spotlight
      display: none

    .card-bg
      display flex
      align-items: flex-end
      position absolute
      inset: 4px
      padding: fluid-value(14, 29) fluid-value(18, 34)
      background: var(--card-bg);
      filter: drop-shadow(0px 1.61173px 24.176px rgba(0, 0, 0, 0.05));
      border-radius: 9.67039px;

      &:before,
      &:after
        content: ''
        position absolute
        transition: 418ms
        width: 850px
        height: 850px

      &:after
        --dot: #656565
        background-image: radial-gradient(var(--dot) 1.5px, transparent 1.5px)
        background-size: 20px 20px
        background-position: 20px 20px
        z-index: -1
        opacity: 0
        left: -50%
        top: -50%
        transform: translate3d(4px, 4px, 0)

      &:before
        border-radius: 50%
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)
        transform-origin: left bottom
        left: 50%
        top: 50%
        transform: translate3d(-50%, -50%, 0) scale(0)

    .card-icon
      position absolute
      right: 10%
      bottom: 14%
      font-size: fluid-value(50, 250)
      z-index: 10
      transition: 318ms

      path
        transition: 318ms

      &.icon-a-vector
        bottom: 7%
        right: 5%

    .card-text
      position relative
      z-index: 2
      font-weight: 800;
      font-size: fluid-value(14, 24);
      line-height: (39/32)

    @media $mediaInDesktop
      &:hover
        .card-icon
          transform: translateX(30px)

          path
            stroke-opacity: 1 !important
            fill-opacity: 1 !important

        .card-bg
          &:after
            opacity: 0.2

          &:before
            transform: translate3d(-50%, -50%, 0) scale(1)

  @media $mediaInSmallScreen
    .privacy-card-list
      align-items: center

    .privacy-card
      aspect-ratio: 4/3
      min-height: 185px

      .card-icon
        font-size: fluid-value(100, 317)
        bottom: auto
        top: 10%
        right: 50% !important
        transform: translateX(50%)

        &.icon-computer
          opacity: 0.8

        &.icon-insync
          top: -5%
          font-size: fluid-value(130, 317)

  /html.dark &
    --card-bg: linear-gradient(180deg, #000000 77.01%, rgba(0, 0, 0, 0) 136.9%);

</style>
