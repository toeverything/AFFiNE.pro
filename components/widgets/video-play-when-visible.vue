<template lang="pug">
video( :src="src" ref="el" loop muted playsinline)
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const props = defineProps<{
  src: string,
  isActive?: boolean
}>()

const el = ref()

const targetIsVisible = useElementVisibility(el)

watch(targetIsVisible, (val) => {
  if (val && props.isActive) {
    el.value.play()
  } else {
    el.value.pause()
  }
})
</script>

<style lang="stylus">
video
  width: 100%
  height: 100%
  object-fit: cover
</style>
