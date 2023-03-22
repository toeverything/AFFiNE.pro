<template lang="pug">
.overview-build-with.flex.flex-col.items-center
  .content-row.flex.items-center.justify-center.mb-5(
    class="lt-sm:flex-col"
  )
    .text-build-with {{ $t('overviewPage.buildWith') }}
    nuxt-link.logo-wrapper( :to="PATH.AFFiNE_BLOCK_SUITE" target="_blank")
      nuxt-icon.icon-blockSuite.icon-gradient( name="blockSuite" filled )
      nuxt-icon.icon-blockSuite( name="blockSuite" )
    .text-and {{ $t('overviewPage.and') }}
    nuxt-link.logo-wrapper( :to="PATH.AFFiNE_OCTO_BASE" target="_blank")
      nuxt-icon.icon-octobase.icon-gradient( name="octobase" filled)
      nuxt-icon.icon-octobase( name="octobase" )
  .decoration-row.flex.justify-center
    nuxt-icon( name="scribble-line" )
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'
</script>

<style lang="stylus">
.overview-build-with
  color: var(--primary-gray)

  .content-row
    font-weight: 800;
    font-size: fluid-value(18, 24);
    line-height: (29/24)
    column-gap: 27px
    row-gap: 10px

    .nuxt-icon
      color: var(--primary)

  .logo-wrapper
    position relative
    overflow: hidden

    &:before
      content: ''
      position absolute
      z-index: 2
      width: 37px
      height: 79px
      top: -3.5px
      left: -80px
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
      background-blend-mode: lighten;
      transform: rotate(-30deg);
      transition: 518ms

    .icon-gradient
      position absolute
      z-index 1
      inset: 0
      opacity 0
      transition: 518ms

      path
        fill: url(#brand-gradient) !important

    &:hover
      &:before
        left: 120%

      .icon-gradient
        opacity : 1

  .icon-blockSuite
    svg
      width: 189px
      height: 36px

  .icon-octobase
    svg
      width: 157px
      height: 36px

  .decoration-row
    .nuxt-icon
      color: #77757D

      /html.dark &
        color: #fff

      svg
        width: 475px
        height: 40px

        @media $mediaInXS
          width: 127.54px;
          height: 12.59px;
</style>
