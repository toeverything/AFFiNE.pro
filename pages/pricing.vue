<template lang="pug">
.page.page-price
  .section.section-hero
    .limit-container.flex.flex-col
      h1.ma-0.hero-title {{ $t('pricePage.title') }}
      .hero-desc {{ $t('pricePage.desc') }}

  .section.mb-70px
    .limit-container.flex.flex-col
      .pricing-header.flex.items-center.justify-space-between.gap-4
        .desktop-version.flex-1
          .flex.flex-1.items-center.gap-4
            .tab-bar.flex( :class="[`active-${currentPricingType}`]" )
              .tab-active-bg
              .tab.tab-cloud( @click="() => currentPricingType = 'cloud'" )
                span Cloud
              //- .tab.tab-selfhost( @click="() => currentPricingType = 'selfhost'" )
              .tab.tab-selfhost.coming-soon
                span.flex
                  | Self Hosted(Coming soon)
            .host-tips We host, no technical setup required.

        .mobile-version.flex-1
          el-dropdown(
            trigger="click"
            popper-class="pricing-type-dropdown"
            placement="bottom-start"
          )
            .select-button.flex.items-center.gap-6px
              | {{ currentPricingType === 'cloud' ? 'AFFINE.Pro' : 'Self Hosted' }}
              nuxt-icon.text-size-24px( name="ArrowDownSmall" filled)
            template( #dropdown )
              el-dropdown-menu
                el-dropdown-item( @click="currentPricingType = 'cloud'" )
                  | AFFiNE.Pro
                  .info-desc We host, no technical setup required.
                .divider
                el-dropdown-item
                  | Self Hosted (Coming soon)
                  .info-desc You host, control, and are responsible for your data.

        .right-part
          .flex.gap-3.items-center
            .info-tips
              | Billed Yearly&nbsp;
              span.highlight Saving 15%
            el-switch(
              v-model="isYearly"
              size="large"
            )

      template( v-if="currentPricingType === 'selfhost'" )
        .prices-list.flex.selfhost-list
          .price-card.type-pro
            .black-friday-label(
              v-if="CONFIG.ENABLE_BLACK_FRIDAY"
              @click="handleCopyCouponClick"
              :class="{ 'has-copied': copied }"
            )
              | Get Coupon: {{ couponCode }}
              nuxt-icon.text-size-18px( :name="copied ? 'tick' : 'copy'" filled)

            .card-header
              .planning-name Pro
              .planning-desc For family and small teams.

              .price-row.flex.items-end.gap-2
                .price-amount
                  span.number {{ isYearly ? '$6.75' : '$7.99' }}
                  | &nbsp;{{ $t('pricePage.perMonth') }}

            .planning-list
              .list-section Include in Community:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Everything in AFFiNE FOSS & Basic
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 100 GB of Cloud Storage
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 100 MB of Maximum file size
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Up to 10 members per Workspace
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 30-days Cloud Time Machine file version history
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Add comments on Doc and Edgeless
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Community Support
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Real-time Syncing & Collaboration for more people

            .card-footer
              nuxt-link( :href="proActionLink" target="_blank" rel="nofollow" )
                el-button(
                  type="primary"
                  size="action"
                ) Upgrade
          .price-card.type-enterprise
            .card-header
              .planning-name Teams / Enterprise
              .planning-desc Best for scalable teams.
              .price-row.flex.items-end.gap-2
                .price-amount Contact Sales

            .planning-list
              .list-section Both in Teams & Enterprise:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Everything in AFFiNE Pro
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Advanced Permission control, Page history and Review mode
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Pay for seats, fits all team size
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Email & Slack Support
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Offer K8s Support
              .list-section Enterprise only:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body SSO Authorization
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Solutions & Best Practices for Dedicated needs
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Embed-able & Integrations with IT support
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body White label for secondary sales.

            .card-footer
              nuxt-link( :href="PATH.PRICING_CONTACT_FORM_ENTERPRISE" target="_blank" rel="nofollow" )
                el-button(
                  type="primary"
                  size="action"
                ) Tell us Your Offer
      template( v-if="currentPricingType === 'cloud'" )
        .prices-list.flex
          .price-card.type-free
            .card-header
              .planning-name FOSS + Basic
              .planning-desc Open-Source under MIT license.
              .price-row.flex.items-end.gap-2
                .price-amount Free forever
            .planning-list
              .list-section Include in FOSS:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Unlimited Local Workspaces
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Unlimited use and Customization
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Unlimited Doc and Edgeless editing
              .list-section Include in Basic:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 10 GB of Cloud Storage
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 10 MB of Maximum file size
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Up to 3 members per Workspace
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 7-days Cloud Time Machine file version history
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Up to 3 login devices
            .card-footer
              track-link( :href="PATH.AFFINE_WEB_APP" action="Get started" :params="{ resolve: 'Get Started', placement: currentTab === 'yearly' ? 'pricing_page_yearly' : 'pricing_page_monthly' }"  target="_blank")
                el-button(
                  type="primary"
                  size="action"
                ) {{ $t('pricePage.freeAction') }}
          .price-card.type-pro
            .black-friday-label(
              v-if="CONFIG.ENABLE_BLACK_FRIDAY"
              @click="handleCopyCouponClick"
              :class="{ 'has-copied': copied }"
            )
              | Get Coupon: {{ couponCode }}
              nuxt-icon.text-size-18px( :name="copied ? 'tick' : 'copy'" filled)

            .card-header
              .planning-name Pro
              .planning-desc For family and small teams.

              .price-row.flex.items-end.gap-2
                .price-amount
                  span.number {{ isYearly ? '$6.75' : '$7.99' }}
                  | &nbsp;{{ $t('pricePage.perMonth') }}

            .planning-list
              .list-section Include in Pro:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Everything in AFFiNE FOSS & Basic
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 100 GB of Cloud Storage
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 100 MB of Maximum file size
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Up to 10 members per Workspace
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body 30-days Cloud Time Machine file version history
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Add comments on Doc and Edgeless
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Community Support
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Real-time Syncing & Collaboration for more people

            .card-footer
              nuxt-link( :href="proActionLink" target="_blank" rel="nofollow" )
                el-button(
                  type="primary"
                  size="action"
                ) Upgrade

          .price-card.type-enterprise
            .card-header
              .planning-name Teams / Enterprise
              .planning-desc Best for scalable teams.
              .price-row.flex.items-end.gap-2
                .price-amount Contact Sales

            .planning-list
              .list-section Both in Teams & Enterprise:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Everything in AFFiNE Pro
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Advanced Permission control, Page history and Review mode
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Pay for seats, fits all team size
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Email & Slack Support
              .list-section Enterprise only:
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body SSO Authorization
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Solutions & Best Practices for Dedicated needs
              .item
                .item-icon
                  nuxt-icon( name="Done" filled)
                .item-body Embed-able & Integrations with IT support

            .card-footer
              nuxt-link( :href="PATH.PRICING_CONTACT_FORM_ENTERPRISE" target="_blank" rel="nofollow" )
                el-button(
                  type="primary"
                  size="action"
                ) Tell us Your Offer

  pricing-believer-tier

  .section.section-prices.mb-60px
    .limit-container.flex.flex-col
      h1.ma-0.mb-6.hero-title Achieve more in less time with AFFiNE AI
      pricing-ai-section( isInPricing )

  .section.section-bento.mb-4
    .limit-container
      h1.ma-0.mb-6.hero-title Why Not Upgrade to AFFiNE Cloud?
      pricing-bento
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { PATH, INFO, CONFIG } from '~/utils/constants'

const { t } = useI18n()

const store = useStore()
const currentPricingType = ref('cloud')
// const currentPricingType = ref('selfhost')

const isYearly = ref(false)
const currentTab = ref('yearly')
const couponCode = ref('BF23')

const isMonthly = computed(() => !isYearly.value)

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

  .desktop-version
    display: block

    @media (max-width: 960px)
      display: none

  .mobile-version
    display: none

    .select-button
      background: #FFFFFF;
      border: 1px solid #E3E2E4;
      box-shadow: 0px 0px 4px rgba(66, 65, 73, 0.14);
      border-radius: 8px;
      padding: 6px 8px;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      color: #121212;
      cursor pointer

    @media (max-width: 960px)
      display: block

  .pricing-header
    width: 100%
    margin-bottom: fluid-value(16, 16)

  .host-tips,
  .info-tips
    font-size: 14px;
    line-height: 22px;
    color: #8E8D91;
    @media (max-width: 960px)
      font-size: 12px;
      line-height: 16px;

    .highlight
      font-weight: 600;
      color: #1E96EB;

      @media (max-width: 960px)
        display: block

  .el-switch
    --el-switch-off-color: rgba(119, 117, 125, 1)

  .tab-bar
    --gap: 2px
    position relative
    border-radius: 10px
    background: #0000000A
    width: 76%
    max-width: 300px

    .tab-cloud
      flex: 120

    .tab-selfhost
      flex: 180

    .coming-soon
      cursor: not-allowed !important

    .color-emphasis
      font-weight: 400


    &.active-cloud
      .tab-active-bg
        width: 120px

      .tab-cloud
        color: #424149

    &.active-selfhost
      .tab-selfhost
        color: #424149
      .tab-active-bg
        width: 180px
        transform: translateX(118px)

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

  .selfhost-list
    max-width: 700px
    margin: 0 auto

  .price-card
    flex: 1
    min-width: 100px
    background: white;
    border: 1px solid rgba(227, 226, 228, 1);
    border-radius: 16px;
    display: flex
    flex-direction: column
    justify-content: flex-start
    min-height: fluid-value(300, 650)
    // box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.05)

    .el-button
      letter-spacing: -0.14px
      -webkit-font-smoothing: auto

  .planning-name
    font-weight: 600
    line-height: 1.5
    font-size: 16px
    color: var(--primary-deep)

  .planning-desc
    font-size: 15px;
    line-height: 24px;
    color: #8E8D91;

  .price-row
    margin-top: 8px

  .price-amount
    font-size: 26px
    font-weight: 600
    line-height: 36px
    color: #121212

    .number
      display: inline-block
      min-width: 73px

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
    padding: 20px 16px;
    background: #FBFBFC;
    border-bottom: 1px solid #E3E2E4;
    border-radius: 16px 16px 0px 0px;

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

  .card-footer
    padding: 12px 16px

    .el-button
      width: 100%
      border-radius: 8px

  .planning-list
    display: flex
    flex-direction: column
    flex: 1
    gap: 8px
    padding: 12px 16px
    padding-bottom: 30px

    .list-section
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #8E8D91;

    .item
      min-height: 24px
      display: flex
      align-items: center
      gap: 8px
      padding: 0
      font-size: 12px
      line-height: 20px

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

.pricing-type-dropdown
  width: 284px

  .el-dropdown-menu__item
    flex-direction: column
    align-items: flex-start
    white-space: pre-line;
    font-weight: 400
    font-size: 14px;
    color: #121212

    .info-desc
      line-height: 22px;
      color: #8E8D91;
</style>
