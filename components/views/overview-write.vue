<template lang="pug">
.feature-card.overview-write
  .content-part
    .card-title
      template(
        v-for="(char, index) in dynamicStates.titleText"
      )
        span.char(
          v-if="dynamicStates.textTypingIndex >= index"
          :class="{ 'is-typed': dynamicStates.textTypingIndex >= index, 'is-current': index == dynamicStates.textTypingIndex }"
        )
          | {{ char }}
    .card-desc.card-subtitle {{ $t('overviewPage.moduleWriteSubtitle') }}
    .card-desc {{ $t('overviewPage.moduleWriteDesc') }}
  .cover-part
    .cover-image.cover-okr
    .cover-image.cover-layout
</template>

<script setup lang="ts">
import gsap from 'gsap'

const { isMobile } = useDevice()
const { t } = useI18n()

const dynamicStates = reactive({
  titleText: t('overviewPage.moduleWriteTitle'),
  typingIndex: -1,
  isTyping: false,
})

const setupScrollTrigger = () => {
  const drawingTimeline = gsap.timeline({
    paused: true
  })

  drawingTimeline
    .to(dynamicStates, {
      isTyping: true,
      textTypingIndex: dynamicStates.titleText.length - 1,
      ease: `steps(${dynamicStates.titleText.length - 1})`,
      duration: 1
    })

  gsap.to(dynamicStates, {
    scrollTrigger: {
      trigger: '.overview-write',
      start: '20% center',
      onEnter: () => {
        drawingTimeline.play()
      }
    }
  })

  if (isMobile) return

  gsap.from('.cover-okr', {
    yPercent: "-=30",
    ease: 'none',
    scrollTrigger: {
      start: "top center",
      trigger: '.overview-write',
      scrub: true
    },
  })

  gsap.to('.cover-layout', {
    yPercent: "+=10",
    ease: 'none',
    scrollTrigger: {
      trigger: '.overview-write',
      scrub: true
    },
  })

}

onMounted(() => {
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.feature-card.overview-write
  --theme-color: #4371E9
  gap: fluid-value(18, 172, 1440, 1920)

  @keyframes blinking
    from,
    49.8%{
      opacity: 1;
    }
    49.9%,
    99.9% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }

  cursor()
    animation: blinking 1s linear infinite

  .card-title
    font-style: italic;
    font-weight: 900;
    font-size: fluid-value(32, 40)
    line-height: (48/40)
    margin-bottom: 7px

    .char
      opacity: 0
      position relative

      &:last-child
        margin-right: 0.3em

      &.is-typed
        opacity: 1

    &:after
      content: ''
      display: inline-block
      background: #142CFF
      width: 5px
      height: 1em
      border-radius: 4px
      position: relative
      top: 0.15em
      cursor()

  .card-subtitle
    font-size: fluid-value(24, 40)
    margin-bottom: 48px

  .card-desc
    max-width: 400px

    @media $mediaInSmallScreen
      white-space: initial
      max-width: 100vw

    @media $mediaInXS
      white-space: pre-line

  .content-part
    @media $mediaInSmallScreen
      display: flex
      flex-direction: column
      align-items: center

    @media $mediaInXS
      align-items: flex-start

  .cover-part
    width: 100%
    aspect-ratio: 1430/1807
    position: relative
    padding-top: fluid-value(0, 20)
    margin-right: fluid-value(0, 100, 1440, 1920)
    display: flex
    align-items: center

    @media $mediaInSmallScreen
      max-width: 500px

  .cover-layout
    width: 100%
    aspect-ratio: 1430/875
    background-image: url(@/assets/overview/module-draw-cover-layout.png)

  .cover-okr
    position: absolute
    width: 73.5%
    z-index: 2
    left: 50%
    top: 50%
    aspect-ratio: 1053/1407
    background-image: url(@/assets/overview/module-draw-cover-okr.png)
    transform: translate3d(-50%, -30%, 0)

</style>
