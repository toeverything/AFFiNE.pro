<template lang="pug">
.pricing-ai-section
  .content-row
    .join-cell
      .info-headline.mb-2 Turn all your ideas into reality
      .info-title.mb-2 AFFiNE AI
      .info-desc.mb-6 A true multimodal AI copilot.
      nuxt-link( :href="PATH.PRICING_JOIN_WAITLIST" target="_blank" rel="nofollow" )
        el-button.join-button(
          type="primary"
          size="action"
        ) Join Waiting List
      .join-desc.mt-3 Join the early access queue for $99.99/year.
    .features-row.flex
      .feature-cell
        .cell-headline
          nuxt-icon.text-14px( name="ai-write" filled )
          | Write with you
        .planning-list
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Create quality content from sentences to articles on topics you need
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Rewrite like the professionals
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Change the tones / fix spelling & grammar
      .feature-cell
        .cell-headline
          nuxt-icon.text-13px( name="ai-draw" filled )
          | Draw with you
        .planning-list
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Visualize your mind, magically
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Turn your outline into beautiful, engaging presentations
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Summarize your content into structured mind-map
      .feature-cell
        .cell-headline
          nuxt-icon.text-13px( name="ai-plan" filled )
          | Plan with you
        .planning-list
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Memorize and tidy up your knowledge
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Auto-sorting and auto-tagging
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Open source & Privacy ensured
  .section-bg
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'
</script>

<style lang="stylus">
.pricing-ai-section
  width: 100%
  position: relative
  background: #FFFFFF
  border: 1px solid #E3E2E4
  border-radius: 16px
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05)
  line-height: (15/12)
  color: #000

  .content-row
    display: flex
    gap: 54px
    padding: fluid-value(24, 36, 390, 768)
    padding-bottom: 8px

    @media (max-width: 1000px)
      flex-direction: column
      gap: 28px

  .join-cell

    .info-headline
      color: var(--brand)
      font-size: 12px
      font-weight: 500

    .info-title
      font-weight: 600
      font-size: 30px
      line-height: 36px
      letter-spacing: -0.02em

    .info-desc
      font-weight: 500
      font-size: 14px
      line-height: 20px
      letter-spacing: -0.02em

    .join-button
      font-weight: 500
      font-size: 14px
      line-height: 17px
      letter-spacing: -0.01em
      -webkit-font-smoothing: auto
      padding-left: 26px
      padding-right: 26px

    .join-desc
      font-size: 13px
      line-height: 19px
      color: #8E8D91
      max-width: 200px

  .features-row
    gap: 24px
    flex: 1

    @media (max-width: 768px)
      flex-direction: column
      padding-bottom: 24px

  .feature-cell
    flex: 1

    .cell-headline
      display: flex
      gap: 8px
      align-items: center
      font-weight: 500
      font-size: 14px
      line-height: 20px
      letter-spacing: -0.02em
      margin-bottom: 12px

    .planning-list
      padding-bottom: 0 !important

      .item
        & + .item
          margin-top: 8px

      .item-body
        font-weight: 400
        font-size: 14px
        line-height: 22px
        color: #424149

  .section-bg
    width: 100%
    height: 278px
    background-image: url(/pricing/affine-ai-bg.png)
    background-repeat: no-repeat
    background-size: 1080px 278px
    background-position: bottom center

    @media (max-width: 768px)
      display: none
</style>
