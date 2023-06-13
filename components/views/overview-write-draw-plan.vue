<template lang="pug">
.overview-write-draw-plan
  .container.flex.flex-col.items-center
    overview-write
    overview-draw
    overview-plan
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.overview-write-draw-plan
  padding-top: fluid-value(44, 100)

  .container
    --width 1920px
    padding: fluid-value(17, 84, 390, 1920)
    gap: fluid-value(28, 120)

.feature-card
  --theme-color: #C775C3
  --glow-opacity: 0
  display: flex
  align-items: center
  position: relative
  overflow: hidden
  width: 100%
  background: rgba(255, 255, 255, 0.05)
  border: 0px solid transparent
  border-radius: fluid-value(10, 30)
  padding: 44px 30px 30px
  padding-left: fluid-value(58, 200, 390, 1920)
  padding-right: fluid-value(58, 138, 390, 1920)
  min-height: fluid-value(439, 883)

  // This will cause lag
  @media $mediaInDesktop
    // backdrop-filter: blur(150px)

  @media (max-width: 1440px)
    padding-left: fluid-value(58, 72)
    padding-right: 18px

  @media $mediaInSmallScreen
    flex-direction: column
    padding-right: fluid-value(58, 128, 390, 1920)

  &:before
    pointer-events: none
    content: ''
    position: absolute
    inset: -0px
    border: 3px solid rgba(255, 255, 255, 0.1)
    border-radius: fluid-value(10, 30)

  &:after
    pointer-events: none
    content: ''
    position: absolute
    width: percentage(1270/1751)
    height 87px
    background: var(--theme-color)
    filter: blur(90px)
    bottom: 0
    left: 50%
    transform: translate3d(-50%, 70%, 0)
    opacity: var(--glow-opacity)

  .content-part
    min-height: fluid-value(50, 400)

  .card-desc
    font-size: fluid-value(14, 20)
    line-height: (24/20)
    white-space: pre-line

  .cover-part
    flex: 1

  .cover-image
    background-size: contain
    background-repeat: no-repeat
    background-position: center center

</style>
