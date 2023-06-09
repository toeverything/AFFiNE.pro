<template lang="pug">
.overview-consolidate-workflow
  .light-tracks
    .light-track.left-track
      light-track-svg
      .light-dot
    .light-track.right-track
      light-track-svg
      .light-dot

  .grid-bg
    .grid-line
    .grid-line.is-lighter

  .container.flex.flex-col.items-center
    .section-mini-title {{ $t('overviewPage.consolidateWorkflowTitle') }}

    .first-row
      hover-spotlight-card.lucid-card.say-goodbye-card(
        :lightSize="300"
      )
        .card-title
          .title-shadow( :class="{ 'is-show': isShowAlterLine }" )
          | {{ $t('overviewPage.consolidateWorkflowSayGoodbye') }}
        .product-alters
          svg-icon-drawing( :isShow="isShowAlterLine" )
            nuxt-icon(
              filled name="roadmap-alter-line"
            )
          .alters-img
        .card-desc {{ $t('overviewPage.consolidateWorkflowSayGoodbyeDesc') }}

    .second-row.flex
      hover-spotlight-card.lucid-card.affine-card(
        :lightSize="300"
      )
        .flex-row
          nuxt-icon(
            filled name="affine-glow"
          )
          .col-body
            .card-title
              .title-shadow( :class="{ 'is-show': isShowTitleShadow }" )
              span( v-html="$t('overviewPage.consolidateWorkflowAffine')" )
            .card-desc {{ $t('overviewPage.consolidateWorkflowAffineDesc') }}

      hover-spotlight-card.lucid-card.privacy-card(
        :lightSize="300"
      )
        nuxt-icon.card-icon(
          name="lock-alt"
          filled
        )
        .card-mini-title {{ $t('overviewPage.consolidateWorkflowPrivacy') }}
        .card-desc {{ $t('overviewPage.consolidateWorkflowPrivacyDesc') }}
</template>

<script setup lang="ts">
import gsap from 'gsap'

const isShowAlterLine = ref(false)
const isShowTitleShadow = ref(false)
const { isMobile } = useDevice()

const setupScrollTrigger = () => {
  gsap.to(isShowAlterLine, {
    scrollTrigger: {
      start: isMobile ? "20% center" : "center center",
      // markers: true,
      trigger: '.overview-consolidate-workflow',
      onEnter: () => {
        setTimeout(() => {
          isShowAlterLine.value = true
        }, 500)
      },
    }
  })
  gsap.to(isShowTitleShadow, {
    scrollTrigger: {
      start: "center center",
      trigger: '.second-row',
      onEnter: () => {
        setTimeout(() => { isShowTitleShadow.value = true }, 500)
      },
    }
  })
}

onMounted(() => {
  setupScrollTrigger()
})

</script>

