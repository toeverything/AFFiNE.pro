<template lang="pug">
.site-footer.flex.flex-col.items-center
  .container
    .footer-divider

  .container.is-fluid.fluid-row.nav-row
    .flex.justify-between.gap-4(
      class="lt-xs:flex-col"
    )
      .left-part.nav-part
        .flex.gap-130px.items-start.flex-wrap(
          class="lt-sm:gap-18px lt-md:flex-col"
        )
          affine-logo.icon-logo(
            class="lt-lg:important-hidden"
          )
          .nav-list
            .list-name {{ $t('tryItOnline') }}
            nuxt-link.nav-item.flex.items-center( :to="PATH.AFFINE_DOWNHILLS" target="_blank" v-mobile-intercept)
              | AFFiNE Alpha
            nuxt-link.nav-item( :to="PATH.AFFINE_PRE_ALPHA" target="_blank" v-mobile-intercept) AFFiNE Pre-Alpha
          .nav-list.need-underline
            .list-name {{ $t('openSource') }}
            nuxt-link.nav-item.flex( :to="PATH.AFFiNE_GITHUB" target="_blank" rel="nofollow" ) toeverything/AFFiNE
            nuxt-link.nav-item.flex( :to="PATH.AFFiNE_BLOCK_SUITE" target="_blank" rel="nofollow") toeverything/BlockSuite
            nuxt-link.nav-item.flex( :to="PATH.AFFiNE_OCTO_BASE" target="_blank" rel="nofollow") toeverything/OctoBase
            nuxt-link.nav-item( :to="PATH.AFFiNE_HOME_PAGE" target="_blank" rel="nofollow") toeverything/AFFiNE.pro

      .right-part.theme-switcher-part
        client-only( v-if="CONFIG.ENABLE_THEME_SWITCHER" )
          .nav-list
            .list-name( class="lt-sm:hidden" ) {{ $t('websiteTheme') }}
            theme-switcher
        .theme-switcher-placeholder( v-else )
          | To Shape, not to adapt
  .container.is-fluid.fluid-row.copyright-row
    .flex.justify-between(
      class="lt-sm:flex-col lt-sm:items-center"
    )
      | Copyright ©{{ currentYear }} Toeverything
      .links.flex.items-center
        nuxt-link( to="/terms" ) {{ $t('terms') }}
        .link-divider
        nuxt-link( to="/privacy" ) {{ $t('privacy') }}

</template>

<script setup lang="ts">
import { PATH, CONFIG } from '~/utils/constants'

const currentYear = new Date().getFullYear()
</script>

<style lang="stylus">
.site-footer
  --divider-color: rgba(215, 215, 215, 1)
  --copyright-link-color: var(--primary)
  --logo-color: var(--brand)
  --list-name-color: var(--primary-gray)
  --list-item-color: var(--primary)
  position relative
  padding: 80px 0

  @media $mediaInMobile
    padding: 36px 0

  a
    &:hover
      opacity: 0.8

  .fluid-row
    max-width: 1712px !important
    padding: 0 fluid-value(18, 100)

  .nav-list
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    &.need-underline
      .nav-item
        text-decoration: underline

    .list-name
      color: var(--list-name-color)
      margin-bottom: 8px

    .nav-item
      margin-bottom: 16px
      color: var(--list-item-color)

  .nav-row
    margin-top: 89px

    @media $mediaInMobile
      margin-top: 32px

    .icon-logo
      font-size: 71px
      color: var(--logo-color)
      margin-right: 20px

  .copyright-row
    margin-top: 130px
    font-weight: 500
    font-size: 18px
    line-height: 22px

    @media $mediaInMobile
      font-size: 10px;
      line-height: 12px;
      width: 300px
      position absolute
      right: -16px
      bottom: 40px

    @media $mediaInXS
      margin-top: 92px
      position static
      margin-bottom: 40px

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
    background: var(--divider-color)

  /html.dark &
    --divider-color: rgba(61, 61, 61, 1)
    --copyright-link-color: #A9A9A9
    --logo-color: #fff
    --list-name-color: #555555
    --list-item-color: var(--primary-gray)

</style>
