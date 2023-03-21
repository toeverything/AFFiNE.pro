<template lang="pug">
.hover-spotlight-card(
  ref="el"
  :style="{ '--cursor-x': elementX, '--cursor-y': elementY, '--light-size': `${lightSize}px` }"
)
  .spotlight( v-if="enableHover" )
  slot
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

const props = withDefaults(defineProps<{
  enableHover: boolean,
  lightSize: number
}>(), {
  lightSize: 400,
  enableHover: true
})
const el = ref(null)

const { elementX, elementY } = useMouseInElement(el, { handleOutside: false })

</script>

<style lang="stylus">
.hover-spotlight-card
  overflow: hidden
  position: relative
  --light-color: rgba(150,150,150,0.1)
  --radius: 12px
  --border: 2px
  --y: calc((var(--cursor-y) * 1px))
  --x: calc((var(--cursor-x) * 1px))

  .spotlight
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: 1;
    opacity: 0;
    top: var(--border);
    bottom: var(--border);
    left: var(--border);
    right: var(--border);
    border-radius: var(--radius);
    will-change: background, opacity;
    background: radial-gradient(var(--light-size) circle at var(--x) var(--y), var(--light-color),transparent)
    contain: strict
    transition: opacity 400ms ease 0s

  &:hover
    .spotlight
      opacity: 1

  /html.dark &
    --light-color: rgba(255,255,255,0.1)
</style>
