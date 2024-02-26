<template lang="pug">
.page.page-price
  .section.section-hero
    .limit-container.flex.flex-col
      h1.ma-0.hero-title {{ $t('pricePage.title') }}
      .hero-desc {{ $t('pricePage.desc') }}
  .section.section-prices
    .limit-container.flex.flex-col.items-center

      .tab-bar.flex( :class="[`active-${currentTab}`]" )
        .tab-active-bg
        .tab.tab-monthly( @click="() => currentTab = 'monthly'" )
          span {{ $t('pricePage.monthly') }}
        .tab.tab-yearly( @click="() => currentTab = 'yearly'" )
          span.flex
            | {{ $t('pricePage.yearly') }}&nbsp;
            span.color-emphasis {{ $t('pricePage.yearlyDiscount') }}

      .prices-list.flex
        .price-card.type-free
          .card-header
            .planning-name {{ $t('pricePage.free') }}
            .price-row.flex.items-end.gap-2
              .price-amount $0
              .per-time-tips.headline-6 {{ $t('pricePage.perMonth') }}
            track-link( :href="PATH.AFFINE_WEB_APP" action="Get started" :params="{ resolve: 'Get Started', placement: currentTab === 'yearly' ? 'pricing_page_yearly' : 'pricing_page_monthly' }"  target="_blank")
              el-button.is-outlined(
                type="primary"
                size="action"
              ) {{ $t('pricePage.freeAction') }}
          .planning-list
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemUnlimitedLocalWorkspaces') }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemUnlimitedLoginDevices') }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemUnlimitedBlocks') }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemStorage', [10]) }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemMaxFileSize', [10]) }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemMaxMembers', [3]) }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemMaxVersionHistory', [7]) }}

        .price-card.type-pro
          .black-friday-label(
            v-if="CONFIG.ENABLE_BLACK_FRIDAY"
            @click="handleCopyCouponClick"
            :class="{ 'has-copied': copied }"
          )
            | Get Coupon: {{ couponCode }}
            nuxt-icon.text-size-18px( :name="copied ? 'tick' : 'copy'" filled)

          .card-header
            .planning-name.flex.items-center.gap-2
              span.pro-label {{ $t('pricePage.pro') }}
              transition( name="fade" :duration="300" )
                .discount-tag.color-emphasis( v-if="isYearly" ) {{ $t('pricePage.yearlyDiscount') }}

            .price-row.flex.items-end.gap-2
              .price-amount {{ currentTab === 'yearly' ? '$6.75' : '$7.99' }}
              .per-time-tips.headline-6 {{ $t('pricePage.perMonth') }}
            nuxt-link( :href="proActionLink" target="_blank" rel="nofollow" )
              el-button(
                type="primary"
                size="action"
              ) {{ $t('pricePage.proAction') }}
          .planning-list
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemUnlimitedLocalWorkspaces') }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemUnlimitedLoginDevices') }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemUnlimitedBlocks') }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemStorage', [100]) }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemMaxFileSize', [100]) }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemMaxMembers', [10]) }}
            .item
              .item-icon
                nuxt-icon( name="Done" filled)
              .item-body {{ $t('pricePage.itemMaxVersionHistory', [30]) }}
        .price-card.type-team
          .card-header
            .planning-name {{ $t('pricePage.team') }}
            .price-row.flex.items-center.gap-2
              .coming-soon-tips {{ $t('comingSoon') }}...
            nuxt-link( :href="PATH.PRICING_CONTACT_FORM_TEAM" target="_blank" rel="nofollow" )
              el-button.is-outlined(
                type="primary"
                size="action"
              ) {{ $t('pricePage.contactSalesTeam') }}
          .planning-list
            .item
              .item-icon
                nuxt-icon( name="dot" filled)
              .item-body {{ $t('pricePage.teamItemA') }}
            .item
              .item-icon
                nuxt-icon( name="dot" filled)
              .item-body {{ $t('pricePage.teamItemB') }}
            .item
              .item-icon
                nuxt-icon( name="dot" filled)
              .item-body {{ $t('pricePage.teamItemC') }}

        .price-card.type-enterprise
          .card-header
            .planning-name {{ $t('pricePage.enterprise') }}
            .price-row.flex.items-center.gap-2
              .coming-soon-tips {{ $t('comingSoon') }}...
            nuxt-link( :href="PATH.PRICING_CONTACT_FORM_ENTERPRISE" target="_blank" rel="nofollow" )
              el-button.is-outlined(
                type="primary"
                size="action"
              ) {{ $t('pricePage.contactSalesEnterprise') }}
          .planning-list
            .item
              .item-icon
                nuxt-icon( name="dot" filled)
              .item-body {{ $t('pricePage.enterpriseItemA') }}
            .item
              .item-icon
                nuxt-icon( name="dot" filled)
              .item-body {{ $t('pricePage.enterpriseItemB') }}
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { PATH, INFO, CONFIG } from '~/utils/constants'

