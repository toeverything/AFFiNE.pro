<template lang="pug">
.ai-hero-stars-scene(
  ref="el"
)
  .spline-container( :class="{ 'is-inited': isInited }" )
    canvas( ref="canvasRef" )
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import type { Application } from '@splinetool/runtime'

const isInited = ref(false)
const el = ref()
const canvasRef = ref()

let app: Application
let cleanup: () => void

const setupSpline = async () => {
  const { Application } = await import('@splinetool/runtime')
  app = new Application(canvasRef.value)
  await app.load('/ai/hero-stars.splinecode')

  // Position stars
  const objects = app.getAllObjects()
  objects.map(el => {
    // Purple Star
    if (el.name === 'AI 6') {
      el.position.x += 300
      el.position.y += 110
      el.position.z -= 500
    }
    // Yellow Star
    if (el.name === 'AI 5') {
      el.position.x += 580
      el.position.y += 120
      el.position.z -= 200
    }
    // Blue Star
    if (el.name === 'AI 4') {
      el.position.x -= 550
      el.position.y += 210
      el.position.z += 0
    }
  })

  app.setZoom(0.9)
  // Disable scroll block
  app.eventManager.preventScroll = false
  // Disable resize for perf
  setTimeout(() => {
    // @ts-ignore
    app._resizeObserver.unobserve(canvasRef.value.parentElement)
    // @ts-ignore
    app._resize()
  }, 800)

  // Emit mouse event
  cleanup = useEventListener(document.body, 'mousemove', (e) => {
    app._controls.orbitControls.handleMouseMoveRotate(e, 0.003)
  })

  isInited.value = true
}

onMounted(() => {
  setupSpline()
})

onUnmounted(() => {
  app?.dispose()
  cleanup && cleanup()
  isInited.value = false
})
</script>

<style lang="stylus">
.ai-hero-stars-scene

  .spline-container
    width: 1080px
    aspect-ratio: 1920/600
    position absolute
    z-index: -1
    top: 180px
    left: 50%
    transform: translateX(-50%)
    pointer-events: none
    opacity: 0
    transition: 118ms linear

    @media (max-width: 1023px)
      display: none

    &.is-inited
      opacity: 1
      transition-delay: 0.5s

    canvas
      width: 100%
</style>
