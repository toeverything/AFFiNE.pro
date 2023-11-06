<template lang="pug">
.overview-trusted-by
  .limit-container.flex.flex-col.items-center
    h3.ma-0.section-grad-title.headline-2 {{ $t('overviewPage.trustedByTitle') }}
    .logo-wall-wrapper
      .desktop-wall
        .wall-item(
          v-for="logo in logos"
        )
          .item-logo.item-neutral(
            :style="{ backgroundImage: `url(/trusted-by/neutral/${logo}.png)` }"
          )
          .item-logo.item-colorful(
            :style="{ backgroundImage: `url(/trusted-by/colorful/${logo}.png)` }"
          )
  .mobile-wall
    client-only
      vue-marquee-slider(
        id="marquee-slider"
        :speed="40000"
        :width="120"
        :space="24"
      )
        img(
          v-for="(logo, index) in logos"
          :key="logo"
          :src="`/trusted-by/neutral/${logo}.png`"
        )
</template>

<script setup lang="ts">
import { VueMarqueeSlider } from 'vue3-marquee-slider'
import '@/node_modules/vue3-marquee-slider/dist/style.css'

const logos = ref([
  'google',
  'microsoft',
  'amazon',
  'meta',
  'ibm',
  'tiktok',
  'shopify',
  'apache',
  'cloud303',
  'sap',
  'michigan',
  'arqcap',
  'naucmeit',
  'keyman',
  'bonfireleads',
])
</script>

<style lang="stylus">
.overview-trusted-by
  position: relative
  padding-top: fluid-value(60, 120)
  padding-bottom: fluid-value(60, 120)

  .section-grad-title
    max-width: 480px
    text-align: center

    @media (max-width: 390px)
      width: 315px
      font-size: 18px

  .logo-wall-wrapper
    margin: 0 auto
    margin-top: fluid-value(24, 64)
    max-width: 936px

  .mobile-wall
    $scrollMaskSize = 10%
    width: 100%
    position: relative
    display: none
    height: 40px
    -webkit-mask-image: s('linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))')
    -webkit-mask-size: 100% 100%

    @media (max-width: 1023px)
      display: block

    #marquee-slider
      img
        object-fit: cover
        object-position: center
        aspect-ratio: 120/40

  .desktop-wall
    display: flex
    flex-wrap: wrap
    justify-content center
    gap: 84px 56px

    @media (max-width: 1023px)
      display: none

    .wall-item
      position: relative
      width: 120px
      aspect-ratio: 120/40

      .item-colorful
        opacity: 0

      > *
        position: absolute
        inset: 0
        background-size: contain
        background-position: center center
        transition: 150ms cubic-bezier(.42, 0, .58, 1)

      &:hover
        .item-neutral
          opacity: 0

        .item-colorful
          opacity: 1

</style>
