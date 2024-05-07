<template lang="pug">
.ai-hero
  client-only
    ai-hero-stars-scene(
      v-if="$device.isDesktop"
    )

  .content-row.flex.flex-col.items-center
    ProductHuntButton.mb-4
    .ai-text-logo(
      :class="{ 'is-mobile': $device.isMobile }"
      :style="{ '--x': `${elementX}px` }"
      ref="logoEl"
    )
      icon-ai-star.icon-star
      .magic-wrapper
        .magic-wand-wrapper
          .magic-wand
            .upper-part
            .lower-part
        .black-text-layer
          | AFFiNE AI
          .blue-text-layer AFFiNE AI
    .hero-desc
      .row.text-center
        | Your AI Partner&nbsp;
        span.highlight Helps You Better
        icon-ai-desc-scribble.icon-scribble
      .row.text-center Write, Draw and Present.

  .actions-row.flex.justify-center
    nuxt-link(
      :to="PATH.PRICING_JOIN_WAITLIST"
      target="_blank"
    )
      el-button.pay-button(
        size="large"
        type="default"
      )
        .flex.flex-col
          .row-one $8.9 / month
          .row-two billed annually
    nuxt-link(
      :to="PATH.AFFINE_AI_TRY"
      target="_blank"
    )
      el-button.try-button(
        size="large"
        type="secondary"
      ) Try for Free
</template>

<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { PATH } from '~/utils/constants'

const logoEl = ref()

const { elementX } = useMouseInElement(logoEl)

</script>

<style lang="stylus">
.ai-hero
  padding-top: 60px

  .ai-text-logo
    margin-top: 10px
    position relative
    font-size: fluid-value(65, 90)
    --x: 0
    --magic-wand-y: 0

    &.is-mobile
      .magic-wand-wrapper,
      .blue-text-layer
        display: none !important

    &:hover
      .magic-wand-wrapper
        transform: translateY(0%)

      .blue-text-layer
        opacity 1

    .magic-wrapper
      position relative
      width: 100%
      height: 100%
      overflow-x: visible
      overflow: hidden

    .magic-wand-wrapper
      position absolute
      height: 100%
      top: 0
      z-index 3
      transition: 318ms
      transition-delay: 168ms
      transform: translateY(100%)

    .magic-wand
      position absolute
      top: 30px
      left: 15px
      width: 17px
      height: 199.8px
      filter: drop-shadow(0px 2.57438px 6.4463px rgba(0, 0, 0, 0.25));
      transform: translateY(var(--magic-wand-y)) translateX(var(--x)) rotate(-16.11deg)

      > *
        position: absolute
        width: 100%

      .upper-part
        height: 26.41px
        background: linear-gradient(90deg, #F0F1F4 0%, #FFFFFF 16%, #FFFFFF 79.5%, #F0F1F4 100%)

      .lower-part
        height: 174px
        bottom: 0
        background: linear-gradient(90deg, #181310 0%, #3C4851 60.24%, #181310 104.76%)

    .icon-star
      position absolute
      width: (37/90em)
      right: -(20/90em)
      top: -(20/90em)

    .black-text-layer
      font-weight: 500
      padding: 0 20px
      font-size: 1em
      line-height: 1
      text-align: center
      letter-spacing: -0.07em
      position: relative
      color: black
      user-select: none

    .blue-text-layer
      position absolute
      opacity 0
      z-index 2
      left: 20px
      top: 0
      user-select: none
      background: radial-gradient(80px 257.93% at calc(var(--x) - 20px) 86.67%, #1E96EB 0%, #1E96EB 18.5%, #1E96EB 34.5%, transparent 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      transition: 318ms
      transition-delay: 168ms

  .hero-desc
    margin-top: 16px
    font-weight: 500
    font-size: fluid-value(20, 24)
    line-height: (32/24)
    letter-spacing: -0.02em
    color: #8E8D91
    position relative

    .icon-scribble
      width: 1.375em
      position absolute
      right: -(35/24em)
      top: -10px

    .highlight
      color: #000

  .actions-row
    padding: relative
    z-index: 2
    margin-top: fluid-value(32, 56)
    gap: 16px

    @media (max-width: 550px)
      flex-direction: column
      align-items: center

    .el-button
      min-width: 204px
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      letter-spacing: -0.02em;

    .pay-button
      .row-two
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        letter-spacing: -0.02em;
        color: rgba(255, 255, 255, 0.75);

    .try-button
      background: transparent
      border-color: #CCCCCC
</style>
