<template lang="pug">
.overview-hero-v3(
  ref="el"
)
  .limit-container
    .pin-wrapper-placeholder
    .hero-cover-wrapper
      video-play-when-visible( src="/overview/hero-cover.mp4" :isActive="true" )
    .bottom-gap

  .pin-wrapper
    .text-wrapper
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

let app: Application
let cleanup: () => void

const setupSpline = async () => {
  const { Application } = await import('@splinetool/runtime')
  app = new Application(canvasRef.value)
  await app.load('/overview/hero.splinecode')
  // Disable scroll block
  app.eventManager.preventScroll = false
  // window.app = app

  // Emit mouse event
  cleanup = useEventListener(el.value, 'mousemove', (e) => {
    app._controls.orbitControls.handleMouseMoveRotate(e, 0.005)
  })

  isInited.value = true
}

const setupScrollTrigger = async () => {
  // @TODO
}

onActivated(() => {
  if (!isMobile) {
    setupSpline()
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
    top: 0
    z-index: -1
    top: var(--navbar-height)

    &,
    &-placeholder
      height: 700px

  .spline-container
    width: 100%
    height: 1100px
    position absolute
    top: -150px
    left: 0
    z-index: 2
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
    height: 88px
    background: var(--bg)

  .hero-cover-wrapper
    max-width: 1040px
    margin: 0 auto
    overflow: hidden
    border-radius: 16px
    background: var(--white-white, #FFF)
    box-shadow: 1px 18px 39px 0px rgba(0, 0, 0, 0.15), 5px 71px 71px 0px rgba(0, 0, 0, 0.09), 12px 160px 96px 0px rgba(0, 0, 0, 0.05), 20px 284px 114px 0px rgba(0, 0, 0, 0.01), 32px 443px 124px 0px rgba(0, 0, 0, 0.00)
    position relative
    z-index: 2

    video
      display: flex
      width: 100%
      aspect-ratio: 721.15/500.8

</style>
