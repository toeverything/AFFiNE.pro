<template lang="pug">
.overview-hyperfused-platform
  .limit-container.flex.flex-col.items-center
    .icon-list.flex
      .icon-wrapper
        nuxt-icon( name="block-1" )
      .icon-wrapper
        nuxt-icon( name="block-2" )
      .icon-wrapper
        nuxt-icon( name="block-3" )
      .icon-wrapper
        nuxt-icon( name="block-4" )
      .icon-wrapper
        nuxt-icon( name="block-5" )
      .icon-wrapper
        nuxt-icon( name="block-6" )
      .icon-wrapper
        nuxt-icon( name="block-7" )

    h2.section-title.section-grad-title {{ $t('overviewPage.consolidateWorkflowTitle') }}

    .cards-row.flex.gap-4
      .card.say-goodbye-card
        physics-blocks.icons-wrapper
        .card-title {{ $t('overviewPage.consolidateWorkflowSayGoodbye') }}
        .card-desc {{ $t('overviewPage.consolidateWorkflowSayGoodbyeDesc') }}
      .flex.flex-col.side-part.gap-4
        .card.focused-card
          .stay-focused-flow-placeholder
          //- stay-focused-flow
          client-only
            vue3-lottie.stay-focused-flow-lottie(
              autoPlay
              loop
              :animationLink="$device.isMobile ? '/lottie-files/stay-focused-flow-mobile.json' : '/lottie-files/stay-focused-flow.json'"
            )
          .card-mini-title {{ $t('overviewPage.consolidateWorkflowAffine') }}
          .card-desc {{ $t('overviewPage.consolidateWorkflowAffineDesc') }}
        .card.privacy-card
          .card-wave-wrapper
            //- .card-bg
            client-only
              vue3-lottie.card-wave(
                autoPlay
                loop
                animationLink="/lottie-files/local-first.json"
              )
          .card-cover
          .card-mini-title {{ $t('overviewPage.consolidateWorkflowPrivacy') }}
          .card-desc {{ $t('overviewPage.consolidateWorkflowPrivacyDesc') }}
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.overview-hyperfused-platform
  padding-top: fluid-value(60, 120, 744, 1024)
  padding-bottom: fluid-value(60, 120, 744, 1024)

  .icon-list
    margin-bottom: 32px
    color: rgba(171, 171, 171, 1)
    gap: fluid-value(12, 20, 390, 560)

    .icon-wrapper
      display: flex
      justify-content: center
      align-items: center
      width: 38px
      height: 38px
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.10);
      background: #FFF
      box-shadow: 0px 1.11111px 2.22222px 0px rgba(0, 0, 0, 0.08)
      font-size: 26.5px

      &:nth-child(1),
      &:nth-child(7)
        opacity: 0.3

      &:nth-child(2),
      &:nth-child(6)
        opacity: 0.5

      &:nth-child(3),
      &:nth-child(5)
        opacity: 0.7

  .section-title
    font-size: fluid-value(24, 48, 390, 1024)
    font-weight: 500
    line-height: 118.75%
    letter-spacing: (-1.92/48em)
    max-width: 880px
    margin-bottom: 38px
    padding: 0 30px

  .cards-row
    width: 100%

    @media (max-width: 1000px)
      flex-direction: column

    .side-part
      flex: 500
      min-width: s('min(500px, 100%)')

    .card
      padding: fluid-value(16, 24, 390, 744);
      padding-bottom: fluid-value(20, 24, 390, 744);
      border-radius: 16px;
      background: #FFF;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15)

    .card-title
      color: #000
      font-size: fluid-value(24, 32, 390, 560)
      font-weight: 500
      line-height: 125%
      letter-spacing: (-1.28/32em)
      margin-bottom: 8px

    .card-mini-title
      color: #000
      font-size: fluid-value(20, 24, 390, 744)
      font-weight: 500
      line-height: 133.333%
      letter-spacing: (-0.48/24em)

    .card-desc
      font-size: fluid-value(14, 16, 390, 744);
      line-height: 150%

    .focused-card
      flex: 1
      position relative
      overflow hidden
      padding-top: 0

      .stay-focused-flow-placeholder
        height: 210px
        margin-bottom: 24px

      .stay-focused-flow,
      .stay-focused-flow-lottie
        position absolute
        top: 0
        left: 0
        width: 100%
        height: 210px

      .stay-focused-flow-lottie
        min-width: 500px
        transform: translateX(-50%)
        left: 50%

      .card-mini-title
        margin-bottom: 4px

      @media (min-width: 744px)
        .card-mini-title
          max-width: 380px
          margin-bottom: 8px

    .say-goodbye-card
      flex: 564
      padding-top: 0
      min-height: 350px

      @media (min-width: 1025px)
        .card-title
          max-width: 350px

        .card-desc
          max-width: 337px

      .icons-wrapper
        position relative
        height: fluid-value(340, 400, 560)
        margin-bottom: fluid-value(24, 48, 744, 1024)

    .privacy-card
      position relative

      .card-bg
        position absolute
        z-index: 2
        width: 100%
        height: 100%
        background-size: 680px 124px
        background-image: url(/overview/privacy-card-cover.png)
        background-repeat: no-repeat
        background-position: center top

      .card-wave-wrapper
        position absolute
        height: 140px
        left: 0
        top: 0
        width: 100%
        overflow: hidden

        &:before
          content: ''
          display: none
          position absolute
          bottom: 0
          height: 31px
          width: 100%
          z-index: 3
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);

        .card-wave
          position absolute
          width: 100%
          aspect-ratio: 1/1
          min-width: 690px
          height: auto
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)

      @media (max-width: 560px)
        .card-wave
          margin-left: 80px

        .card-bg
          background-position-x: -80px

      .card-cover
        height: 124px

      .card-mini-title
        margin-bottom: 4px
</style>
