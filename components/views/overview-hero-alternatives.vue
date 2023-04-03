<template lang="pug">
.overview-hero-alternatives
  transition-group( name="list" )
    template( v-for="alter in alternatives" )
      .content-title.text-brand-grad( :key="alter" v-if="alter === currentAlter") {{ alter }}
</template>

<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'

const alternatives = ['Notion', 'Miro', 'Monday']
const currentIndex = ref(0)
const currentAlter = computed(() => alternatives[currentIndex.value])

useIntervalFn(() => {
  currentIndex.value++
  if (currentIndex.value >= alternatives.length) currentIndex.value = 0
}, 2000)
</script>

<style lang="stylus">
.overview-hero-alternatives
  position relative

  .list-enter-active,
  .list-leave-active
    transition: all 0.5s ease

  .list-enter-from,
  .list-leave-to
    opacity: 0
    transform: translateY(-50%)

  .list-enter-from
    transform: translateY(70%)
    transition-delay: 0.36s

  .list-leave-active
    position: absolute
    @media $mediaInMobile
      width: 100%
      text-align: center
</style>
