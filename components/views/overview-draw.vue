<template lang="pug">
.feature-card.overview-draw(
  :style="{ '--glow-opacity': scrollStates.glowOpacity }"
)
  .content-part
    .card-title
      | {{ $t('overviewPage.moduleDrawTitle') }}
      svg-icon-drawing.draw-mark( :isShow="scrollStates.isShowDrawMark" )
        nuxt-icon(
          filled name="draw-draw-mark"
        )
      svg-icon-drawing.ease-mark( :isShow="scrollStates.isShowEaseMark" )
        nuxt-icon(
          filled name="draw-ease-mark"
        )
      svg-icon-drawing.creativity-mark( :isShow="scrollStates.isShowCreativityMark" )
        nuxt-icon(
          filled name="draw-creativity-mark"
        )
      svg-icon-drawing.heart-mark( :isShow="scrollStates.isShowHeart" duration="0.8s")
        nuxt-icon(
          filled name="draw-heart"
        )
    .card-desc {{ $t('overviewPage.moduleDrawDesc') }}
  .cover-part
    .cover-image.cover-ai
    .cover-image.cover-whiteboard
</template>

<script setup lang="ts">
import gsap from 'gsap'

const { isMobile } = useDevice()

const scrollStates = reactive({
  isShowDrawMark: false,
  isShowEaseMark: false,
  isShowCreativityMark: false,
  isShowHeart: false,
})

const setupScrollTrigger = () => {
  const drawingTimeline = gsap.timeline({
    paused: true
  })

  drawingTimeline
    .to(scrollStates, {
      isShowDrawMark: true,
      duration: 1
    })
    .to(scrollStates, {
      isShowEaseMark: true,
      duration: 1
    })
    .to(scrollStates, {
      isShowCreativityMark: true,
      duration: 1
    })
    .to(scrollStates, {
      isShowHeart: true,
      duration: 0.1
    })

  gsap.to(scrollStates, {
    glowOpacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: '.overview-draw',
      start: '55% center',
    }
  })

  if (isMobile) return

  gsap.to(scrollStates, {
    scrollTrigger: {
      trigger: '.overview-draw',
      start: '20% center',
      onEnter: () => {
        drawingTimeline.play()
      }
    }
  })

  gsap.fromTo('.cover-ai', { yPercent: -30 }, {
    yPercent: "+=30",
    ease: 'none',
    scrollTrigger: {
      start: "top center",
      trigger: '.overview-draw',
      scrub: true
    },
  })

  gsap.fromTo('.cover-whiteboard', { yPercent: 10 }, {
    yPercent: "-=10",
    ease: 'none',
    scrollTrigger: {
      trigger: '.overview-draw',
      scrub: true
    },
  })

}

onMounted(() => {
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.feature-card.overview-draw
  --theme-color: #72E6FF
  gap: fluid-value(40, 106, 390, 1920)

  .card-title
    position: relative
    font-family: 'Kalam'
    font-weight: 700
    font-size: fluid-value(24, 40, 390, 1920)
    line-height: (64/40)
    white-space: pre
    margin-bottom: fluid-value(44, 53)

    @media $mediaInSmallScreen
      margin-top: 20px

  .card-desc
    max-width: fluid-value(260, 300)

    @media $mediaInSmallScreen
      white-space: initial

  .content-part
    align-self: start
    padding-top: 168px

    @media $mediaInSmallScreen
      padding-top: 0
      max-width: 400px
      align-self: center

    @media $mediaInMobile
      margin-bottom: 100px

  .svg-icon-drawing
    position: absolute

    &.draw-mark
      left: -0.1em
      top: -0.2em
      font-size: 2.55em

    &.ease-mark
      left: -0.12em
      top: 0.2em
      font-size: 2.45em

    &.creativity-mark
      left: 0.74em
      top: -0.34em
      font-size: 5.32125em

    &.heart-mark
      top: 2.3em
      left: 3.2em
      font-size: 2.65em

  .cover-part
    position: relative

    @media $mediaInSmallScreen
      width: 100%

    @media $mediaInMobile
      width: 80vw
      max-width: 390px
      margin-left: -50px

  .cover-whiteboard
    aspect-ratio: 1823/1221
    width: 100%
    background-image: url(@/assets/overview/module-draw-cover-whiteboard.png)

  .cover-ai
    aspect-ratio: 688/570
    max-width: 344px
    width: 50%
    position: absolute
    z-index: 2
    right: -80px
    top: 39px
    background-image: url(@/assets/overview/module-draw-cover-ai.png)

    @media (max-width: 1440px)
      top: -60px
      right: 2px

    @media $mediaInMobile
      right: -45px

</style>
