<template lang="pug">
.ai-feature-tarot-swiper
  .arrow-handler.is-left(
    :class="{ 'is-available': slideIndex > 0 }"
    @click="handleLeftClick"
  )
    nuxt-icon( name="ArrowRightBig" filled)
  .arrow-handler.is-right(
    :class="{ 'is-available': slideIndex < 4 }"
    @click="handleRightClick"
  )
    nuxt-icon( name="ArrowRightBig" filled)

  .slides-wrapper(
    ref="slidesWrapper"
  )
    ai-feature-card(
      v-for="(data, i) in list"
      :data="data"
      :onClick="handleCardClick"
      :key="data.id"
      :className="{ 'is-current': i === slideIndex, 'is-next': i === slideIndex + 1, 'is-prev': i === slideIndex - 1, 'is-backup': i > slideIndex + 1 || i < slideIndex - 1  }"
    )
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import type { AIFeatureCardData } from './ai-feature-card.vue'

const props = defineProps<{
  list: AIFeatureCardData[],
}>()

const slidesWrapper = ref(null)
const slideIndex = ref(0)

const { direction } = useSwipe(slidesWrapper)

watch(direction, () => {
  if (direction.value === 'RIGHT') {
    handleLeftClick()
  } else if (direction.value === 'LEFT') {
    handleRightClick()
  }
})

const handleLeftClick = () => {
  slideIndex.value = Math.max(0, slideIndex.value - 1)
}

const handleRightClick = () => {
  slideIndex.value = Math.min(4, slideIndex.value + 1)
}
</script>

<style lang="stylus">
.ai-feature-tarot-swiper
  position relative
  width: 100vw
  height: 100%
  margin-left: calc(-1 * var(--padding))
  margin-right: calc(-1 * var(--padding))

  .arrow-handler.is-right
    right: 24px !important

  .arrow-handler.is-left
    left: 24px !important

  .slides-wrapper
    --transform-y: 20px
    --transform-x: 0px
    position relative
    width: 375px
    left: calc(1 * var(--padding))
    height: 100%

  .ai-feature-card
    position absolute
    transition: 318ms
    transform: translateX(var(--transform-x)) translateY(var(--transform-y)) rotate(var(--rotate))

    &.is-prev
      z-index: 3
      --rotate: -3.73deg
      --transform-x: -120%

    &.is-current
      z-index: 2
      --transform-x: 20px
      --rotate: -3.73deg

    &.is-next
      --transform-x: 17px
      --rotate: 7.36deg

    &.is-backup
      opacity: 0
      --rotate: 7.36deg

</style>
