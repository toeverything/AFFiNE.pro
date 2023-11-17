<template lang="pug">
vue3-lottie(
  ref="com"
  v-bind="$props"
  @mouseenter="handleMouseenter"
  @mouseleave="handleMouseleave"
  @onComplete="handleComplete"
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
  speed: 1,
  autoPlay: false
})

const { isMobile } = useDevice()
const isPlaying = ref(false)
const needNextPlay = ref(false)
const com = ref<any>(null)

const handleMouseenter = (event: Event) => {
  if (isMobile || !com.value || isPlaying.value) {
    needNextPlay.value = true
    return
  }

  isPlaying.value = true
  needNextPlay.value = true

  com.value?.play()
}

const handleMouseleave = (event: Event) => {
  const target = event.target
  if (target === com.value?.$el) {
    needNextPlay.value = false
  }
}

const handleComplete = () => {
  if (needNextPlay.value) {
    com.value?.stop()
    com.value?.play()
  } else {
    isPlaying.value = false
  }
}

</script>
