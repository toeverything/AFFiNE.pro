<template lang="pug">
.header-navbar(
  :class="{ 'has-ext': y > 80 }"
)
  .navbar-placeholder
  .navbar-fluid-container.flex.items-center(
    :class="{ 'is-invisible': y > 80 }"
  )
    .flex.flex-1.justify-between.items-center
      nuxt-link.handler.logo-handler( to="/" )
        affine-logo.navbar-logo

      .right-part.flex.items-center.gap-52px
        nuxt-link.handler( to="/download" )
          el-button.try-button.out-try-button(
            :class="[`dark-${isDark}`]"
            size="large"
            :type="isDark ? 'default' : 'primary'"
          )
            span {{ $t('download') }}

        nuxt-link.handler( :to="PATH.AFFiNE_GITHUB" target="_blank" )
          .out-github-button.flex.items-center.justify-center
            github-circle.text-30px

  .navbar-fixed.flex.items-center
    .menu-list.flex.items-center.gap-16px
      client-only
        .active-tab(
          ref="activeTab"
          :style="activeTabStyle"
        )
      .nav-item
        scroll-link( to="/" ) {{ $t('home') }}
      .nav-item
        nuxt-link( :to="PATH.AFFiNE_COMMUNITY" target="_blank" ) {{ $t('community') }}
      .nav-item
        scroll-link( to="/about-us" ) {{ $t('aboutUs') }}
      .nav-item
        scroll-link( to="/blog" ) {{ $t('blog') }}
      .nav-item
        scroll-link( to="/pricing" ) {{ $t('price') }}
      el-dropdown(
        v-if="CONFIG.ENABLE_LANG_SWITCHER"
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

    .right-part
      .flex.items-center.gap-16px
        nuxt-link( to="/download" )
          el-button.try-button(
            v-if="isMounted"
            :type="isDark ? 'default' : 'primary'"
          ) {{ $t('download') }}

        nuxt-link( :to="PATH.AFFiNE_GITHUB" target="_blank" rel="nofollow")
          .github-button.flex.items-center.justify-center
            github-circle.text-30px
</template>

<script setup lang="ts">
import GithubCircle from '~icons/mdi/github-circle'

import { PATH, CONFIG } from '~/utils/constants'
import { useDark } from '@vueuse/core'

const { locale, locales, localeProperties, setLocaleCookie } = useI18n()

const props = defineProps<{
  y: number
}>()

const route = useRoute()
// @FIXME: Get this value after mounted
const isDark = useDark({ initialValue: 'dark' })

const isMounted = ref(false)
const activeTab = ref(null)
const activeTabStyle = reactive({
  opacity: 0,
  width: '0px',
  transform: '',
  transition: '0s'
})
const affixProgress = computed(() => {
  return Math.min(1, props.y / 50)
})

const refreshActiveTab = async (needTransition = false) => {
  await nextTick()
  const $target = document.querySelector('.nav-item a.is-active')
  if (!$target) return
  const width = $target.clientWidth
  let left = $target.parentElement?.offsetLeft || 0
  activeTabStyle.opacity = 1
  activeTabStyle.width = `${width}px`
  activeTabStyle.transform = `translateX(${left}px)`
  activeTabStyle.transition = needTransition ? '218ms' : '0s'
}

onMounted(() => {
  refreshActiveTab()
  isMounted.value = true
})

watch(() => route.path, () => refreshActiveTab(true))
</script>

<style lang="stylus">
$mediaCompactHeader = '(max-width: 1280px)'

.header-navbar
  --navbar-height: 72px
  --navbar-border-color: var(--primary-gray)
  --navbar-bg-color:  rgba(255, 255, 255, 0.7)
  --navbar-active-bg-color: #E7E7E7
  --github-border-color: #A4A4A4
  --affix-progress: 0
  position: relative
  max-width: 1920px
  margin: 0 auto

  &.has-ext
    --affix-progress: 1

    .right-part
      // transition-delay: 0.2s

      .flex
        transition-delay: 0s

  .logo-handler
    height: 28px

  .navbar-logo
    color: var(--logo-color)
    font-size: 28px

  .try-button
    padding-left: 28px
    padding-right: 28px
    border-radius: 70px
    min-width: 177px

    .text-long
      @media $mediaCompactHeader
        display: none

    .text-short
      display: none
      @media $mediaCompactHeader
        display: block

  .github-button
    &:hover
      opacity: 0.8

  .navbar-placeholder
    height: var(--navbar-height)
    pointer-events: none

  .navbar-fluid-container
    position absolute
    z-index: $zIndexHeader
    width: 100%
    top: 0
    padding: 0 50px
    padding-right: 62.5px
    height: var(--navbar-height)
    // opacity: calc(1 - var(--affix-progress) * 2)
    pointer-events: none

    &:not(.is-invisible) .handler
      pointer-events: initial

    .out-try-button
      height: 40px
      font-size: 15px
      border: 1px solid rgba(0, 0, 0, 0.72)

      @media $mediaCompactHeader
        min-width: 84px

      &:hover
        border-color: rgba(0, 0, 0, 0.72) !important

    .out-github-button
      width: 40px
      height: 40px
      border-radius: 50%
      border: 1px solid #A4A4A4
      transition: 218ms

      &:hover
        background-color: $primary10

    .right-part
      @media $mediaCompactHeader
        gap: 28px

  .navbar-fixed
    position fixed
    z-index: ($zIndexHeader + 1)
    top: 16px
    left: 50%
    height: 40px
    transform: translateX(-50%)
    border: 1px solid var(--navbar-border-color)
    border-radius: 58px
    padding-left: 8px
    overflow: hidden
    background: var(--navbar-bg-color)
    backdrop-filter: blur(14px)

    .nav-item > a,
    .el-dropdown
      display: block
      padding: 0 12px
      border-radius: 12px;
      color: #585858

      &:hover
        color: black
        text-shadow: 0px 0px 18px rgba(128, 128, 128, 0.4);

    .right-part
      overflow: hidden
      // @TODO: Pass dynamic container width
      width: calc(280px * var(--affix-progress))
      opacity: calc(var(--affix-progress))
      padding-left: calc(20px * var(--affix-progress))
      padding-right: 8px
      transition-duration: 0.4s
      // transition-timing-function: cubic-bezier(.85,.0,.3,.1)
      // transition-delay: 0.2s

      .flex
        padding-left: 8px
        transition-duration: 0.4s
        // transition-timing-function: cubic-bezier(.85,.0,.3,.1)
        opacity: calc(var(--affix-progress))
        // transition-delay: 0.3s
        transform: translateX(calc(110% * (1 - var(--affix-progress))))

        > *
          flex-shrink: 0

    .try-button
      height: 34px
      font-weight: 800
      font-size: 15px

      &:hover
        border-width: 0px !important

    .menu-list
      position relative

      > span
        display none

      .active-tab
        position absolute
        border-radius: 12px
        height: 24px
        top: 0px
        background: rgba(255, 255, 255, 0.1)
        pointer-events: none

      .nav-item
        font-weight: 800;
        font-size: 15px;
        line-height: 24px;
        white-space: nowrap;

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
