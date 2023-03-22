<template lang="pug">
client-only
  vue3-lottie(
    ref="com"
    v-bind="$props"
    :loop="1"
    :playOnHover="true"
    @mouseleave="handleMouseleave"
  )
</template>

<script setup lang="ts">
export interface LottieProps {
  animationData: any
  animationLink: string
  loop: boolean | number
  autoPlay: boolean
  rendererSettings: any
  width: number | string
  height: number | string
  speed: number
  delay: number
  direction: string
  pauseOnHover: boolean
  playOnHover: boolean
  backgroundColor: string
  pauseAnimation: boolean
}

const props = withDefaults(defineProps<LottieProps>(), {
  width: '50px',
  height: '50px',
  speed: 4
})

const com = ref<any>(null)

const handleMouseleave = (event: Event) => {
  const target = event.target
  if (target === com.value?.$el) {
    com.value.stop()
  }
}

</script>
