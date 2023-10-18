<template lang="pug">
.page.page-price
  .section.section-hero
    .container.flex.flex-col
      .hero-title {{ $t('pricePage.title') }}
      .hero-desc {{ $t('pricePage.desc') }}
  .section.section-prices
    .container.flex.flex-col.items-center
      .prices-list.flex
        .price-card.type-community
          .card-header
            nuxt-link( :to="PATH.AFFiNE_GITHUB" target="_blank" rel="nofollow")
              .github-button.flex.items-center.justify-center
                nuxt-icon( name="github" ).text-30px
            .card-title.size-small.style-thin.mt-5 {{ $t('pricePage.community') }}
            nuxt-icon.icon-line( name="price-community-line" )
          .planning-list
            .item {{ $t('pricePage.communityItemA') }}
            .item {{ $t('pricePage.communityItemB') }}
            .item {{ $t('pricePage.communityItemC') }}

        .price-card.type-pro
          .card-header.with-bg
            .card-icon
              nuxt-icon.icon-circles( name="price-pro" filled )
            .card-title {{ $t('pricePage.pro') }}
            .early-access-label {{ $t('earlyAccess') }}
          .planning-list
            .item {{ $t('pricePage.proItemA') }}
            .item {{ $t('pricePage.proItemB') }}
            .item {{ $t('pricePage.proItemC') }}
          nuxt-link.contact-us-button( :to="PATH.PRICING_PRO_EARLY_ACCESS" target="_blank" ) {{ $t('getEarlyAccess')  }}

        .price-card.type-team
          .card-header.with-bg
            .card-icon
              nuxt-icon.icon-triangles( name="price-team" filled )
            .card-title {{ $t('pricePage.team') }}
          .planning-list
            .item {{ $t('pricePage.teamItemA') }}
            .item {{ $t('pricePage.teamItemB') }}
            .item {{ $t('pricePage.teamItemC') }}
          nuxt-link.contact-us-button( :to="PATH.PRICING_CONTACT_FORM" target="_blank" ) {{ $t('contactUsNow')  }}

        .price-card.type-enterprise
          .card-header.with-bg
            nuxt-icon.icon-email( name="mail-alt" filled )
            .card-title.size-small {{ $t('pricePage.enterprise') }}
          .planning-list
            .item {{ $t('pricePage.enterpriseItemA') }}
            .item {{ $t('pricePage.enterpriseItemB') }}
          nuxt-link.contact-us-button( :to="PATH.PRICING_CONTACT_FORM" target="_blank" ) {{ $t('contactUsNow')  }}

      .wip-tips {{ $t('pricePage.wipTips') }}
</template>

<script lang="ts" setup>
import { PATH, INFO } from '~/utils/constants'

const { t } = useI18n()

useHead({
  title: t('price')
})
</script>

<style lang="stylus">
.page.page-price
  .section-hero
    padding-top: fluid-value(42, 143)
    padding-bottom: fluid-value(26, 124)
    padding-left: fluid-value(44, 100)
    padding-right: fluid-value(44, 100)

    .container
      --width: 780px

  .hero-title
    padding-bottom: fluid-value(28, 29)
    font-weight: 800
    font-size: fluid-value(20, 24)
    line-height: 24px

  .hero-desc
    white-space: pre-line
    font-size: fluid-value(15, 16)
    line-height: 24px

  .wip-tips
    margin-top: fluid-value(32, 75.7)
    margin-left: -8px
    margin-right: -8px
    margin-bottom: fluid-value(12, 75.7)
    font-size: 16px
    line-height: 24px

  .section-prices
    padding-left: fluid-value(20, 60)
    padding-right: fluid-value(20, 60)

  .prices-list
    max-width: 1300px
    width: 100%
    gap: 32px
    flex-wrap: wrap
    align-items: flex-start

    @media (max-width: 1400px)
      max-width: 780px

  .price-card
    flex: 1
    min-width: 290px
    padding: 32px 20px;
    gap: 10px;
    background: white;
    border: 1px solid #E3E2E4;
    border-radius: 11px;
    display: flex
    flex-direction: column
    justify-content: flex-start
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.05)

  .price-card.type-pro
    --label-bg: 1
    position relative
    background: none

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

    .card-header
      background: rgba(0, 133, 255, 0.08)

      .icon-circles
        font-size: 230px
        transition: 318ms

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
    aspect-ratio: 1/1
    width: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    max-height: 168px
    position: relative
    margin-bottom: 20px
    overflow: hidden

    a
      display: inline-flex

      &:hover
        opacity 0.9

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

  .type-community
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

    .item
      padding: 10px

  .coming-soon-tips,
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
