<template lang="pug">
.pricing-believer-tier
  .flex.gap-20px.w-full(
    class="flex-col md:flex-row"
  )
    .purchase-part
      .part-title.mb-1 Believer Plan
      .part-price.mb-6 $499.99

      nuxt-link( :href="PATH.PRICING_BELIEVER_TIER" target="_blank" rel="nofollow" )
        el-button.purchase-button(
          type="primary"
          size="action"
        ) Purchase

    .content-part(
      class="pb-30px md:pb-0"
    )
      .features-list.flex.flex-col.gap-18px
        .feature-item.flex.items-center.gap-2
          .item-icon
            nuxt-icon( name="AFFiNE-Icon" filled)
          .item-body Everything in AFFiNE Pro
        .feature-item.flex.items-center.gap-2
          .item-icon
            nuxt-icon( name="Done" filled)
          .item-body Life-time Personal usage
        .feature-item.flex.items-center.gap-2
          .item-icon
            nuxt-icon( name="Done" filled)
          .item-body 1TB Cloud Storage
        .feature-item.flex.items-center.gap-2
          .item-icon
            nuxt-icon( name="Done" filled)
          .item-body Dedicated Discord support with AFFiNE makers
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'
</script>

<style lang="stylus">
.pricing-believer-tier
  display: flex
  align-items: center
  background: #FFFFFF
  border: 1px solid #E3E2E4
  border-radius: 16px
  min-height: 300px
  background-image: url(/pricing/believer-tier-bg.png)
  background-size: cover
  background-position: right top
  box-shadow: 0px 1px 6px rgba(0,0,0,0.05)

  @media $mediaInMobile
    background-image: url(/pricing/believer-tier-bg-mobile.png)

  .purchase-part
    padding-left: fluid-value(24, 80)
    padding-top: 21px
    padding-bottom: 10px
    flex: 400

    .part-title
      font-weight: 600;
      font-size: 18px;
      line-height: 26px;
      color: #121212;

    .part-price
      font-weight: 700;
      font-size: 30px;
      line-height: 36px;
      color: #1E96EB;

    .purchase-button
      border-radius: 8px
      min-width: 98px

  .content-part
    flex: 800
    padding-left 24px
    padding-right 24px

    .feature-item
      .nuxt-icon
        font-size: 20px
      .item-body
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #121212;
</style>
