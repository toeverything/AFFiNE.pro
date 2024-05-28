<template lang="pug">
.pricing-ai-section
  .content-row
    .join-cell
      .info-headline.mb-2 Turn all your ideas into reality
      .info-title.mb-2 AFFiNE AI
      .info-desc.mb-6 A true multimodal AI copilot.
      .row.mb-3
        nuxt-link( :href="PATH.PRICING_JOIN_WAITLIST" target="_blank" rel="nofollow" )
          el-button.join-button(
            type="primary"
            size="action"
          )
            .flex.flex-col
              .row-one $8.9 / month
              .row-two billed annually
      .row
        nuxt-link( :href="isInPricing ? '/ai' : PATH.AFFINE_AI_TRY" :target="isInPricing ? null : '_blank'" rel="nofollow" )
          el-button.join-button(
            :class="{ 'is-in-pricing': isInPricing }"
            type="primary"
            size="action"
            plain
          ) {{ isInPricing ? "Learn about AFFiNE AI" : "Try for Free" }}
    .features-row.flex
      .feature-cell
        .cell-headline
          nuxt-icon.text-20px( name="ai-write" filled )
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
          nuxt-icon.text-20px( name="ai-draw" filled )
          | Draw with you
        .planning-list
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Visualize your mind, magically
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Turn your outline into beautiful, engaging presentations(Beta)
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Summarize your content into structured mind-maps
      .feature-cell
        .cell-headline
          nuxt-icon.text-20px( name="ai-plan" filled )
          | Plan with you
        .planning-list
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Memorize and tidy up your knowledge
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Auto-sorting and auto-tagging (Coming soon)
          .item
            .item-icon
              nuxt-icon( name="dot")
            .item-body Privacy ensured
  .section-bg
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

const props = defineProps<{
  isInPricing?: boolean
}>()
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
  overflow: hidden

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
      font-size: 15px
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

    .el-button
      min-width: 160px

    .join-button
      font-weight: 500
      font-size: 14px
      line-height: 17px
      letter-spacing: -0.01em
      -webkit-font-smoothing: auto
      padding-left: 26px
      padding-right: 26px

      &.is-in-pricing
        padding-left: 16px
        padding-right: 16px

      .row-two
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        letter-spacing: -0.02em;
        color: rgba(255, 255, 255, 0.75);

      &.is-plain
        background: white

        &:hover
          color: var(--brand) !important
          background-color: brand(10) !important

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
      display: flex;
      flex-direction: column;
      gap: 8px
      color: #8E8D91

      .item
        display: flex
        gap: 8px
        padding: 0
        font-size: 14px
        align-items: flex-start !important

        .nuxt-icon
          font-size: 16px

      .item-body
        font-weight: 400
        font-size: 14px
        line-height: 22px
        color: #8E8D91

  .section-bg
    margin-top: 32px
    width: 100%
    height: 279px
    background-image: url(/pricing/affine-ai-bg.png)
    background-repeat: no-repeat
    background-size: 1080px 279px
    background-position: bottom center

    @media (max-width: 768px)
      display: none
</style>
