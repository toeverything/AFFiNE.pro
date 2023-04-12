<template lang="pug">
.overview-hero.flex.flex-col.items-center
  h1.section-title(
    v-html="$t('overviewPage.heroTitle')"
  )

  h2.section-title.section-subtitle
    .alternative-wrapper.flex.justify-center
      overview-hero-alternatives
      .inline-gap &nbsp;
      .subtitle-text.text-brand-grad {{ $t('overviewPage.heroSubtitle') }}

  h3.section-desc.mt-0 {{ $t('overviewPage.heroDesc') }}

  nuxt-link.hero-action.try-it-button(
    :to="PATH.AFFINE_DOWNHILLS"
    target="_blank"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  )
    .icon-container
      .icon-placeholder(
        v-if="!lottieLoaded"
      )
        affine-logo

      client-only
        vue3-lottie(
          ref="lottieIcon"
          :autoPlay="false"
          :loop="false",
          :speed="4"
          animationLink="/lottie-files/loading-white.json"
          @onComplete="handleLottieComplete"
          @onAnimationLoaded="handleLottieLoaded"
        )

    | {{ $t('tryItOnline') }}
  overview-live-demo
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

const { isMobile } = useDevice()

let lastCallTime = Date.now()
const LAST_LOTTIE_FRAME = 240

const lottieLoaded = ref(false)
const isReverse = ref(true)
const lottieIcon = ref<any>(null)

const playLottieSegment = () => {
  const animation = lottieIcon.value

  if (!animation) return

  if (!isReverse.value) {
    animation.setDirection('forward')
    animation.goToAndStop(0)
    animation.play()
  } else {
    animation.setDirection('reverse')
    animation.goToAndStop(LAST_LOTTIE_FRAME)
    animation.play()
  }
}

const handleMouseenter = (event: Event) => {
  isReverse.value = true
  playLottieSegment()
}

const handleMouseleave = (event: Event) => {
  lottieIcon.value?.goToAndStop(LAST_LOTTIE_FRAME)
}

const handleLottieLoaded = () => {
  lottieIcon.value?.goToAndStop(LAST_LOTTIE_FRAME)
  lottieLoaded.value = true
}

// @FIXME: Ignore repeated calls
const handleLottieComplete = () => {
  const now = Date.now()
  if (now - lastCallTime < 100) return
  isReverse.value = !isReverse.value
  lastCallTime = now
  playLottieSegment()
}
</script>

<style lang="stylus">
.page-overview
  h1,h2,h3,h4,h5,h6
    margin: 0

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

  .try-it-button
    display: inline-flex
    align-items: center

    .icon-container
      display: inline-flex
      align-items: center
      margin-right: 14px
      width: 40px
      height: 40px
      position relative
      top: 2px

      .icon-placeholder
        position absolute
        inset: 0
        top: 2.6px
        left: 6px

        .affine-logo svg
          width: 28px
          height: 28px

      @media $mediaInMobile
        display: none

  .hero-action
    margin-bottom: fluid-value(60, 235)

  .overview-live-demo
    margin-bottom: fluid-value(110, 170)
</style>
