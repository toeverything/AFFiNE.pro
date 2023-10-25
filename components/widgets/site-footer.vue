<template lang="pug">
.site-footer.flex.flex-col.items-center
  .container
    .footer-divider

  .container.is-fluid.fluid-row
    .nav-row.flex.justify-between.gap-4
      .left-part.nav-part
        .flex.items-start.flex-wrap
          .icons-part
            nuxt-link.mr-5.inline-flex(
              to="/"
            )
              affine-logo.icon-logo(
              )
            .sns-icons-row.flex
              nuxt-link(
                v-for="sns in COMMUNITY_SNS_LIST"
                :class="[`link-${sns.iconName}`]"
                :to="sns.link"
                rel="nofollow"
                target="_blank"
              )
                nuxt-icon.sns-icon(
                  :name="sns.iconName"
                )

      .nav-list-wrapper.flex.justify-space-between
        .nav-list
          .list-name {{ $t('tryItOnline') }}
          nuxt-link.nav-item.flex.items-center( :to="PATH.AFFINE_DOWNHILLS" target="_blank" v-mobile-intercept)
            | AFFiNE Alpha
          nuxt-link.nav-item( :to="PATH.AFFINE_PRE_ALPHA" target="_blank" v-mobile-intercept) AFFiNE Pre-Alpha
        .nav-list
          .list-name {{ $t('client') }}
          nuxt-link.nav-item.flex.items-center( to="/download")
            | {{ $t('downloadApp') }}
          nuxt-link.nav-item( to="/what-is-new") {{ $t('WhatIsNew') }}
        .nav-list
          .list-name {{ $t('resources') }}
          nuxt-link.nav-item.flex( to="/pricing" ) {{ $t('price') }}
          nuxt-link.nav-item.flex( to="/abous-us" ) {{ $t('aboutUs') }}
          nuxt-link.nav-item.flex( to="/terms" ) {{ $t('terms') }}
          nuxt-link.nav-item.flex( to="/privacy" ) {{ $t('privacy') }}
          nuxt-link.nav-item.flex( :to="PATH.AFFiNE_COMMUNITY" target="_blank" rel="nofollow") {{ $t('community') }}

        .nav-list
          .list-name {{ $t('openSource') }}
          nuxt-link.nav-item.flex( :to="PATH.AFFiNE_GITHUB" target="_blank" rel="nofollow" ) toeverything/AFFiNE
          nuxt-link.nav-item.flex( :to="PATH.AFFiNE_BLOCK_SUITE" target="_blank" rel="nofollow") toeverything/BlockSuite
          nuxt-link.nav-item.flex( :to="PATH.AFFiNE_OCTO_BASE" target="_blank" rel="nofollow") toeverything/OctoBase
          nuxt-link.nav-item( :to="PATH.AFFiNE_HOME_PAGE" target="_blank" rel="nofollow") toeverything/AFFiNE.pro

  .container.is-fluid.fluid-row.copyright-row
    .flex.justify-between(
      class="lt-sm:flex-col"
    )
      .copy-text.flex
        .gray-text ©{{ currentYear }} Toeverything
        .divider.mx-2 ·
        .info-slogan To Shape, Not to Adapt.

</template>

<script setup lang="ts">
import { PATH, CONFIG, COMMUNITY_SNS_LIST } from '~/utils/constants'

const currentYear = new Date().getFullYear()
</script>

<style lang="stylus">
.site-footer
  --divider-color: rgba(215, 215, 215, 1)
  --copyright-link-color: var(--primary)
  --logo-color: var(--brand)
  --list-name-color: var(--primary-deep)
  --list-item-color: #8E8D91
  position relative
  padding: fluid-value(60, 80) 0 fluid-value(60, 70)
  background: var(--bg)

  @media $mediaInMobile
    padding: 36px 0

  .gray-text
    color: #8E8D91

  a
    &:hover
      opacity: 0.8

  .nav-row
    @media (max-width: 1023px)
      flex-direction: column

  .fluid-row
    max-width: 1440px !important
    padding: 0 fluid-value(32, 180, 1024, 1440)

    @media $mediaInMobile
      padding: 0 20px

  .nav-list-wrapper
    column-gap: fluid-value(32, 100)
    flex-wrap: wrap

    @media (max-width: 1023px)
      row-gap: 30px
      column-gap: 0px

      > *
        flex: 1 0 s('calc(50% - 48px)')
        min-width: 150px

  .nav-list
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    &.need-underline
      .nav-item
        text-decoration: underline

    .list-name
      color: var(--list-name-color)
      margin-bottom: 10px
      line-height: 20px
      font-weight: 500
      letter-spacing: -0.28px;

    .nav-item
      margin-bottom: 12px
      line-height: (20/14)
      color: var(--list-item-color)

  .sns-icons-row
    margin-top: 32px
    margin-bottom: 12px
    row-gap: 12px
    column-gap: 16px
    flex-wrap: wrap

    @media (min-width: 1024px)
      max-width: 110px

    @media $mediaInMobile
      column-gap: 20px

    .sns-icon
      font-size: 24px
      color: rgba(119, 117, 125, 0.60)

    .link-twitter:hover
      .sns-icon
        color: rgba(29, 161, 242, 1)

    .link-github:hover
      .sns-icon
        color: rgba(0, 0, 0, 1)

    .link-telegram:hover
      .sns-icon
        color: rgba(42, 171, 238, 1)

    .link-discord:hover
      .sns-icon
        color: rgba(88, 101, 242, 1)

    .link-youtube:hover
      .sns-icon
        color: rgba(255, 0, 0, 1)

    .link-reddit:hover
      .sns-icon
        color: rgba(255, 69, 0, 1)

  .icon-logo
    font-size: 48px
    color: var(--logo-color)

  .copyright-row
    margin-top: 32px
    font-weight: 400
    font-size: 14px
    line-height: normal

    @media $mediaInMobile
      margin-top: 26px

    .copy-text
      letter-spacing: -0.28px

    .info-slogan
      font-weight: 500

    .link-divider
      height: 19px
      width: 2px
      background-color: var(--copyright-link-color)
      margin: 0 33px

      @media $mediaInMobile
        width: 1px
        height: 19px

    .links
      font-style: italic
      font-weight: 400
      font-size: 16px
      line-height: 19px
      color: var(--copyright-link-color)

      @media $mediaInMobile
        font-size: 11px;
        line-height: 13px;
        margin-top: 17px

      a:hover
        color: var(--primary)

  .theme-switcher-part
    @media $mediaInXS
      .nav-list {
        @apply flex justify-center mt-95px
      }

    .theme-switcher-placeholder
      font-weight: 800;
      font-size: 16px;

      @media $mediaInXS
        margin-top: 32px

  .footer-divider
    height: 1px
    width: 100%
    margin: 0 auto
    max-width: $containerMaxWidth

  /html.dark &
    --divider-color: rgba(61, 61, 61, 1)
    --copyright-link-color: #A9A9A9
    --logo-color: #fff
    --list-name-color: #555555
    --list-item-color: var(--primary-gray)

</style>
