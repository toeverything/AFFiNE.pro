<template lang="pug">
.site-hero-bg(
  v-if="!isMobile"
  :class="rootClass"
)
  .gradient-overlay
  .dotted-layer
    client-only
      mouse-trail-sketch
    .muted-dots
  .blur-layer
  .ellipse.ellipse-1
  .ellipse.ellipse-2
</template>

<script setup lang="ts">
const route = useRoute()
const { isMobile } = useDevice()

const rootClass = computed(() => {
  return `type-${route.meta.heroType || 'default'}`
})
</script>

<style lang="stylus">
.site-hero-bg
  position absolute
  z-index: -1
  top: 0
  left: 0
  width: 100vw
  background: $secondary100
  height: 1700px
  overflow: hidden

  --ellipse: #6A89F8

  > *
    position absolute
    width: 100%

  .dotted-layer
    --backgroud: red
    --dot: #EAEAEA
    z-index: 23
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 52%, rgba(0, 0, 0, 1) 44%, transparent 90%)

    .mouse-trail-sketch
      position absolute
      mix-blend-mode: lighten
      mask-image: radial-gradient(white 2px, transparent 2px)
      mask-size: 30px 30px

    .muted-dots
      background-image: radial-gradient(var(--dot) 2px, transparent 2px)
      background-size: 30px 30px
      height: 1674px

    /html.dark &
      --dot: #656565

  .blur-layer
    z-index: 10
    background: $secondary10;
    backdrop-filter: blur(150px)
    backface-visibility: hidden
    height: 1600px
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 52%, rgba(0, 0, 0, 1) 80%, transparent 90%)
    // mix-blend-mode: multiply

  .ellipse
    inset auto
    background-color: var(--ellipse)

  .ellipse-1
    top: 83px
    right: 20px
    width: 500px
    height: 631px
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%

  .ellipse-2
    border-radius: 78% 22% 26% 74% / 81% 27% 73% 19%
    width: 400px
    height: 365px;
    left: 0px;
    top: 567px;

  .gradient-overlay
    z-index: 233
    height: 2619px
    background: linear-gradient(180deg, #FFFFFF 4.32%, rgba(255, 255, 255, 0) 70.08%, #FFFFFF 88.49%);

    /html.dark &
      height: 1592px
      background: linear-gradient(180deg, #000000 4.32%, rgba(0, 0, 0, 0) 70.08%, #000000 88.49%);

  @media $mediaInMobile
    display: none

  /html.dark &
    --ellipse: #244EE7

  &.type-blog
    .gradient-overlay
      // background: linear-gradient(180deg, #FFFFFF 4.32%, rgba(255, 255, 255, 0.75) 70.08%, #FFFFFF 88.49%);

      /html.dark &
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 4.32%, rgba(0, 0, 0, 0.16) 40.27%, rgba(0, 0, 0, 0.8) 53.86%, rgba(0, 0, 0, 0.8) 60.4%, rgba(0, 0, 0, 0.8) 88.49%);

</style>
