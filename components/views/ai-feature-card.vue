<template lang="pug">
.ai-feature-card(
  :class="[ `feature-${data.id}`, { 'has-handler': !!onClick }, className ]"
  @click="onClick"
)
  .try-it.flex.items-center.justify-center.gap-8px
    nuxt-icon.text-size-20px( name="AI" filled)
    | Try it

  .bg-img(
    :style="{ backgroundImage: `url(${data.image})` }"
  )
  .content-wrapper
    .info-title.flex.items-center.gap-8px
      | {{ data.title }}
      .beta-label( v-if="data.isBeta" ) Beta
    .info-desc {{ data.desc }}
</template>

<script lang="ts">
export type AIFeatureCardData = {
  isBeta?: boolean
  id: string
  title: string
  desc: string
  image: string
}
</script>

<script setup lang="ts">

const props = defineProps<{
  className: any,
  data: AIFeatureCardData,
  onClick: () => void
}>()

</script>

<style lang="stylus">
.ai-feature-card
  display: flex
  align-items: flex-end
  position relative
  width: 311px
  aspect-ratio: 311/374
  border: 1px solid #d0d0d0
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06)
  border-radius: 16px
  overflow: hidden

  &.has-handler
    cursor pointer

    &:hover
      .try-it
        opacity: 1


  .beta-label
    font-weight: 300;
    font-size: 8px;
    line-height: 9px;
    color: #7F7F7F;
    padding: 2px 5px;
    width: 28px;
    height: 14px;
    border: 0.5px solid #7F7F7F;
    border-radius: 10px;

  .try-it
    position absolute
    top: 167px
    left: 101px
    z-index 4
    padding: 10px 24px 10px 20px
    font-size: 15px
    font-weight: 500
    border-radius: 1000px
    background: rgba(0, 0, 0, 0.5)
    backdrop-filter: blur(25px)
    color: white
    opacity: 0
    transition: 318ms

    &:hover
      background: rgba(0, 0, 0, 0.7)

  .bg-img
    inset: 0
    position absolute
    background-repeat: no-repeat

  &:before
    content: ''
    inset: 0
    position absolute
    z-index -1
    background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)

  &.feature-chat-with-ai
    .bg-img
      background-position: 30px 30px
      background-size: 281px

  &.feature-inline-ai
    .bg-img
      background-position: 24px 31px
      background-size: 287px

  &.feature-mindmap-ai
    .bg-img
      background-size: 311px

  &.feature-slides-ai
    .bg-img
      background-position: 20px 22px
      background-size: 291px

  &.feature-reality-ai
    .bg-img
      background-size: 311px

  .content-wrapper
    position relative
    z-index 3
    width: 100%
    padding: 48px 24px 24px
    min-height: 112px
    background: linear-gradient(180deg, rgba(249, 249, 249, 0.5) 0%, #F8F8F8 35%, #F6F6F6 100%)

  .info-title
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000

  .info-desc
    font-size: 13px;
    line-height: 20px;
    color: #424149
</style>
