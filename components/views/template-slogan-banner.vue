<template lang="pug">
.template-slogan-banner(
  :style="{ '--progress': animateState.scrollProgress }"
)
  .screenshots-layer
    .cover-img.screenshot-card(
      v-for="n in 6"
      :class="[ `card-${n}` ]"
    )

  .gradient-mask-layer
    .top-mark
    .bottom-mark
  overview-slogan-banner
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const device = useDevice()
const animateState = reactive({
  scrollProgress: 0
})

const setupScrollTrigger = async () => {
  if (device.isMobile) return

  await nextTick()

  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: '.template-slogan-banner',
      markers: false,
      start: `top bottom`,
      end: "bottom 60%",
      invalidateOnRefresh: true,
    }
  })

  tl
    .to(animateState, {
      scrollProgress: 1,
      ease: 'none',
      overwrite: true
    })
    // .to('.screenshot-card')
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  setupScrollTrigger()
})

onActivated(() => {
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.template-slogan-banner
  position relative
  overflow-y: hidden

  @media (max-width: 2000px)
    overflow: hidden

  .overview-slogan-banner
    @media $mediaInMobile
      min-height: 525px
      margin-top: 62px

      .section-title
        margin-bottom: 0

  .screenshots-layer
    position absolute
    z-index 2
    max-width: 1440px
    width: 100%
    height: 100%
    min-width: 1050px
    left: 50%
    transform: translateX(-50%)
    pointer-events: none

    @media $mediaInMobile
      min-width: 744px

  .screenshot-card
    // filter: drop-shadow(0px 209px 83px rgba(163, 163, 163, 0.01)) drop-shadow(0px 117px 70px rgba(163, 163, 163, 0.05)) drop-shadow(0px 52px 52px rgba(163, 163, 163, 0.09)) drop-shadow(0px 13px 29px rgba(163, 163, 163, 0.1));
    border-radius: 16px
    box-shadow: 0px 13px 29px rgba(163, 163, 163, 0.1), 0px 52px 52px rgba(163, 163, 163, 0.09), 0px 117px 70px rgba(163, 163, 163, 0.05)
    width: 375px
    position absolute

    --offset: 100%

    @media $mediaInDesktop
      transform: translateY(calc((1 - var(--progress)) * 0.15 * var(--offset)))

    &.card-1
      aspect-ratio: 375/335
      top: 66px
      right: fv(-206, -116)
      background-image: url(/templates/slogan-banner/1.png)

      @media $mediaInMobile
        top: auto
        right: -187px
        bottom: -181px

    &.card-2
      aspect-ratio: 375/424
      z-index 20
      top: -145px
      right: fv(-346, -250)
      background-image: url(/templates/slogan-banner/2.png)
      --offset: 200%

      @media $mediaInMobile
        top: auto
        right: 500px
        bottom: -302px

    &.card-3
      z-index 10
      aspect-ratio: 375/606
      top: 104px
      right: fv(-258, -178)
      background-image: url(/templates/slogan-banner/3.png)
      --offset: 150%

      @media $mediaInMobile
        top: auto
        right: 160px
        bottom: -525px

    &.card-4
      z-index 20
      left: -230px
      top: 39px
      aspect-ratio: 375/464
      background-image: url(/templates/slogan-banner/4.png)
      --offset: 200%

      @media $mediaInMobile
        top: (-464px + 133)
        left: -147px

    &.card-5
      left: fv(-240, -91)
      top: 217px
      aspect-ratio: 375/516
      background-image: url(/templates/slogan-banner/5.png)

      @media $mediaInMobile
        right -116px
        left: auto
        top: (-516px + 118)

    &.card-6
      z-index 10
      left: -173px
      top: -156px
      aspect-ratio: 375/276
      background-image: url(/templates/slogan-banner/6.png)
      --offset: 150%

      @media $mediaInMobile
        z-index 30
        top: (-276px + 81)
        left: 154px

  .gradient-mask-layer
    pointer-events: none
    position absolute
    z-index 3
    inset: 0

    .top-mark,
    .bottom-mark
      position absolute
      width: 100%
      height: 90px

    .top-mark
      top: 0
      background: linear-gradient(0deg, rgba(248, 248, 247, 0) 0%, #F8F8F7 75.56%)

    .bottom-mark
      bottom: 0
      background: linear-gradient(180deg, rgba(248, 248, 247, 0) 0%, #F8F8F7 75.56%)

</style>