<style lang="stylus">
.overview-consolidate-workflow
  position relative
  overflow: hidden
  padding-top: fluid-value(66, 129)
  padding-bottom: fluid-value(58, 213)
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #001136 100%)
  background-size: 100% 250%
  border-radius: 40px 40px 0px 0px
  --card-gap: fluid-value(24, 30)

  .light-tracks
    --offset-path: path('M6.16306 1483.77C85.8473 1581.26 1058 1241.86 1631.72 938.569C2205.45 635.278 2954.48 111.74 2874.8 17.8637C2795.11 -76.0124 1962.71 234.37 1345.79 540.525C728.877 846.681 -73.5212 1386.28 6.16306 1483.77Z')
    --scale: (1300/2882)

    position absolute
    z-index: -1
    width: 2882px
    left: 50%
    top: -12%
    transform: translate3d(-50%, 0, 0)
    aspect-ratio: 2882/1502

    svg
      width: 100%
      stroke-width: 6px
      aspect-ratio: 2882/1502

      path
        stroke: rgba(255,255,255,0.15)

  .light-dot
    @keyframes move
      from
        offset-distance: 30%
      to
        offset-distance: 130%

    position: absolute
    width: 10px
    height: 10px
    border-radius: 50%
    background: #7D7D7D;
    box-shadow: 0px 0px 24px 4px rgba(255, 255, 255, 0.8);
    transform: scale(calc(1/var(--scale)))
    left: 0
    top: 0
    offset-path: var(--offset-path)
    animation: move 20000ms infinite reverse linear

    &:before
      display: none
      content: ''
      position: absolute
      left: 9px
      top: 3px
      width: 180px
      height: 3px
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))

  .light-track
    position: absolute
    inset: 0
    --x: 0px

    @property --r {
      syntax: '<angle>';
      inherits: false;
      initial-value: -90deg;
    }

    @property --rx {
      syntax: '<length>';
      inherits: false;
      initial-value: 0px;
    }

    @keyframes rotateStartDeg {
      from {
        --r: -90deg;
      }

      to {
        --r: 270deg;
      }
    }

    .light-track-svg
      // mask-image: conic-gradient(from var(--r), transparent, transparent 80%, #fff 100%);
      // mask-size: 2882px 1502px
      // background: conic-gradient(from calc(var(--r)) at var(--x) 50px, #222 0%, #fff 20%, rgba(255, 255, 255, 0) 25%)
      // animation: rotateStartDeg 20s linear infinite

      path
        stroke-dasharray: 0.1 0.9
        stroke-dashoffset: 1
        // stroke: url(#track-gradient)
        // display: none
        animation: path-move 20s linear infinite

        @keyframes path-move
          from
            stroke-dashoffset: 0.15

          to
            stroke-dashoffset: 1.15

  .left-track
    left: 0
    top: -18%
    transform: scale(var(--scale)) translateX(-30%)

    .light-dot
      @keyframes left-move
        0%
          offset-distance: 85%
        to
          offset-distance: 185%
      animation-name: left-move

  .right-track
    right: 0
    top: 20%
    transform: scale(var(--scale)) translateX(30%)

    .light-track-svg
      path
        stroke-dashoffset: 0.7
        // animation-delay: -10s

        @keyframes path-move-right
          to
            stroke-dashoffset: 1.7

        animation-name: path-move-right

    .light-dot
      // animation-delay: -10s

  .grid-bg
    position absolute
    inset: 0
    background: linear-gradient(0deg, #001136 40%, #000000 100%)
    z-index: -2
    border-radius: 0 0 40px 40px
    --grid-size: 190px
    --grid-offset: -10px
    --line-size: 1.5px

    @media $mediaInMobile
      background: linear-gradient(0deg, #001136 0%, #042876 100%)
      border-radius: 0 0 10px 10px
      --grid-size: 40px
      --line-size: 0.5px

    &:before
      content: ''
      position absolute
      z-index: 2
      inset: 0
      background: linear-gradient(0, rgba(0, 18, 54, 0) 0%, #000000 100%)
      background-size: 100% 150%

    .grid-line
      --grid-color: rgba(255, 255, 255, .2)
      position absolute
      inset: 0
      background-image: linear-gradient(var(--grid-color) var(--line-size), transparent var(--line-size)), linear-gradient(90deg, var(--grid-color) var(--line-size), transparent var(--line-size));
      background-size: var(--grid-size) var(--grid-size)
      background-position: var(--grid-offset) var(--grid-offset)

      &.is-lighter
        --grid-color: rgba(255, 255, 255, .1)
        background-position: calc(var(--grid-size)/2 + var(--grid-offset)) calc(var(--grid-size)/2 + var(--grid-offset))

  .container
    padding: 0 fluid-value(16, 80)
    max-width: 1380px

  .first-row
    width: 100%
    margin-bottom: var(--card-gap)

  .second-row
    width: 100%
    gap: var(--card-gap)
    @media $mediaInMobile
      flex-direction: column

  .lucid-card
    padding: 20px
    background: rgba(255, 255, 255, 0.04)
    border-radius: fluid-value(7, 10)
    border: 2px solid rgba(255, 255, 255, 0.08)

    .card-title
      font-weight: 800
      font-size: fluid-value(14, 24)
      line-height: (29/24)
      text-align: center
      position: relative

    .card-desc
      font-size: fluid-value(12, 20)
      line-height: (29/24)
      text-align: center
      margin-bottom: fluid-value(10, 20)

    .title-shadow
      --scale: 0.7
      opacity: 0
      background: rgba(255, 255, 255, 0.3);
      filter: blur(23.5px);
      position: absolute
      left: 50%
      top: 50%
      transform: translate3d(-50%, -50%, 0) scale(var(--scale))
      transform-origin: 50% 50%
      border-radius: 20px
      transition: opacity 318ms, transform 518ms

      &.is-show
        --scale: 1
        opacity: 1
        will-change: auto

  .say-goodbye-card
    .card-title
      margin-top: fluid-value(10, 24)
      margin-bottom: fluid-value(25, 30)

    .title-shadow
      width: 19em
      height: 41px

    .product-alters
      position relative
      width: 80%
      max-width: 540px
      margin: 0 auto
      aspect-ratio: 478/68
      margin-bottom: fluid-value(30, 51)

      .svg-icon-drawing
        @keyframes mockFillDraw
          from
            clip-path: inset(0 100% 0 0)
          to
            clip-path: inset(0 0 0 0)

        .nuxt-icon
          animation: mockFillDraw 788ms forwards

      .nuxt-icon
        position absolute
        inset: 0
        top: -2px

        svg
          width: 100%
          height: 100%

      .alters-img
        margin: 0 auto
        width: percentage(296/478)
        aspect-ratio: 296/69.57
        background-image: url(@/assets/overview/consolidate-workflow-alters.png)
        background-size: contain
        background-repeat: no-repeat

  .affine-card
    flex: 2.79
    display: flex
    align-items: center

    .flex-row
      max-width: 800px
      display: flex
      align-items: center
      gap: fluid-value(12, 84)
      margin: 0 auto

      @media $mediaInMobile
        flex-direction: column

    .nuxt-icon
      font-size: fluid-value(100, 141)

    .card-title,
    .card-desc
      @media $mediaInDesktop
        text-align: left

    .card-title
      margin-bottom: 18px

      b
        font-family: Kalam, sans-serif
        font-weight: 700
        font-size: 1.5em
        margin: 0 0.2em

      .title-shadow
        width: 10em
        height: 100px
        margin-top: -0.2em
        background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);

  .privacy-card
    display: flex
    flex-direction: column
    justify-content: flex-end
    position: relative
    flex: 1
    min-height: fluid-value(170, 250)
    overflow: hidden

    @media $mediaInMobile
      justify-content: flex-start
      padding-top: 40px

    .card-mini-title,
    .card-desc
      text-align: left
      margin-bottom: 0

    .card-mini-title
      font-size: 20px
      font-weight: 800
      margin-bottom: fluid-value(14, 15)

    .card-icon
      position: absolute
      font-size: 237px
      right: 0px
      bottom: 5px

      @media $mediaInMobile
        top: 0

  .section-mini-title
    font-weight: 800
    font-size: fluid-value(15, 32)
    margin-bottom: fluid-value(63, 139)
    line-height: (18/15)

    @media $mediaInMobile
      text-align: center
      max-width: 260px

</style>
