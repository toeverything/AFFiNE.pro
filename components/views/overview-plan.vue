<template lang="pug">
.feature-card.overview-plan(
  :style="{ '--glow-opacity': dynamicStates.glowOpacity }"
)
  .content-part
    .layer-front
      nuxt-icon.card-icon(
        filled
        name="plan"
      )
      .card-title {{ $t('overviewPage.modulePlanTitle') }}
      .card-desc {{ $t('overviewPage.modulePlanDesc') }}
    .layer-back.launch-pad
      .pad-row
        .pad-cell.type-gradient
        .pad-cell.type-gradient
        .pad-cell.type-gradient
      .pad-row
        .pad-cell.type-flat
        .pad-cell.type-flat
        .pad-cell.type-flat
      .pad-row
        .pad-cell.type-flat
        .pad-cell.type-flat
        .pad-cell.type-flat
      .pad-row
        .pad-cell.type-flat
        .pad-cell.type-flat
        .pad-cell.type-flat

  .cover-part
    .cover-image.cover-database
</template>

<script setup lang="ts">
import gsap from 'gsap'

const dynamicStates = reactive({
})

const setupScrollTrigger = () => {
  gsap.to(dynamicStates, {
    glowOpacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '.overview-plan',
      start: '55% center',
    }
  })
}

onMounted(() => {
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.feature-card.overview-plan
  gap: fluid-value(40, 140, 390, 1920)

  @media $mediaInMiddleScreen
    column-gap: 0

  .card-title
    font-weight: 700;
    font-size: fluid-value(24, 40);
    line-height: (48/40);
    margin-bottom: fluid-value(8, 27)
    max-width: 360px

  .card-icon
    font-size: 32px
    margin-bottom: 24px

    @media $mediaInSmallScreen
      position: absolute
      left: 0
      top: 2px

  .card-desc
    max-width: fluid-value(250, 400)
    line-height: 2

  .content-part
    position: relative
    flex-shrink: 0

    @media $mediaInSmallScreen
      padding-left: 40px

  .layer-front
    pointer-events: none

  .layer-back
    position: absolute
    top: 15%
    left: -1%

    @media $mediaInSmallScreen
      left: 40px

  .launch-pad
    width: 120%
    max-width: 537px

    @media $mediaInSmallScreen
      width: 50%

    .pad-row
      display: flex
      gap: 5px
      margin-bottom: 9px

    .pad-cell
      --overlay-opacity: 0
      --start-color: rgba(255, 255, 255, 0.044)
      --end-color: rgba(217, 217, 217, 0)
      --border-color: rgba(255, 255, 255, 0)
      aspect-ratio: 176/70
      background: linear-gradient(180deg, var(--start-color) 0%, var(--end-color) 100%);
      transition: 318ms
      border-radius: 6px
      flex: 1
      position: relative
      overflow: hidden

      &.type-gradient
        &:after
          content: ""
          pointer-events: none
          user-select: none
          position: absolute
          inset: 0px
          border-radius: inherit
          padding: 1px
          background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))
          -webkit-mask: linear-gradient(black, black) content-box content-box, linear-gradient(black, black)
          -webkit-mask-composite: xor

        &:hover
          --border-color: rgba(255, 255, 255, 0.2)

      &:before
        content: ''
        position: absolute
        inset: 0
        background: rgba(255, 255, 255, 0.1)
        opacity: var(--overlay-opacity)
        border-radius: inherit
        transition: 368ms
        border: 1px var(--border-color) solid

      &:hover
        --overlay-opacity: 1

      &.type-flat
        --start-color: rgba(255, 255, 255, 0.042)
        --end-color: rgba(217, 217, 217, 0.036)

  .cover-part
    position: relative
    z-index: 2

  .cover-database
    min-width: 837px
    aspect-ratio: 837/511
    background-image: url(@/assets/overview/module-plan-cover.png)

    @media $mediaInSmallScreen
      min-width: 329px

</style>
