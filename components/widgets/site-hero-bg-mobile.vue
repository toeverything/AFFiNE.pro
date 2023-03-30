<template lang="pug">
.site-hero-bg-mobile(
  v-if="isMobile"
  :class="rootClass"
)
  .static-bg(v-if="useStaticImage")
  template( v-else )
    .gradient-overlay
    .dotted-layer
    .blur-layer
    .ellipse.ellipse-1
</template>

<script setup lang="ts">
const route = useRoute()
const { isMobile } = useDevice()

const useStaticImage = true

const rootClass = computed(() => {
  return `type-${route.meta.heroType || 'default'}`
})
</script>

<style lang="stylus">
.site-hero-bg-mobile
  position absolute
  z-index: -1
  top: 0
  left: 0
  width: 100vw
  background: $secondary100
  height: 1700px
  overflow: hidden
  display: none

  --ellipse: #6A89F8

  > *
    position absolute
    width: 100%

  .static-bg
    width: 100%
    aspect-ratio: 390/1151
    background-image: url(@/assets/global/hero-bg-mobile-dark.webp)
    background-size: 100%
    background-position: center top

  .dotted-layer
    --backgroud: red
    --dot: #EAEAEA
    z-index: 23
    background-image: radial-gradient(var(--dot) 1.5px, transparent 1.5px)
    background-size: 20px 20px
    background-position: 20px 20px
    height: 870px

    /html.dark &
      --dot: #656565

  .blur-layer
    z-index: 10
    background: $secondary10;
    backdrop-filter: blur(150px)
    backface-visibility: hidden
    height: 1600px
    max-blend-mode: multiply

  .ellipse
    inset auto
    background-color: var(--ellipse)

  .ellipse-1
    top: 717px
    left: -20px
    width: 446px;
    height: 365px;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%

  .gradient-overlay
    z-index: 233
    height: 3588px
    background: linear-gradient(180deg, #FFFFFF 4.32%, rgba(255, 255, 255, 0) 70.08%, #FFFFFF 88.49%);

    /html.dark &
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 4.32%, rgba(0, 0, 0, 0.98) 11.53%, rgba(0, 0, 0, 0) 16.87%, rgba(0, 0, 0, 0.78) 24.04%, rgba(0, 0, 0, 0.9) 88.49%)

  @media $mediaInMobile
    display: block

  /html.dark &
    --ellipse: #6A89F8

</style>
