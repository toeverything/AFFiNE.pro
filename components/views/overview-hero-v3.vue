<template lang="pug">
.overview-hero-v3(
  ref="el"
  :style="{ '--scroll-progress': scrollProgress }"
)
  .limit-container
    .pin-wrapper-placeholder
    .hero-cover-wrapper
      video-play-when-visible( poster="/overview/hero-cover.png" src="/overview/hero-cover.mp4" :isActive="isPlayVideo" )
    .bottom-gap

  .pin-wrapper
    .text-wrapper.flex.flex-col.items-center
      .hero-fused-title.animated-in
        .row.first-row.flex.justify-center
          .write-word.flex
            .symbol-cursor
            | Write,
          .draw-word Draw,

          .draw-plan.flex
            .big-checkbox( :class="{ 'is-checked': planCheckboxValue }" @click="planCheckboxValue = !planCheckboxValue" )
              <svg class="checked-icon" viewBox="0 0 65 65" fill="none">
                <path d="M0 10.8333C0 4.85025 4.85025 0 10.8333 0H54.1667C60.1498 0 65 4.85025 65 10.8333V54.1667C65 60.1498 60.1497 65 54.1667 65H10.8333C4.85025 65 0 60.1497 0 54.1667V10.8333ZM50.3468 22.771C51.5006 21.6172 51.5006 19.7465 50.3468 18.5926C49.1929 17.4388 47.3222 17.4388 46.1684 18.5926L26.5909 38.1701L20.8013 32.3805C19.6475 31.2267 17.7768 31.2267 16.6229 32.3805C15.4691 33.5343 15.4691 35.4051 16.6229 36.5589L24.5017 44.4377C25.6556 45.5915 27.5263 45.5915 28.6801 44.4377L50.3468 22.771Z" fill="#1E96EB"/>
              </svg>
              <svg class="unchecked-icon" viewBox="0 0 65 65" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M54 6H11C8.23858 6 6 8.23858 6 11V54C6 56.7614 8.23858 59 11 59H54C56.7614 59 59 56.7614 59 54V11C59 8.23858 56.7614 6 54 6ZM11 0C4.92487 0 0 4.92487 0 11V54C0 60.0751 4.92487 65 11 65H54C60.0751 65 65 60.0751 65 54V11C65 4.92487 60.0751 0 54 0H11Z" fill="#1E96EB"/>
              </svg>
            | Plan,

        .row.second-row.flex.justify-center
          | All at Once
          .color-brand .
      .hero-desc.animated-in.animate-delay-50ms {{ $t('overviewPage.heroDesc') }}
      download-entry-button.animated-in.animate-delay-100ms( size="large" )
    .spline-container( :class="{ 'is-inited': isInited }" )
      canvas( ref="canvasRef" )
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useEventListener } from '@vueuse/core'
import type { Application } from '@splinetool/runtime'
const { isMobile } = useDevice()

const isInited = ref(false)
const el = ref()
const canvasRef = ref()
const planCheckboxValue = ref(true)
const isPlayVideo = ref(false)
const scrollProgress = ref(0)

let app: Application
let cleanup: () => void

const setupSpline = async () => {
  const { Application } = await import('@splinetool/runtime')
  app = new Application(canvasRef.value)
  await app.load('/overview/hero.splinecode')
  // Disable scroll block
  app.eventManager.preventScroll = false
  // Disable resize for perf
  setTimeout(() => {
    app._resizeObserver.unobserve(canvasRef.value.parentElement)
    app._resize()
  }, 400)
  // window.app = app

  // Emit mouse event
  cleanup = useEventListener(el.value, 'mousemove', (e) => {
    app._controls.orbitControls.handleMouseMoveRotate(e, 0.005)
  })

  isInited.value = true
}

const setupScrollTrigger = async () => {
  gsap.to(scrollProgress, {
    ease: 'none',
    scrollTrigger: {
      markers: false,
      scrub: 0.5,
      trigger: '.overview-hero-v3 .pin-wrapper-placeholder',
      start: "top top",
      end: "bottom 20%",
      onUpdate (self) {
        isPlayVideo.value = self.progress > 0.5
      }
    },
    value: 1
  })
}

onActivated(() => {
  const config = useRuntimeConfig()
  if (!isMobile) {
    if (config.public.ENV !== 'development') {
      setupSpline()
    }
    setupScrollTrigger()
    isInited.value = true
  }
})

