<template lang="pug">
.scroll-trigger-container
  .trigger-container(
    ref="$trigger"
    :style="{ height: finalHeight }"
  )
    slot( name="trigger-content" )
  .pin-content-container
    slot
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'

const estimatedScreenPerSecond = 0.5

const props = withDefaults(defineProps<{
  height?: string
  estimatedSeconds?: number,
}>(), {
  height: '150vh'
})

const $trigger = ref(null)
const finalHeight = computed(() => {
  if (props.estimatedSeconds) {
    return `${estimatedScreenPerSecond * props.estimatedSeconds * 100}vh`
  }

  return props.height
})

defineExpose({
  $trigger
})
</script>

<style lang="stylus">
.scroll-trigger-container
  min-height: 100vh
  min-height: 100dvh
  position relative

  .scroller-container
    pointer-events: none

  .pin-content-container
    position absolute
    top: 0
    left: 0
    width: 100%
    // height: 100vh
    // height: 100dvh
    // min-height: 700px
    z-index: 1
    display: flex
    // align-items: center
    justify-content: center

</style>
