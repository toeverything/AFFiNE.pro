<template lang="pug">
.overview-hero-v3(
  ref="el"
)
  .limit-container
    .pin-wrapper-placeholder

  .pin-wrapper
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

    &.is-inited
      opacity: 1

    canvas
      width: 100%
      height: 100%
</style>
