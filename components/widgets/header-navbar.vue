<template lang="pug">
.header-navbar(
  :style="{ '--affix-progress': affixProgress }"
)
  .navbar-placeholder
  .navbar-fluid-container.flex.items-center(
    :class="{ 'is-invisible': y > 100 }"
  )
    .flex.flex-1.justify-between
      nuxt-link.handler( to="/" )
        nuxt-icon.navbar-logo( name="logo" )

      .right-part.flex.items-center.gap-52px
        nuxt-link.handler( :to="PATH.AFFiNE_COMMUNITY" target="_blank" )
          client-only
            el-button.try-button.out-try-button(
              size="large"
              :type="isDark ? 'default' : 'primary'"
            ) {{ $t('tryItOnline') }}

        nuxt-link.handler( :to="PATH.AFFiNE_GITHUB" target="_blank" )
          .out-github-button.flex.items-center.justify-center
            nuxt-icon.text-30px( name="github" )

  .navbar-fixed.flex.items-center
    .menu-list.flex.items-center.gap-13px
      .nav-item
        scroll-link( to="/" ) {{ $t('home') }}
      .nav-item
        scroll-link( to="/about-us" ) {{ $t('aboutUs') }}
      .nav-item
        nuxt-link( :to="PATH.AFFiNE_COMMUNITY" target="_blank" ) {{ $t('community') }}
      .nav-item
        scroll-link( to="/blog" ) {{ $t('blog') }}
      el-dropdown(
        trigger="click" size="large"
        popper-class="lang-switcher-dropdown"
      )
        .nav-item.cursor-pointer
          .current-lang.flex.items-center(
            ref="ignoreElRef"
            @click="() => isOpenLangList = !isOpenLangList"
          )
            | {{ localeProperties?.name  }}
            nuxt-icon.ml-3px( name="arrow-down-s" )
        template( #dropdown )
          el-dropdown-menu
            el-dropdown-item.flex.justify-between(
              v-for="item in locales"
              @click="locale = item.code"
            )
              | {{ item.name }}
    .right-part.flex.items-center.gap-25px
      nuxt-link( :to="PATH.AFFiNE_COMMUNITY" target="_blank" )
        client-only
          el-button.try-button(
            :type="isDark ? 'default' : 'primary'"
          ) {{ $t('tryItOnline') }}

      nuxt-link( :to="PATH.AFFiNE_GITHUB" target="_blank" )
        .github-button.flex.items-center.justify-center
          nuxt-icon.text-30px( name="github" )
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'
import { useDark } from '@vueuse/core'

const { locale, locales, localeProperties, setLocaleCookie } = useI18n()

const props = defineProps<{
  y: number
}>()

// @FIXME: Get this value after mounted
const isDark = useDark()

const affixProgress = computed(() => {
  return Math.min(1, props.y / 50)
})
</script>

<style lang="stylus">
.header-navbar
  --navbar-height: 114px
  --navbar-border-color: var(--primary-gray)
  --navbar-bg-color:  rgba(255, 255, 255, 0.7)
  --navbar-active-bg-color: #E7E7E7
  --github-border-color: #A4A4A4

  .navbar-logo
    color: var(--logo-color)
    font-size: 48px

  .try-button
    padding-left: 28px
    padding-right: 28px
    border-radius: 70px
    min-width: 177px

  .github-button
    &:hover
      opacity: 0.8

  .navbar-placeholder
    height: var(--navbar-height)

  .navbar-fluid-container
    position fixed
    z-index: $zIndexHeader
    width: 100%
    top: 0
    padding: 0 50px
    padding-right: 62.5px
    height: var(--navbar-height)
    opacity: calc(1 - var(--affix-progress) * 2)
    pointer-events: none

    &:not(.is-invisible) .handler
      pointer-events: initial

    .out-try-button
      border: 1px solid rgba(255, 255, 255, 0.72)

    .out-github-button
      width: 50px
      height: 50px
      border-radius: 50%
      border: 1px solid #A4A4A4
      transition: 218ms

      &:hover
        background-color: $primary10

  .navbar-fixed
    position fixed
    z-index: ($zIndexHeader + 1)
    top: 35px
    left: 50%
    height: 44px
    transform: translateX(-50%)
    border: 1px solid var(--navbar-border-color)
    border-radius: 70px
    padding-left: 26px
    overflow: hidden
    background: var(--navbar-bg-color)
    backdrop-filter: blur(14px)

    .nav-item > a,
    .el-dropdown
      display: block
      padding: 0 13.5px
      border-radius: 52px;

      &.is-active
        height: 38px
        line-height: 38px
        background: var(--navbar-active-bg-color);

    .right-part
      overflow: hidden
      // @TODO: Pass dynamic container width
      width: calc(330px * var(--affix-progress))
      opacity: calc(var(--affix-progress))
      padding-left: calc(78.5px * var(--affix-progress))
      padding-right: 20px

      > *
        flex-shrink: 0

    .try-button
      height: 35px
      font-weight: 800
      font-size: 20px

    .menu-list
      .nav-item
        font-weight: 800;
        font-size: 20px;
        line-height: 24px;
        white-space: nowrap;

        &:hover
          opacity: 0.8

  /html.dark &
    --github-border-color: #A4A4A4
    --navbar-border-color: #717171
    --navbar-bg-color: rgba(0, 0, 0, 0.7)
    --navbar-active-bg-color: #383838

.lang-switcher-dropdown
  margin-top: 12px
  width: 120px
  font-weight: 800

  .el-dropdown-menu__item
    font-size: 16px
    height: 40px

    &:hover
      background-color: var(--el-color-primary-light-9)

  .el-popper__arrow
    display: none
</style>
