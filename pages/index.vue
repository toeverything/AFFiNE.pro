<template lang="pug">
.page.page-home.page-overview
  svg-defs

  .section-hero
    .base-container.hero-container
      overview-hero

  .section-trusted-by
    overview-trusted-by

  .section-consolidate-workflow
    overview-consolidate-workflow

  .section-write-draw-plan
    overview-write-draw-plan

  .section-build-in-public
    overview-build-in-public

  .section-user-stories
    overview-user-stories

  .section-build-with-module
    overview-build-with-module

  .section-sns
    overview-sns

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
  font-weight: 800;
  font-size: fluid-value(32, 64);
  line-height: (77/64);
  text-align: center

.section-grad2-title
  margin: 0
  font-weight: 800;
  font-size: fluid-value(20, 64);
  line-height: (77/64);
  background-image: linear-gradient(180deg, #0E55EE 0%, #002A86 100%);
  background-clip: text;
  color: transparent

  /html.dark &
    background-image: linear-gradient(180deg, #A8C3FF 0%, #417DFF 100%)

.page-overview
  color: var(--primary)
  font-size: fluid-value()

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
