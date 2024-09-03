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

    div
      .collapsed-menu( :style="{ maxHeight: isOpen ? 'var(--h)' : '0px' }" )
        .menu-list
          //- .nav-item
          //-   nuxt-link( to="/" ) {{ $t('home') }}
          .nav-item
            scroll-link.flex.items-center.gap-4px( to="/ai" )
              | AFFiNE AI
              .new-label NEW

          .nav-item.community-item(
            @click="isOpenResource = !isOpenResource" ref="ignoreResElRef"
            :class="{ 'is-open-community': isOpenResource }"
          )
            .nav-handler.handler-row.justify-between.items-center.w-full(
            )
              | {{ $t('resource') }}
              nuxt-icon.arrow-icon.text-size-20px( name="ArrowRightSmall2" filled )

            el-collapse-transition
              .flex.flex-col( v-show="isOpenResource" )
                .nav-item
                  scroll-link( :to="PATH.AFFiNE_DOCS" ) Docs
                .nav-item
                  nuxt-link( to="/templates" @click="isOpen = false" ) {{ $t('template') }}
                .nav-item
                  nuxt-link( to="/about-us" @click="isOpen = false") {{ $t('aboutUs') }}
                .nav-item
                  nuxt-link( to="/blog?tag=Release+Note" @click="isOpen = false") {{ $t('blog') }}
                .nav-item.mb-8px
                  .nav-handler( @click.stop="() => {}" ) Community
                community-navbar

          .nav-item
            nuxt-link( to="/pricing" ) {{ $t('price') }}

</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
const { locale, setLocaleCookie } = useI18n();

const menuHandler = ref(null);
const ignoreElRef = ref(null);
const ignoreResElRef = ref(null);
const isOpen = ref(false);
const isOpenCommunity = ref(false);
const isOpenResource = ref(false);

onClickOutside(
  menuHandler,
  (event) => {
    isOpen.value = false;
    isOpenCommunity.value = false;
    isOpenResource.value = false;
  },
  { ignore: [ignoreElRef, ignoreResElRef] }
);

watch(locale, () => {
  setLocaleCookie(locale.value);
});
</script>

<style lang="stylus">
.header-navbar-mobile

  .navbar-placeholder
    height: var(--navbar-height)

  .community-navbar
    margin: 0 -12px

  .community-item
    .arrow-icon
      transition: 218ms
    .nav-item
      border: none !important

    &.is-open-community
      .arrow-icon
        transform: rotate(90deg)

  .handler-row
    display: flex !important

  .navbar-fixed
    width: 100%
    top: 0
    position fixed
    z-index: $zIndexHeader
    backdrop-filter: blur(15px)
    border-bottom: 0.5px solid transparent;
    background: rgba(248, 248, 247, 0.90);

    .fixed-row
      height: var(--navbar-height)
      padding: 4px
      padding-right: 8px
      padding: 0 32px

      @media (max-width: 480px)
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
      // background: var(--secondary)
      border-bottom-color: rgba(0, 0, 0, 0.10);

    .collapsed-menu
      transition: max-height 0.3s ease-in-out
      // background: var(--secondary)
      overflow-y: scroll
      --h: s('calc(100dvh - var(--navbar-height))')
      height: var(--h)

      .menu-list
        padding: 0 32px
        height: 100%

        .nav-item
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: var(--primary-deep)
          letter-spacing: -0.28px;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);

          > a,
          .nav-handler
            display: flex
            padding: 12px 0

      .lang-list
        border-top: 1px solid var(--divider-color)
        margin-top: -16px

        .nav-item
          color: var(--primary)
</style>
