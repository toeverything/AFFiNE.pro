<template lang="pug">
.overview-ai
  .limit-container.flex.flex-col.items-center
    h2.section-title.section-grad-title.relative
      | AI<br/>
      | partner helps you better
      | write, draw and plan.
      nuxt-icon.title-star( name="star" )

    .section-desc Let’s you think bigger, create faster, work smarter in anytime, anywhere

    nuxt-link(
      to="/ai"
    )
      el-button(
        type="default"
        size="large"
      )
        .flex.items-center.gap-2
          | Learn more
          nuxt-icon( name="star" )

    .ai-cards-list.scrollable(
      ref="scrollList"
    )
      .flex.list-content
        .left-spacer
        .ai-card(
          v-for="(cardUrl, i) in aiCards"
          :data-item="i"
          :key="cardUrl"
          :style="{ backgroundImage: `url(${cardUrl})` }"
        )
        .right-spacer

    .ai-cards-dots.flex.justify-center
      .dot-item(
        v-for="(_, i) in aiCards"
        :class="{ 'is-active': i === currentIndex }"
        @click="() => handleDotClick(i)"
      )
        .dot-circle
</template>

<script setup lang="ts">
import { useResizeObserver, useScroll } from '@vueuse/core';

const scrollList = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isSwitching = ref(false)
const cardWidthRef = ref(0)
const widthOffsetRef = ref(1)

const aiCards = [
  '/overview/ai/1.png',
  '/overview/ai/2.png',
  '/overview/ai/3.png',
  '/overview/ai/4.png',
  '/overview/ai/5.png',
]

let timer: any

const { x, isScrolling } = useScroll(scrollList, {
  behavior: 'smooth'
})

const getCardWidthAndGap = () => {
  const gap = window.innerWidth > 768 ? 34 : 12
  const cardWidth = cardWidthRef.value || 400

  return {
    gap,
    cardWidth
  }
}

watch(x, () => {
  if (isSwitching.value) return
  const { gap, cardWidth } = getCardWidthAndGap()
  const index = Math.round(x.value / (cardWidth / widthOffsetRef.value - gap))
  currentIndex.value = Math.min(aiCards.length - 1, index)
})

const handleDotClick = (index: number) => {
  clearTimeout(timer)
  currentIndex.value = index
  isSwitching.value = true
  timer = setTimeout(() => {
    isSwitching.value = false
  }, 500)
}

watch(currentIndex, () => {
  if (isScrolling.value && !isSwitching.value) return
  const { gap, cardWidth } = getCardWidthAndGap()
  x.value = window.innerWidth > 744
    ? currentIndex.value * (cardWidth / widthOffsetRef.value - gap)
    : currentIndex.value * (cardWidth + gap)
})

useResizeObserver(scrollList, () => {
  cardWidthRef.value = document.querySelector('.ai-card[data-item="0"]')?.getBoundingClientRect().width || 0

  const isBigScreen = window.innerWidth > 1440
  const isTabletScreen = window.innerWidth > 768
  let widthOffset = isTabletScreen ? 1.2 : 1
  if (isBigScreen) {
    widthOffset = 1.38
  }
  widthOffsetRef.value = widthOffset
})
</script>

<style lang="stylus">
.overview-ai
  padding-top: fluid-value(60, 120)
  padding-bottom: fluid-value(40, 60)

  .title-star
    font-size: fluid-value(16, 24)
    color: #1e96eb
    top: -2px
    left: 50%
    margin-left: fluid-value(24, 40)
    transform: translateX(-50%)
    position absolute

  .section-title
    background: radial-gradient(59.95% 118.21% at 50% 19.91%, #1E96EB 0%, #1E96EB 12.75%, #000000 77%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    max-width: 640px

    &::selection
      background: rgba(#1e96eb, 0.1)

  .section-desc
    max-width: 390px
    margin-top: 16px
    margin-bottom: fluid-value(24, 32)
    font-size: 16px;
    line-height: 24px;
    color: #424149;

  .ai-cards-list
    width: 100vw
    overflow-x: auto
    margin-top: fluid-value(32, 64, 390, 744)
    &::-webkit-scrollbar
      height: 1px

    &::-webkit-scrollbar *
      background: transparent

    &::-webkit-scrollbar-thumb
      background: rgba(255,0,0,0.001) !important

    .list-content
      gap: fluid-value(14, 34, 390, 744)

      > *
        flex-shrink: 0

    .left-spacer
      width: calc((100vw - 1080px) / 2 - 36px)

      @media (max-width: 744px) {
        width: 38px
      }

    .right-spacer
      width: fluid-value(1, 400, 744, 1920)

    @media (min-width: 2200px)
      .list-content
        justify-content: center

      .left-spacer,
      .right-spacer
        width: 0

  .ai-card
    aspect-ratio: 400/520
    background-size: cover
    width: fluid-value(285, 400, 390, 744)

  .ai-cards-dots
    gap: 4px
    padding-top: fluid-value(32, 64)

    @media (min-width: 2200px) {
      display: none
    }

  .dot-item
    display: flex
    justify-content: center
    align-items: center
    width: 32px
    height: 32px
    cursor pointer

    .dot-circle
      width: 8px
      height: 8px
      border-radius: 50%
      background: #CCCCCC
      transition: 318ms

    &:hover
      .dot-circle
        background: #808080

    &.is-active
      .dot-circle
        background: #1E96EB
        transform: scale(1.5)

</style>
