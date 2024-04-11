<template lang="pug">
.ai-feature-tarot-scrollable-wrapper
  .arrow-handler.is-left(
    :class="{ 'is-available': x > 0 }"
    @click="x -= 200"
  )
    nuxt-icon( name="ArrowRightBig" filled)
  .arrow-handler.is-right(
    :class="{ 'is-available': !arrivedState.right && elWidth < 1140 }"
    @click="x += 200"
  )
    nuxt-icon( name="ArrowRightBig" filled)

  .ai-feature-tarot-scrollable.transparent-scroll(
    ref="el"
  )
    .cards-list
      .card-hover-wrapper(
        v-for="data in list"
        :key="data.id"
        :class="[`wrapper-${data.id}`]"
      )
        ai-feature-card(
          :data="data"
          :onClick="handleCardClick"
        )
</template>

<script setup lang="ts">
import { useScroll, useResizeObserver } from '@vueuse/core'
import { PATH } from '~/utils/constants'

import type { AIFeatureCardData } from './ai-feature-card.vue'

const props = defineProps<{
  list: AIFeatureCardData[],
}>()

const el = ref<HTMLElement | null>(null)
const elWidth = ref(1144)

const { arrivedState, x } = useScroll(el, { behavior: 'smooth' })

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  elWidth.value = width
})

const handleCardClick = () => {
  window.open(PATH.AFFINE_AI_TRY, '_blank')
}
</script>

<style lang="stylus">
.ai-feature-tarot-scrollable-wrapper
  position relative
  top: -90px
  margin-left: calc(-1.5 * var(--padding))
  margin-right: calc(-1 * var(--padding))

.ai-feature-tarot-scrollable
  display: flex
  width: 100%
  height 590px
  overflow-x: scroll
  overflow-y: visible
  padding-top: 140px
  padding-bottom: 40px

  .cards-list
    position relative
    min-width: 1080px

  .card-hover-wrapper
    flex-shrink: 0
    top: 0
    position absolute
    --transform-y: 0px
    --transform-x: 20px

    &:hover
      --rotate: 0deg !important
      --transform-y: -100px

  .ai-feature-card
    transition: 318ms
    transform: translateX(var(--transform-x)) translateY(var(--transform-y)) rotate(var(--rotate))

  .wrapper-chat-with-ai
    --rotate: -3.73deg
    left: 0px

  .wrapper-inline-ai
    --rotate: 7.36deg
    left: 199px

  .wrapper-slides-ai
    --rotate: -1.87deg
    left: 422px

  .wrapper-mindmap-ai
    --rotate: 5.17deg
    left: 617px

  .wrapper-reality-ai
    --rotate: -4.56deg
    left: 811px
</style>
