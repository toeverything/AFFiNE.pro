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

    track-link(
      :to="PATH.AFFINE_DOWNHILLS"
      target="_blank"
      :data-intercept="$t('useDesktopVersion.title')"
      v-mobile-intercept
      :class="{ 'is-mobile': isMobile }"
      action="Button"
      :params="{ 'resolve': 'Goto Demo' }"
    )
      brand-glow-button() {{ $t('tryItOnline') }}

  .flex.hero-links
    track-link.link-button(
      :to="`${PATH.AFFiNE_GITHUB}`"
      rel="nofollow"
      target="_blank"
      action="Button"
      :params="{ 'resolve': 'Goto Github' }"
    )
      github-circle.button-icon
      .flex.flex-1.justify-between
        .part-left {{ $t('starOnGitHub') }}
        .part-right.star-count.ml-4
          template( v-if="store.github.starAmount" ) {{formattedStarAmount}}k

    track-link.link-button(
      :to="`${PATH.AFFiNE_COMMUNITY}`"
      rel="nofollow"
      target="_blank"
      action="Button"
      :params="{ 'resolve': 'Goto Community' }"
    )
      icon-message-circle-chat.button-icon
      | {{ $t('gotoCommunity') }}

  overview-live-demo
</template>

<script setup lang="ts">
import GithubCircle from '~icons/mdi/github-circle'
import { PATH } from '~/utils/constants'

const store = useStore()
const { isMobile } = useDevice()

let lastCallTime = Date.now()
const LAST_LOTTIE_FRAME = 240

const lottieLoaded = ref(false)
const isReverse = ref(true)
const lottieIcon = ref<any>(null)
const formattedStarAmount = computed(() => {
  return (store.github.starAmount/1000).toFixed(1)
})

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
  margin-top: 76px

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
    margin-bottom: fluid-value(53, 65)

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
    margin-bottom: fluid-value(48, 65)

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
    margin-bottom: fluid-value(25, 45)
    gap: 47px

  .hero-links
    margin-bottom: fluid-value(70, 165)
    gap: fluid-value(1, 50)

    @media $mediaInMobile
      flex-direction: column
      align-items: center

    .link-button
      display: flex
      align-items: center
      justify-content: center
      font-weight: 800
      font-size: 14px
      line-height: 24px
      min-width: fluid-value(226, 250)
      min-height: fluid-value(34, 54)
      padding: 0 20px
      transition: 318ms

      &:hover
        color: var(--link-hover-color)

      @media $mediaInMobile
        font-weight: 500
        font-size: 13px

    .button-icon
      font-size: fluid-value(19, 30)
      width: fluid-value(19, 30)
      margin-right: 18px

  .overview-live-demo
    margin-bottom: fluid-value(110, 170)
</style>
