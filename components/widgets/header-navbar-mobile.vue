<template lang="pug">
.header-navbar-mobile
  .navbar-placeholder
  .navbar-fixed( :class="{ 'has-scrolled': y > 0  }" )
    .flex.flex-1.justify-between.items-center.fixed-row
      nuxt-link( to="/" )
        nuxt-icon.navbar-logo( name="logo" )

      .flex.items-center.gap-18px
        nuxt-link.try-link( :to="PATH.AFFINE_DWONHILLS" target="_blank" ) {{ $t('tryItOnline') }}
        nuxt-link( :to="PATH.AFFiNE_GITHUB" target="_blank" )
          nuxt-icon( name="github" )

        .menu-handler.ml-13px(
          ref="menuHandler"
          @click="() => isOpen = !isOpen"
        )
          nuxt-icon.icon-menu( name="menu" )

    el-collapse-transition
      .collapsed-menu( v-show="isOpen" )
        .menu-list
          .nav-item
            nuxt-link( to="/" ) {{ $t('home') }}
          .nav-item
            nuxt-link( to="/about-us" ) {{ $t('aboutUs') }}
          .nav-item
            nuxt-link( :to="PATH.AFFiNE_COMMUNITY" target="_blank" ) {{ $t('community') }}
          .nav-item
            nuxt-link( to="/blog" ) {{ $t('blog') }}
          .nav-item(
            v-if="CONFIG.ENABLE_LANG_SWITCHER"
          )
            .current-lang.flex.items-center(
              ref="ignoreElRef"
              @click="() => isOpenLangList = !isOpenLangList"
            )
              | {{ localeProperties?.name  }}
              nuxt-icon.ml-3px( name="arrow-down-s" )
        .menu-list.lang-list( v-show="isOpenLangList" )
          .nav-item.flex.justify-between(
            v-for="item in locales"
            @click="locale = item.code"
          )
            | {{ item.name }}
            nuxt-icon.text-6( :name="locale === item.code ? 'CheckBoxCheck' : 'CheckBoxUncheck'" )
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { PATH, CONFIG } from '~/utils/constants'
const { locale, locales, localeProperties, setLocaleCookie } = useI18n()

const props = defineProps<{
  y: number
}>()

const menuHandler = ref(null)
const ignoreElRef = ref(null)
const isOpen = ref(false)
const isOpenLangList = ref(false)

onClickOutside(menuHandler, (event) => {
  isOpen.value = false
}, { ignore: [ ignoreElRef ] })

watch(locale, () => {
  setLocaleCookie(locale.value)
})

</script>

<style lang="stylus">
.header-navbar-mobile
  --navbar-height: 55px

  .navbar-placeholder
    height: var(--navbar-height)

  .navbar-fixed
    width: 100%
    top: 0
    position fixed
    z-index: $zIndexHeader

    .fixed-row
      height: var(--navbar-height)
      border-bottom: 1px solid var(--divider-color)
      padding: 4px
      padding-right: 8px

    .try-link
      font-size: 14px

    .navbar-logo
      color: var(--logo-color)
      font-size: 28px

    .icon-menu
      font-size: 24px

    &.has-scrolled
      background: var(--secondary)

    .collapsed-menu
      background: var(--secondary)
      overflow-y: scroll

      .menu-list
        padding: 20px 32px

        .nav-item
          font-weight: 800;
          font-size: 14px;
          line-height: 24px;
          color: var(--primary-gray)
          margin-bottom: 18px

      .lang-list
        border-top: 1px solid var(--divider-color)
        margin-top: -16px

        .nav-item
          color: var(--primary)
</style>