onDeactivated(() => {
  app?.dispose()
  cleanup && cleanup()
  isInited.value = false
})
</script>

<style lang="stylus">
.overview-hero-v3
  min-height: 600px
  position relative

  .pin-wrapper
    position fixed
    width: s('min(1920px, 100vw)')
    left: 50%
    transform: translate(-50%)
    top: var(--navbar-height)

    &,
    &-placeholder
      height: fluid-value(331, 640, 390, 1024)

    @media $mediaInXS
      position absolute
      top: 0

  .spline-container
    width: 1920px
    height: 1100px
    position absolute
    top: -210px
    left: 50%
    transform: translateX(-47.5%)
    // z-index: 4
    z-index: -1
    pointer-events: none
    opacity: 0
    transition: 118ms linear 1s

    @media (max-width: 1023px)
      display: none

    &.is-inited
      opacity: 1

    canvas
      width: 100%
      height: 100%

  .bottom-gap
    width: 100%
    height: fluid-value(44, 88, 390, 1024)
    background: var(--bg)
    position relative
    z-index: 3

  .text-wrapper
    padding: 0 32px
    padding-top: fluid-value(44, 130, 390, 1024)
    pointer-events: none

    @keyframes animatedIn
      from
        opacity 0
        transform: translateY(-50px)
      to
        opacity 1
        transform: translateY(0)

    .animated-in
      animation animatedIn 800ms both
      animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);

    .animate-delay-50ms
      animation-delay: 50ms

    .animate-delay-100ms
      animation-delay: 100ms

    > *
      position relative
      z-index: 3
      pointer-events: initial

    .hero-fused-title
      color: var(--primary-deep)
      font-size: fluid-value(40, 90, 390, 1024)
      font-weight: 500
      line-height: 1
      letter-spacing: (-6.3/90em)

      .symbol-cursor
        position relative
        left: (1/90em)
        margin-top: (7/90em)
        width: (7/90em)
        height: (71/90em)
        border-radius: (3/90em)
        background-color: var(--brand)

      .draw-word
        position relative
        top: (7/90em)
        font-family: Kalam, sans-serif
        font-weight: 400
        font-size: (107/90em)
        font-weight: 400
        line-height: 84.112%
        letter-spacing: (-7.49/107em)
        margin-left: (6/90em)

      .draw-plan
        position relative
        top: (7/90em)
        margin-left: (17/90em)
        gap: (8.39/90em)

        .big-checkbox
          position relative
          top: (13/90em)
          font-size: inherit
          width: (65/90em)
          height: (65/90em)
          // border: (4/90em) solid var(--brand)
          border-radius: (12/90em)
          cursor pointer

          .checked-icon
          .unchecked-icon
            position absolute
            left: 0
            top:0
            font-size: (65/90em)
            opacity: 0
            transition: 118ms
            transform: scale(0.9)

          .unchecked-icon
            opacity: 1
            transform: scale(1)

          &.is-checked
            .checked-icon
              opacity: 1
              transform: scale(1)

            .unchecked-icon
              opacity: 0
              transform: scale(0.95)

    .hero-desc
      white-space: pre-line
      text-align: center
      margin-top: 12px
      font-size: 20px
      font-weight: 500
      line-height: 135%
      letter-spacing: (-0.4/20em)
      margin-left: 4px
      margin-right: 4px

      @media $mediaInXS
        font-size: 16px

    .download-entry-button
      width: 179px
      margin-top: 36px

      @media $mediaInXS
        margin-top: 24px

  .hero-cover-wrapper
    max-width: 1040px
    margin: 0 auto
    overflow: hidden
    border-radius: 16px
    background: var(--white-white, #FFF)
    box-shadow: 1px 18px 39px 0px rgba(0, 0, 0, 0.15), 5px 71px 71px 0px rgba(0, 0, 0, 0.09), 12px 160px 96px 0px rgba(0, 0, 0, 0.05), 20px 284px 114px 0px rgba(0, 0, 0, 0.01), 32px 443px 124px 0px rgba(0, 0, 0, 0.00)
    position relative
    z-index: 4

    @media (min-width: 1024px) and (min-height: 800px)
      transform: scale(calc(1 + 0.1 * var(--scroll-progress)))

    video
      display: flex
      width: 100%
      aspect-ratio: 721.15/500.8

</style>
