<template lang="pug">
canvas.mouse-trail-sketch(
  ref="canvasRef"
)

t-pane( title="Overview" )
  t-folder( title="Hero Dots Grid" )
    t-input( v-model="params.maxWidth" name="trailWidth" :opt-params="{min: 10, max: 200}" )
    t-input( v-model="params.delay" name="trailDuration" :opt-params="{min: 0, max: 3}" )
    t-input( v-model="params.color" name="trailColor" )
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import type { IOriginalPointData } from 'laser-pen'
import {
  setDelay,
  setMinWidth,
  setMaxWidth,
  setOpacity,
  setColor,
  setRoundCap,

  drainPoints,
  drawLaserPen,
} from 'laser-pen'

let drawing = false
const canvasRef = ref() as Ref<HTMLCanvasElement>
const canvasPos = {
  x: 0,
  y: 0,
  height: window.innerHeight
}
const params = reactive({
  color: {r: 255, g: 255, b: 255},
  opacity: 1,
  minWidth: 5,
  maxWidth: 60,
  delay: 0.8,
})
let mouseTrack: IOriginalPointData[] = []
const ctxRef = computed(() => {
  return canvasRef.value.getContext('2d')
})

useResizeObserver(canvasRef, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  canvasRef.value.width = width
  canvasRef.value.height = height
})

const startDraw = () => {
  if (!drawing) {
    drawing = true
    draw()
  }
}

const draw = () => {
  const ctx = ctxRef.value
  const cvsDom = canvasRef.value

  if (!ctx) return

  ctx.clearRect(0, 0, cvsDom.width, cvsDom.height)
  let needDrawInNextFrame = false
  // draw local mouse track first
  mouseTrack = drainPoints(mouseTrack)
  if (mouseTrack.length >= 3) {
    drawLaserPen(ctx, mouseTrack)
    needDrawInNextFrame = true
  }
  if (needDrawInNextFrame) {
    requestAnimationFrame(draw)
  } else {
    drawing = false
  }
}

const handleMousemove = (event: MouseEvent) => {
  const relativeX = event.pageX - canvasPos.x
  const relativeY = event.pageY - canvasPos.y

  if (relativeY > canvasPos.height) {
    return
  }

  mouseTrack.push({
    x: relativeX,
    y: relativeY,
    time: Date.now(),
  })
  startDraw()
}

const setupTrailSketch = () => {
  const rect = canvasRef.value.getBoundingClientRect()
  canvasPos.x = rect.x
  canvasPos.y = rect.top
  canvasPos.height = rect.height
  setDelay(params.delay * 1000)
  setMinWidth(params.minWidth)
  setMaxWidth(params.maxWidth)
  setColor(255, 255, 255)
  setRoundCap(true)
  setOpacity(1)
}

watch(() => params.maxWidth, setMaxWidth)
watch(() => params.delay, () => setDelay(params.delay * 1000))
watch(
  () => params.color,
  () => setColor(params.color.r, params.color.g, params.color.b),
  { deep: true }
)

onMounted(() => {
  setupTrailSketch()
  document.addEventListener('mousemove', handleMousemove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMousemove)
})
</script>

<style lang="stylus">
.mouse-trail-sketch
  width: 100%
  height: 100%
</style>