const { t } = useI18n()

const store = useStore()
const currentTab = ref('monthly')
const couponCode = ref('BF23')

const isMonthly = computed(() => currentTab.value === 'monthly')
const isYearly = computed(() => currentTab.value === 'yearly')

const proActionLink = computed(() => {
  let baseLink = isMonthly.value ? PATH.PRICING_PRO_MONTHLY : PATH.PRICING_PRO_YEARLY

  if (store.context.coupon) {
    baseLink = `${baseLink}&coupon=${store.context.coupon}`
  }

  return baseLink
})

const { copy, copied } = useClipboard()

const handleCopyCouponClick = () => {
  copy(couponCode.value)
}

useHead({
  title: t('price')
})
</script>

<style lang="stylus">
.page.page-price
  .fade-enter-active,
  .fade-leave-active
    transition: opacity 0.3s ease

  .fade-enter-from,
  .fade-leave-to
    opacity: 0

  .color-emphasis
    color: #1E96EB

  .discount-tag
    border-radius: 4px
    padding: 0px 4px
    line-height: 24px
    background: var(--brand-secondary, #fff)
    font-size: 12px
    font-weight: 500

  .section-hero
    padding-top: fluid-value(30, 40)
    padding-bottom: fluid-value(30, 40)

  .hero-title
    padding-bottom: fluid-value(16, 16)
    font-weight: 500
    font-size: fluid-value(32, 48)
    line-height: 119.444%
    letter-spacing: -0.04em
    max-width: fluid-value(450, 561)
    color: black

  .hero-desc
    white-space: pre-line
    font-size: fluid-value(16, 20)
    line-height: 135%
    max-width: fluid-value(450, 590)
    letter-spacing: -0.02em
    font-weight: 500

  .wip-tips
    margin-top: 24px
    margin-bottom: 24px
    font-size: 14px
    line-height: 20px

  .tab-bar
    --gap: 2px
    position relative
    border-radius: 10px
    background: #0000000A
    width: 76%
    max-width: 532px
    margin-bottom: fluid-value(24, 48)

    @media $mediaInXS
      // --gap: 2px

    .color-emphasis
      font-weight: 400

    &.active-monthly
      .tab-monthly
        color: #424149

    &.active-yearly
      .tab-yearly
        color: #424149
      .tab-active-bg
        transform: translateX(calc(100% - var(--gap) * 2))

    .tab-active-bg
      position absolute
      width: 50%
      top: var(--gap)
      bottom: var(--gap)
      left: var(--gap)
      background: white;
      border-radius: 8px;
      transition: 318ms
      box-shadow: 0px 0px 4px 0px rgba(66, 65, 73, 0.14);

    .tab
      position relative
      z-index: 2
      flex: 1
      font-weight: 600
      font-size: 12px
      display: flex
      align-items: center
      justify-content: center
      height: 32px
      cursor pointer
      color: #8E8D91
      transition color 318ms

  .section-prices
    margin-top: 0

  .prices-list
    max-width: 1300px
    width: 100%
    gap: 16px
    flex-wrap: wrap
    padding-bottom: 16px

  .price-card
    flex: 1
    min-width: 100px
    padding: 20px 16px;
    gap: 10px;
    background: white;
    border: 1px solid #E3E2E4;
    border-radius: 11px;
    display: flex
    flex-direction: column
    justify-content: flex-start
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.05)

    .el-button
      letter-spacing: -0.14px
      -webkit-font-smoothing: auto

  .planning-name
    font-weight: 500
    line-height: 1.5
    font-size: 16px
    color: var(--primary-deep)
    margin-bottom: 10px

  .price-row
    height: 38.5px
    margin-bottom: 10px

  .price-amount
    font-size: 32px
    font-weight: 700
    line-height: normal
    letter-spacing: -0.02em
    color: var(--primary-deep)

  .coming-soon-tips
    color: #8E8D91
    font-size: 16px
    font-weight: 500

  .per-time-tips
    color: #8E8D91

  @media (max-width: 1000px)
    .prices-list
      max-width: 100%

    .price-card
      min-width: 300px

  .price-card.type-pro
    --label-bg: 1
    position relative
    top: -1px
    border: 3px solid var(--brand-brand, #1E96EB)
    box-shadow: 0px 5px 10px 0px rgba(30, 150, 235, 0.20)

    .black-friday-label
      cursor pointer
      border-radius: 54px;
      border: 1.5px solid #000;
      background: #F8F8F7;
      transform: rotate(6deg);
      padding: 5px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.3px;
      position absolute
      z-index: 2
      top: -4px
      right: -15px
      color: #000
      transition: 218ms

      &:hover
        background: #F2F2F1;

      &:not(.has-copied)
        .nuxt-icon path
          stroke: #000

    .pro-label
      border-radius: 4px
      background: linear-gradient(289deg, #1E96EB 5.86%, #1ED2EB 103.86%);
      padding: 0px 7px
      font-weight: 500
      font-size: 16px
      line-height: 24px
      color: white

    &:before,
    &:after
      content: ''
      position absolute
      z-index: -1
      border-radius: 11px
      inset: 0
      opacity: 0
      transition: 318ms

    &:before
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
      opacity: var(--label-bg)

    &:after
      background: linear-gradient(180deg, rgba(240, 240, 240, 0.10) 0%, rgba(255, 255, 255, 0.80) 0.01%, rgba(255, 255, 255, 0.50) 100%);
      opacity: calc(1 - var(--label-bg))

    .early-access-label
      position absolute
      z-index 2
      overflow hidden
      padding: 2px 14px
      border-radius: 26px
      top: 16px
      right: 6px
      font-weight: 500

      &:before,
      &:after
        content: ''
        position absolute
        z-index: -1
        transition: 318ms
        inset: 0

      &:before
        background: linear-gradient(7deg, rgba(29, 228, 255, 0.71) 0%, rgba(37, 229, 255, 0.14) 100%)
        opacity: var(--label-bg)

      &:after
        background: linear-gradient(349deg, rgba(29, 228, 255, 0.71) 0%, rgba(37, 229, 255, 0.14) 100%)
        opacity: calc(1 - var(--label-bg))

    .contact-us-button

      &:hover
        background: lighten(#006BCC, 10%) !important

    &:hover
      --label-bg: 0

      &:after
        opacity: 1

      .contact-us-button
        background: #006BCC;
        color: white
        box-shadow: 0px 4px 29px 0px rgba(255, 255, 255, 0.15), 0px 4px 32px 0px rgba(0, 56, 255, 0.27)

      .card-header
        .icon-circles
          font-size: 330px
          top: -50%

  .card-header
    width: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    position: relative
    overflow: hidden
    margin-bottom: 10px

    a
      display: flex

      button
        width: 100%

    &.with-bg
      background: rgba(0, 0, 0, 0.02)
      border-radius: 5px
      padding: 15px

    .icon-circles
      position: absolute
      right: 0%
      top: -20%

    .icon-triangles
      font-size: 372px
      position: absolute
      z-index: -1
      right: 0%
      top: -40%

  .github-button
    width: 40px
    height: 40px
    font-size: 15px
    border: 1px solid rgba(255, 255, 255, 0.72)
    border-radius: 50%

  .card-title
    background: linear-gradient(180deg, #000 0%, #5f5f5f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 900;
    font-size: 48px;
    line-height: 1
    position: relative

    &.size-small
      font-size: 40px

    &.style-thin
      font-weight: 700;

  .type-free
    .card-title
      padding-bottom: 15px

    .icon-line
      position: absolute
      left: 3px
      font-size: 79px
      bottom: -17%

  .type-enterprise
    .icon-email
      font-size: 43px
      padding-top: 17px

  .planning-list
    display: flex
    flex-direction: column
    gap: 8px
    padding-bottom: 60px

    .item
      display: flex
      gap: 8px
      padding: 0
      font-size: 14px

      .nuxt-icon
        font-size: 16px

  .contact-us-button
    text-align: center
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    font-size: 15px;
    height: 36px;
    line-height: 36px
    margin-top: 12px

  .contact-us-button
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(2px);
    transition: 318ms

    &:hover
      background: rgba(0, 0, 0, 0.1);
</style>
