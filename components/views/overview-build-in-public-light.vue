<template lang="pug">
.overview-build-in-public-light
  .limit-container.flex.flex-col.items-center
    h2.section-title.section-grad-title {{ $t('overviewPage.buildInPublicTitle') }}

    h3.section-sub-title {{ $t('overviewPage.buildInPublicOpenSource') }}

    .row.open-source-row.flex
      .thin-card.issue-card
        .card-desc {{ $t('overviewPage.buildInPublicIssueDesc') }}
        .browser-mockup
          .browser-header.flex.justify-center
            .control-dots.flex.gap-2
              .dot
              .dot
              .dot
            .address-bar.flex.items-center.gap-4
              .info-address toeverything/AFFiNE/issues
              .action-button( @click="handleCopyAddressClick" )
                nuxt-icon( :name="copied ? 'tick' : 'copy'" filled)
          .browser-body
            issues-card
      .thin-card.price-model-card
        .card-desc {{ $t('overviewPage.buildInPublicPriceDesc') }}
        .graphic-layer
          .model-icons-wrapper
            .model-icons.flex
              .icon.type-premium $$$
              .icon.type-free Free
              .icon.type-premium $$$
          .card-cover

    h3.section-sub-title {{ $t('overviewPage.buildInPublicUserCentric') }}

    .base-card.user-centric-card
      .row.flex.justify-between
        .info-text.headline-3 {{ $t('overviewPage.buildInPublicUserCentricDesc') }}
        .card-cover
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { PATH } from '~/utils/constants'

const { copy, copied } = useClipboard()

const handleCopyAddressClick = () => {
  console.log('Clicked copy address')
  copy(`${PATH.AFFiNE_GITHUB}/issues`)
}
</script>

<style lang="stylus">
.overview-build-in-public-light
  padding-top fluid-value(30, 120, 744)
  padding-bottom fluid-value(30, 120, 744)

  .base-card
    border-radius: 16px
    background: #FFF
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15)

  .section-title
    line-height: 108.333%
    font-size: 60px
    font-weight: 500
    letter-spacing: (-3/60em)
    white-space: pre
    padding-bottom: 0.1em
    margin-bottom: fluid-value(64, 100, 744)

    @media $mediaInMobile
      font-size: 32px

  .section-sub-title
    line-height: 125%
    font-size: fluid-value(24, 32, 560, 744)
    font-weight: 500
    letter-spacing: (-1.28/32em)
    white-space: pre-line
    text-align: center
    margin-top: 0
    margin-bottom: 32px
    color: black

  .open-source-row
    gap: 18px
    width: 100%
    margin-bottom: fluid-value(64, 100, 744)

    @media (max-width: 1000px)
      flex-direction: column

    .thin-card
      padding: fluid-value(16, 36, 390, 1024) fluid-value(16, 22, 390, 1024) 0 fluid-value(16, 22, 390, 1024)
      flex: 1
      border-radius: 12px
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15)

      .card-desc
        font-size: 20px;
        font-weight: 500;
        line-height: 135%
        letter-spacing: (-0.4/20em)

        @media $mediaInXS
          font-size: 16px;

    .price-model-card
      display: flex
      flex-direction: column
      overflow: hidden

      .graphic-layer
        position relative
        flex: 1
        min-height: 400px

        @media (max-width: 1000px)
          min-height: fluid-value(260, 400, 390, 600)

      .model-icons-wrapper
        position absolute
        bottom: 40%
        z-index 2
        left: 50%
        transform: translateX(-50%)

        @media (max-width: 1000px)
          bottom: 30%

      .model-icons
        background-image: url(/overview/price-model-icons.svg)
        aspect-ratio: 543/278
        width: s('min(535px, 90vw)')
        background-size: contain
        padding: 9% 12.5% 13%

        .icon
          flex: 1
          text-align: center
          border-radius: 50%
          color: white
          font-size: 14px
          padding-top: 3%
          font-weight: bold
          opacity: 0
          transition: 318ms

          &:first-child
            padding-right: 1%

          &:hover
            @media (min-width: 744px)
              opacity: 1

        .type-free
          text-shadow: 1px 2px 6px #47B028
          font-size: 12px
          padding-top: 4%

        .type-premium
          text-shadow: 1px 2px 6px #2574AB

      .card-cover
        position absolute
        width: 524px
        left: -12px
        bottom: -12px
        background-size: contain
        background-repeat: no-repeat
        background-image: url(/overview/price-model-cover-big-screen.svg)
        aspect-ratio: 461/260

        @media (max-width: 1000px)
          left: 50%
          transform: translateX(-50%)
          bottom: 0px
          width: s('min(632px, 120vw)')
          background-image: url(/overview/price-model-cover.svg)
          aspect-ratio: 660/260

        @media (max-width: 744px)
          left: -12px
          transform: translateX(0)

      .card-desc
        max-width: 303px

    .issue-card
      overflow: hidden

      .card-desc
        margin-bottom: 40px
        max-width: 383px

        @media $mediaInXS
          margin-bottom: 24px

      .browser-mockup
        border-radius: 12px 12px 0px 0px;
        border: 1px solid var(--black-1, rgba(0, 0, 0, 0.10));
        box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.05);
        margin-bottom: -10px
        padding-bottom: 32px

        .browser-header
          position relative
          padding: 16px
          border-bottom: 1px solid var(--black-1, rgba(0, 0, 0, 0.10));

        .control-dots
          position absolute
          left: 24px
          top: 50%
          transform: translateY(-50%)

          @media (max-width: 520px)
            display: none

          .dot
            width: 10px
            height: 10px
            border-radius: 50%
            background: #ccc

        .address-bar
          width: 230px
          height: 30px
          border-radius: 2px;
          background: var(--black-04, rgba(0, 0, 0, 0.04));
          padding-left: 24px
          padding-right: 16px

        .info-address
          font-size: 12px;

        .action-button
          font-size: 16px
          cursor pointer
          position relative
          z-index 2

        .browser-body
          padding-top: fluid-value(8, 24, 390, 1024)
          padding-left: fluid-value(0, 28, 390, 744)
          padding-right: fluid-value(0, 28, 390, 744)

  .user-centric-card
    width: 100%
    padding: 36px
    padding-right: fluid-value(36, 110, 1024)
    padding-bottom: fluid-value(0, 47, 744, 1024)

    @media $mediaInXS
      padding-left: 16px
      padding-right: 16px

    .row
      gap: fluid-value(22, 36, 744, 1024)

      @media (max-width: 800px)
        flex-direction: column

    .info-text
      font-size: 20px;
      font-weight: 500;
      line-height: 135%
      letter-spacing: (-0.4/20em)
      max-width: 269px

      @media $mediaInXS
        font-size: 16px;
        max-width: 309px
        margin-bottom: 26px

    .card-cover
      width: 100%
      max-width: 579px
      background-size: contain
      background-repeat: no-repeat
      background-image: url(/overview/user-centric-cover.svg)
      aspect-ratio: 579/328
      position relative
      top: -3px

      @media (max-width: 800px)
        max-width: 700px
</style>

