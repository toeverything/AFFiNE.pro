<template lang="pug">
.header-navbar-mobile
  .navbar-placeholder
  .navbar-fixed( :class="{ 'has-scrolled': y > 0  }" )
    .flex.flex-1.justify-between.items-center.fixed-row
      nuxt-link( to="/" )
        affine-logo.navbar-logo( name="logo" )

      .flex.items-center.gap-12px
        stars-on-github-button

        .menu-handler(
          ref="menuHandler"
          @click="() => isOpen = !isOpen"
        )
          nuxt-icon.icon-menu( :name="isOpen ? 'menu-close' : 'hamburg-menu'" )

    el-collapse-transition
      .collapsed-menu( v-show="isOpen" )
        .menu-list
          //- .nav-item
          //-   nuxt-link( to="/" ) {{ $t('home') }}
          .nav-item
            nuxt-link( :to="PATH.AFFiNE_COMMUNITY" target="_blank" ) {{ $t('community') }}
          .nav-item
            nuxt-link( to="/about-us" ) {{ $t('aboutUs') }}
          .nav-item
            nuxt-link( to="/blog" ) {{ $t('blog') }}
          .nav-item
            nuxt-link( to="/pricing" ) {{ $t('price') }}
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

  .navbar-placeholder
    height: var(--navbar-height)

  .navbar-fixed
    width: 100%
    top: 0
    position fixed
    z-index: $zIndexHeader
    backdrop-filter: blur(15px)
    background: white;
    border-bottom: 0.5px solid transparent;

    .fixed-row
      height: var(--navbar-height)
      padding: 4px
      padding-right: 8px
      padding: 0 32px

      @media (max-width: 390px)
        padding: 0 20px

    .try-link
      font-size: 14px

    .navbar-logo
      color: var(--logo-color)
      font-size: 32px

    .icon-menu
      font-size: 24px
      color: var(--primary-deep)

    &.has-scrolled
      background: rgba(253, 253, 252, 0.90);
      // background: var(--secondary)
      border-bottom-color: rgba(0, 0, 0, 0.10);

    .collapsed-menu
      // background: var(--secondary)
      overflow-y: scroll
      height: s('calc(100dvh - var(--navbar-height))')

      .menu-list
        padding: 0 32px

        .nav-item
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: var(--primary-deep)
          padding: 12px 0
          letter-spacing: -0.28px;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);

      .lang-list
        border-top: 1px solid var(--divider-color)
        margin-top: -16px

        .nav-item
          color: var(--primary)
</style>
