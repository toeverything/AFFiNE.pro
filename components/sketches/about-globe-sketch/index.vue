<template lang="pug">
.about-globe-sketch(ref="el")
  canvas(ref="canvas")
</template>

<script setup lang="ts">
import createGlobe from './sketch'
import { useResizeObserver } from '@vueuse/core'

const el = ref()
const elWidth = ref(0)
const canvas = ref()
const phi = ref(0)

let globe: createGlobe

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  elWidth.value = width
})

const initGlobe = () => {
  if (!canvas.value) return
  globe = createGlobe(canvas.value, {
    devicePixelRatio: 2,
    width: elWidth.value * 2,
    height: elWidth.value * 2,
    phi: phi.value,
    theta: 0.57,
    dark: 0,
    diffuse: 0.05,
    scale: 0.9,
    mapSamples: 16000 * 2,
    mapBrightness: 0.3,
    baseColor: [1, 1, 1],
    markerColor: [1, 1, 1],
    glowColor: [0.706, 0.706, 0.706],
    markers: [
      // longitude latitude
      // { location: [37.7595, -122.4367], size: 0.03 },
      // { location: [40.7128, -74.006], size: 0.1 },
    ],
    onRender: (state) => {
      state.phi = phi.value
      state.width = elWidth.value * 2
      state.height = elWidth.value * 2
      phi.value += 0.003
    }
  })
}

onMounted(() => {
  initGlobe()
})

onUnmounted(() => {
  if (globe) {
    globe.destroy()
  }
})
</script>

<style lang="stylus">
.about-globe-sketch
  canvas
    width: 100%
    height: 100%
</style>
