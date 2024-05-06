<template lang="pug">
.ai-feature-tarot
  client-only
    ai-feature-tarot-scrollable(
      :list="featureCards"
    )
    ai-feature-tarot-swiper(
      v-if="$device.isMobile"
      :list="featureCards"
    )
</template>

<script setup lang="ts">
import type { AIFeatureCardData } from './ai-feature-card.vue'

const featureCards: AIFeatureCardData[] = [
  {
    id: 'chat-with-ai',
    title: 'Chat with AI',
    desc: 'Get instant insights to all your questions.',
    image: '/ai/feature-chat-with-ai.png'
  },
  {
    id: 'inline-ai',
    title: 'Edit Inline with AI',
    desc: 'Perfect tone, spelling, and summaries in seconds.',
    image: '/ai/feature-inline-ai.png'
  },
  {
    isBeta: true,
    id: 'slides-ai',
    title: 'Make Presentation with AI',
    desc: 'Craft polished, presentation-ready slides with just one click.',
    image: '/ai/feature-slides-ai.png'
  },
  {
    id: 'mindmap-ai',
    title: 'Generate Mindmap with AI',
    desc: 'Expand thinking & untangle complexity with magic mind-map.',
    image: '/ai/feature-mindmap-ai.png'
  },
  {
    isBeta: true,
    id: 'reality-ai',
    title: 'Make it Real with AI',
    desc: 'From concept to completion, turn ideas into reality.',
    image: '/ai/feature-reality-ai.png'
  },
]
</script>

<style lang="stylus">
.ai-feature-tarot
  height: 490px

  .ai-feature-tarot-swiper
    height: 100%
    display: none

  @media (max-width: 480px)
    height: 414px

    .ai-feature-tarot-scrollable-wrapper
      display: none

    .ai-feature-tarot-swiper
      display: block

  .arrow-handler
    position absolute
    display: flex
    align-items: center
    justify-content: center
    top: 50%
    z-index: 10
    background: rgba(0, 0, 0, 0.8)
    border-radius: 50%
    width: 40px
    height: 40px
    transition: 318ms
    transform: translateY(-50%)
    font-size: 24px
    cursor pointer
    opacity: 0
    visibility hidden

    &.is-available
      opacity: 1
      visibility visible

    &:hover
      background: #000

    &.is-left
      left: 40px
      svg
        transform: rotate(180deg)

    &.is-right
      right: 40px

</style>
