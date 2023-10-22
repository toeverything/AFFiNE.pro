<template lang="pug">
.brand-glow-button.flex.items-center.justify-center(
  @click="handleClick"
  :class="{ 'is-disabled': disabled, 'need-shadow': needShadow }"
)
  .button-text
    slot
  .text-brand-grad
    slot
</template>

<script setup lang="ts">
defineProps<{
  needShadow?: boolean
  disabled?: boolean
}>()
</script>

<style lang="stylus">
.brand-glow-button
  position relative
  --background-color: #000
  height: fluid-value(38, 52)
  padding: 0 29px
  color: #fff
  font-weight: 500;
  font-size: fluid-value(16, 24)
  border-radius: 10px
  transition: 368ms
  cursor pointer
  white-space: pre

  &.need-shadow
    // box-shadow: 0px 4px 21px rgba(14, 85, 238, 0.54), 0px 4px 84px rgba(138, 175, 255, 0.3)

  .button-text
    position relative
    z-index 2

  &:after
    border-radius: 10px
    content: ''
    // background: linear-gradient(180deg, #0E55EE 0%, #002A86 100%)
    position absolute
    pointer-events: none
    z-index: 1
    inset: 0

  &:before
    border-radius: 9px
    content: ''
    position absolute
    pointer-events: none
    inset: 2px
    z-index: 2
    background: var(--background-color)
    transition: 150ms cubic-bezier(.42, 0, .58, 1)

  .text-brand-grad
    opacity: 0
    position absolute
    transition: 368ms
    z-index 3
    background-image: linear-gradient(179.54deg, #6A51FF 2.51%, #4326FF 16.25%, #003096 94.57%, #0A3EAD 101.87%)

  .button-text
    color: transparent !important
    background-clip: text
    background-image: linear-gradient(white, white)

  &.is-disabled
    cursor not-allowed
    box-shadow: none
    border: 1px solid var(--black-quaternary, #CCC);
    --background-color: #fff
    color: black
    .button-text
      background-image: linear-gradient(#000, #000)

    &:after
      display none

  &:not(.is-disabled)
    &:hover
      --background-color: #424149
      // box-shadow: 0px 4px 80px #1D62F4, 0px 4px 21px rgba(14, 85, 238, 0.54), 0px 4px 84px rgba(138, 175, 255, 0.3);

    &:active
      transform: translateY(2px)

</style>
