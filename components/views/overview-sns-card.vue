<template lang="pug">
.overview-sns-card-wrapper(
  :style="{ '--x': `${elementX}px`, '--y': `${elementY}px` }"
)
  nuxt-link.overview-sns-card(
    ref="el"
    rel="nofollow"
    :to="sns.link"
    target="_blank"
    :style="{ '--fill': `url(#vertical-gradient-${sns.iconName})` }"
  )
    nuxt-icon.sns-icon(
      filled
      :name="sns.iconName"
    )
    .sns-name {{ sns.name }}
    svg(
      style="width:0;height:0;position:absolute;"
      focusable="false"
    )
      defs
        linearGradient( :id="`vertical-gradient-${sns.iconName}`" x2="0" y2="100%")
          stop(
            offset="0%"
            stop-color="var(--color-stop-top)"
          )
          stop(
            offset="100%"
            stop-color="var(--color-stop-down)"
          )
  .cursor-vfx
    .circle
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

const props = defineProps<{
  sns: {
    name: string
    iconName: string
    link: string
  }
}>()

const el = ref(null)
const { elementX, elementY } = useMouseInElement(el, { handleOutside: false })
</script>

<style lang="stylus">
.overview-sns-card
  display flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 160px
  height: 95px
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.1)
  border: 1px solid #E3E3E3
  backdrop-filter: blur(18px)
  border-radius: 8px

  &-wrapper
    --icon-color: #666
    --name-color: #666
    --cursor-color: #1E96EB
    --color-stop-top: #666
    --color-stop-down: #666
    position relative
    border-radius: 8px

    @media $mediaInDesktop
      overflow: hidden

    .cursor-vfx
      position absolute
      z-index -1
      left: 0
      top: 0
      opacity: 0
      transition: opacity 318ms
      transform: translate3d(-50%, -50%, 0) translate3d(var(--x), var(--y), 0)

      @media $mediaInXS
        display: none

      .circle
        width: 100px
        height: 100px
        border-radius: 30% 70% 26% 74% / 81% 61% 39% 19%
        background: radial-gradient(300px circle,var(--cursor-color),transparent 40%)

    svg stop
      transition: 318ms

  .sns-icon
    font-size: 50px
    margin-bottom: 6px

    svg path
      fill: var(--fill) !important

  .sns-name
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color var(--name-color)
    transition: 318ms

  @media $mediaInXS
    width: 83.43px
    height: 49.54px
    backdrop-filter: blur(9px)
    border-radius: 4.17143px;
    border-width: 0.5px !important

    .sns-icon
      font-size: 25px
      margin-bottom: 3px

    .sns-name
      font-size: 8.34285px;
      line-height: 10px;

  &-wrapper
    &:hover
      --color-stop-top: #1E96EB
      --color-stop-down: #1E96EB
      --name-color: #1E96EB

      .cursor-vfx
        opacity: 0.3

  /html.dark &
    background: linear-gradient(0deg, rgba(60, 60, 60, 0.2) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.1);
    border: 1px solid #494949;

    &-wrapper
      --icon-color: #fff
      --name-color: #9B9B9B
      --cursor-color: #5438FF
      --color-stop-top: #fff
      --color-stop-down: #fff

    &-wrapper
      &:hover
        --name-color: #5438FF
        --color-stop-top: #6999FF
        --color-stop-down: #5438FF

</style>
