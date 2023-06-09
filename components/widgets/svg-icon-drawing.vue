<template lang="pug">
transition( name="el-fade-in" )
  span.svg-icon-drawing(
    v-if="isShow"
    :style="{ '--duration': duration, '--delay': delay }"
  )
    slot
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  isShow?: boolean
  delay: string
  duration?: string
}>(), {
  delay: '0s',
  duration: '1s'
})
</script>

<style lang="stylus">
.svg-icon-drawing
  // display: none

  // &.is-show
  //   display: block

  path
    // A little larger than 1 to prevent flickering
    stroke-dasharray: 1.01
    stroke-dashoffset: 1
    animation: drawing-animation cubic-bezier(0.4, 0, 0.2, 1) forwards
    animation-duration: var(--duration)
    animation-delay: var(--delay)
    opacity: 0

  @keyframes drawing-animation
    0%
      opacity: 0
      stroke-dashoffset: 1

    1%
      opacity: 1
      stroke-dashoffset: 1

    100%
      stroke-dashoffset: 0
      opacity: 1

  @keyframes clear-animation
    0%
      stroke-dashoffset: 0

    100%
      stroke-dashoffset: 1

</style>
