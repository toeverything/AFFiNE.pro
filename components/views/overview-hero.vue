<template lang="pug">
.overview-hero.flex.flex-col.items-center
  campaign-entry

  h1.section-title(
    v-html="$t('overviewPage.heroTitle')"
  )

  h2.section-title.section-subtitle
    .alternative-wrapper.flex.justify-center
      overview-hero-alternatives
      .inline-gap &nbsp;
      .subtitle-text.text-brand-grad {{ $t('overviewPage.heroSubtitle') }}

  h3.section-desc.mt-0 {{ $t('overviewPage.heroDesc') }}

  .flex.hero-action
    nuxt-link.try-it-button.download-app-button(
      to="/download"
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

      | {{ $t('downloadApp') }}

    nuxt-link(
      :to="PATH.AFFINE_DOWNHILLS"
      target="_blank"
      :data-intercept="$t('useDesktopVersion.title')"
      v-mobile-intercept
      :class="{ 'is-mobile': isMobile }"
    )
      brand-glow-button() {{ $t('tryItOnline') }}

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
  margin-top: 100px

  @media $mediaInXS
    margin-top: 55px

  .section-title
    margin: 0
    @media $mediaInXS
      font-size: 24px !important
      max-width: 270px

  .section-subtitle
    width: 100%
    margin-top: 24px
    font-size: fluid-value(24, 48)
    margin-bottom: fluid-value(53, 104)

    @media $mediaInXS
      font-size: 24px !important

  .alternative-wrapper
    .overview-hero-alternatives
      @media $mediaInDesktop
        min-width: 200px
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

  .try-it-button,
  .brand-glow-button
    display: inline-flex
    align-items: center
    justify-content: center
    position relative

    @media $mediaInDesktop
      min-width: 286px

    &.is-mobile:after
      content: attr(data-intercept)
      font-weight: 800
      font-size: 12px
      line-height: 32px
      position absolute
      left: 50%
      bottom: -38px
      width: 100%
      text-align: center
      transform: translate3d(-50%, 0, 0)

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

  .download-app-button
    @media $mediaInMobile
      display: none

  .hero-action
    margin-bottom: fluid-value(90, 235)
    gap: 47px

  .overview-live-demo
    margin-bottom: fluid-value(110, 170)
</style>
