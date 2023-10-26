<template lang="pug">
.page.page-home.page-overview
  svg-defs

  overview-hero-v3

  .section-bg-wrapper
    overview-trusted-by

    overview-hyperfused-platform

    overview-features

    overview-build-in-public-light

    overview-user-stories-light

    overview-slogan-banner

</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  titleTemplate: 'AFFiNE - All In One KnowledgeOS',
  meta: [
    { name: 'twitter:title', content: 'AFFiNE - All In One KnowledgeOS' },
  ]
})

gsap.registerPlugin(ScrollTrigger)
</script>

<style lang="stylus">
.section-title
  margin: 0
  font-weight: 500;
  font-size: fluid-value(32, 60);
  line-height: (65/60);
  text-align: center
  letter-spacing: -0.068em;

.section-grad-title
  background-image: linear-gradient(91deg, #474747 20.12%, #000 55.27%, #474747 82.61%)
  background-clip: text;
  color: transparent

.section-grad2-title
  margin: 0
  font-weight: 800;
  font-size: fluid-value(20, 64);
  line-height: (77/64);
  background-image: linear-gradient(180deg, #1E96EB 0%, #1E96EB 100%);
  background-clip: text;
  color: transparent

  /html.dark &
    background-image: linear-gradient(180deg, #A8C3FF 0%, #417DFF 100%)

.page-overview
  color: var(--primary)
  font-size: fluid-value()

  .section-bg-wrapper
    background: var(--bg)
    position relative
    z-index: 2

  @media $mediaInMobile
    padding-top: 10px

  .section-desc
    text-align: center

  .try-it-button
    padding: 12.5px 29px
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    background: linear-gradient(180deg, #0E58F5 0%, #396BD8 31.77%, #1443A9 76.04%, #0043D3 100%);
    box-shadow: 0px 4px 21px rgba(14, 85, 238, 0.54), 0px 4px 84px rgba(138, 175, 255, 0.3);
    border-radius: 10px
    color: #fff;
    transition: 368ms

    @media $mediaInDesktop
      padding: 0 32px
      height: 52px

    @media $mediaInXS
      padding: 10px 51px;

    &:hover
      box-shadow: 0px 4px 80px #1D62F4, 0px 4px 21px rgba(14, 85, 238, 0.54), 0px 4px 84px rgba(138, 175, 255, 0.3);

    &:active
      transform: translateY(2px)

    /html.dark &
      background: linear-gradient(179.54deg, #6A51FF 2.51%, #4326FF 16.25%, #003096 94.57%, #0A3EAD 101.87%);
      box-shadow: 0px 4px 21px rgba(14, 85, 238, 0.54), 0px 4px 84px rgba(138, 175, 255, 0.3);

      &:hover
        box-shadow: 0px 4px 80px #0043D3, 0px 4px 21px rgba(14, 85, 238, 0.54), 0px 4px 84px rgba(138, 175, 255, 0.3);

  .section-hero
    .hero-container
      max-width: (1280px + 68px)
      padding: 0 fluid-value(32, 100)

  .section-open-source-everything
    height: var(--section-height, auto)
    overflow hidden
</style>
