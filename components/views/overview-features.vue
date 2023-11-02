<template lang="pug">
.overview-features( ref="el" )
  mixin writeIntro
    .intro-part
      .write-label
        template(
          v-for="(char, index) in dynamicStates.titleText"
        )
          span.char(
            v-if="dynamicStates.textTypingIndex >= index"
            :class="{ 'is-typed': dynamicStates.textTypingIndex >= index, 'is-current': index == dynamicStates.textTypingIndex }"
          )
            | {{ char }}
      .feature-title {{ $t('overviewPage.moduleWriteSubtitle') }}
      .feature-desc {{ $t('overviewPage.moduleWriteItemA') }}
      .feature-desc {{ $t('overviewPage.moduleWriteItemB') }}
      .feature-desc {{ $t('overviewPage.moduleWriteItemC') }}

  mixin drawIntro
    .intro-part
      .feature-title
        .underline-wrapper.inline
          em Draw
          svg-icon-drawing.draw-mark( :isShow="drawScrollStates.isShowDrawMark" )
            nuxt-icon(
              filled name="draw-draw-mark"
            )
        span &nbsp;and visualise with&nbsp;
        .underline-wrapper.inline
          em ease&nbsp;
          svg-icon-drawing.ease-mark( :isShow="drawScrollStates.isShowEaseMark" )
            nuxt-icon(
              filled name="draw-ease-mark"
            )
        span and&nbsp;
        .underline-wrapper.inline-flex
          em creativity
          svg-icon-drawing.creativity-mark( :isShow="drawScrollStates.isShowCreativityMark" )
            nuxt-icon(
              filled name="draw-creativity-mark"
            )
      .feature-desc {{ $t('overviewPage.moduleDrawItemA') }}
      .feature-desc {{ $t('overviewPage.moduleDrawItemB') }}
      .feature-desc {{ $t('overviewPage.moduleDrawItemC') }}

  mixin planIntro
    .intro-part
      .feature-label
        vue3-lottie.plan-lottie(
          ref="planLottie"
          :loop="false"
          :autoPlay="planScrollStates.isPlayPlanLottie"
          animationLink="/lottie-files/feature-plan.json"
        )
      .feature-title {{ $t('overviewPage.modulePlanTitle') }}
      .feature-desc {{ $t('overviewPage.modulePlanItemA') }}

  .feature-section.feature-write
    .limit-container.flex
      +writeIntro
      .video-part
        .video-card.pin-card
          .video-wrapper( :progress="scrollProgress" )
            img.video-write( :class="{ 'current': currentSection === 'write' }" :src="writeCoverUrl" )
            img.video-draw( :class="{ 'current': currentSection === 'draw' }" :src="drawCoverUrl" )
            img.video-plan( :class="{ 'current': currentSection === 'plan' }" :src="planCoverUrl" )

        .video-card.mobile-card
          img( :src="writeCoverUrl" )
  .feature-section.feature-draw
    .limit-container.flex
      +drawIntro
      .video-part
        .video-card.mobile-card
          img( :src="drawCoverUrl" )
  .feature-section.feature-plan
    .limit-container.flex
      +planIntro
      .video-part
        .video-card.mobile-card
          img( :src="drawCoverUrl" )
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { useElementVisibility } from '@vueuse/core'
import { gsap } from 'gsap'

const scrollTriggerBreakWidth = 900

const writeCoverUrl = '/overview/Write.jpg'
const drawCoverUrl = '/overview/Draw.jpg'
const planCoverUrl = '/overview/Plan.jpg'

const { t } = useI18n()

const el = ref()
const needScrollTrigger = ref(false)
const currentSection = ref('write')
const scrollProgress = ref(0)
const planLottie = ref()
const elIsVisible = useElementVisibility(el)

const dynamicStates = reactive({
  titleText: t('overviewPage.moduleWriteTitle'),
  typingIndex: -1,
  isTyping: false,
})

const drawScrollStates = reactive({
  isShowDrawMark: false,
  isShowEaseMark: false,
  isShowCreativityMark: false,
})

const planScrollStates = reactive({
  isPlayPlanLottie: false
})

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const width = entry.target.getBoundingClientRect().width
  needScrollTrigger.value = width >= scrollTriggerBreakWidth
})

const setupPlanScrollTrigger = () => {
  const timeline = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1
    }
  })
    .to(planScrollStates, {
      isPlayPlanLottie: true
    })

  gsap.to(planScrollStates, {
    scrollTrigger: {
      trigger: '.feature-section.feature-plan',
      start: '20% center',
      onEnter: () => {
        timeline.play()
      }
    }
  })
}

const setupDrawScrollTrigger = () => {
  const drawingTimeline = gsap.timeline({
    paused: true
  })

  drawingTimeline
    .to(drawScrollStates, {
      isShowDrawMark: true,
      duration: 1
    })
    .to(drawScrollStates, {
      isShowEaseMark: true,
      duration: 1
    })
    .to(drawScrollStates, {
      isShowCreativityMark: true,
      duration: 1
    })

  gsap.to(drawScrollStates, {
    scrollTrigger: {
      trigger: '.feature-section.feature-draw',
      start: '20% center',
      onEnter: () => {
        drawingTimeline.play()
      }
    }
  })
}

const setupWriteScrollTrigger = () => {
  const drawingTimeline = gsap.timeline({
    paused: true
  })

  drawingTimeline
    .to(dynamicStates, {
      isTyping: true,
      textTypingIndex: dynamicStates.titleText.length - 1,
      ease: `steps(${dynamicStates.titleText.length - 1})`,
      duration: 2
    })

  gsap.to(dynamicStates, {
    scrollTrigger: {
      trigger: '.feature-section.feature-write',
      start: '20% center',
      onEnter: () => {
        drawingTimeline.play()
      }
    }
  })
}

const setupScrollTrigger = () => {
  setupDrawScrollTrigger()
  setupWriteScrollTrigger()
  setupPlanScrollTrigger()

  const pinCard = document.querySelector('.video-card.pin-card')

  if (!pinCard) return

  gsap.to(scrollProgress, {
    ease: 'none',
    value: 1,
    scrollTrigger: {
      pinSpacing: false,
      trigger: '.overview-features',
      scrub: true,
      pin: pinCard,
      markers: false,
      start: '-76px top',
      end: () => {
        const pinHeight = pinCard.getBoundingClientRect().height
        const height = el.value?.getBoundingClientRect().height - pinHeight / 2
        return `${height}px ${pinHeight}px`
      },
    }
  })
}

watch(() => planScrollStates.isPlayPlanLottie, (val) => {
  if (val) {
    planLottie.value.play()
  }
})

watch(scrollProgress, (val) => {
  if (val > 0.9) {
    currentSection.value = 'plan'
    return
  }
  if (val > 0.4) {
    currentSection.value = 'draw'
    return
  }
  currentSection.value = 'write'
})

watch(currentSection, (val) => {
  const $videos = [...document.querySelectorAll<HTMLVideoElement>('.pin-card video')]
  $videos.map($el => {
    $el.pause()
  })
  const $video = document.querySelector<HTMLVideoElement>(`.pin-card video.video-${val}`)
  if ($video) {
    $video.play()
  }
})

watch(elIsVisible, (val) => {
  const $video = document.querySelector<HTMLVideoElement>('.pin-card video.current')
  if ($video) {
    val ? $video.play() : $video.pause()
  }
})

onMounted(() => {
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.overview-features
  position relative
  $scrollTriggerMaxWidth = s('(max-width: 900px)')

  @media (max-width: 560px)
    padding-bottom: 30px

  @media $mediaInXS
    padding-left: 12px
    padding-right: 12px

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

  .write-label
    font-style: italic;
    font-weight: 700;
    font-size: fluid-value(32, 40)
    line-height: 1
    color #000
    margin-left: -0.1em

    .char
      opacity: 0
      position relative

      &:last-child
        margin-right: 0.15em

      &.is-typed
        opacity: 1

    &:after
      content: ''
      display: inline-block
      background: #1e96eb
      width: 5px
      height: 1em
      border-radius: 4px
      position: relative
      top: 0.15em
      cursor()

  .feature-section
    padding-top: fluid-value(30, 100, 560, 1024)
    padding-bottom: fluid-value(30, 100, 560, 1024)
    // min-height: 100vh
    display flex
    align-items: center

    @media $scrollTriggerMaxWidth
      min-height: 0

    .limit-container
      align-items: center
      justify-content: space-between
      column-gap: 35px
      row-gap: 32px

      @media $scrollTriggerMaxWidth
        align-items: flex-start
        flex-direction: column

    .intro-part
      display: flex
      flex-direction: column
      gap: fluid-value(12, 16, 560, 744)
      flex: 325
      max-width: 325px

      @media $scrollTriggerMaxWidth
        max-width: 100%

    .feature-label
      color: var(--brand)
      font-size: 14px
      font-weight: 600
      line-height: 142.857%
      letter-spacing: 1.4px
      text-transform: uppercase

    .feature-title
      color: var(--primary-deep)
      font-size: fluid-value(24, 36, 390, 760)
      font-weight: 500
      line-height: 119.444%
      letter-spacing: -(1.44/36em)

      em
        font-size: 1.11em
        font-family: Kalam, sans-serif
        font-weight: 400
        font-style: normal
        letter-spacing: -(0.8/40em)

    .feature-desc
      font-size: 16px
      line-height: 150%

      @media $mediaInXS
        font-size: 14px

    .video-part
      flex: 643
      max-width: 720px
      width: 100%
      aspect-ratio: 720/500

    .video-card
      border-radius: 16px;
      border: 1px solid var(--black-quinary, #F4F4F5);
      background: var(--white-white, #FFF);
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
      overflow: hidden
      aspect-ratio: 720/500

      img
        width: 100%
        height: 100%
        object-fit: cover

    .pin-card
      display: block

      @media (min-width: 1280px)
        transform: scale(1.1)
        transform-origin: left center

      .video-wrapper
        position relative
        width: 100%
        height: 100%

      video,
      img
        position absolute
        inset: 0
        opacity: 0
        transition: 318ms

        &.current
          opacity: 1

      @media $scrollTriggerMaxWidth
        display: none

    .mobile-card
      display: none

      @media $scrollTriggerMaxWidth
        display: block

  .feature-draw
    .feature-title

      @media (min-width: 1024px)
        width: 9em

    .underline-wrapper
      position: relative

  .svg-icon-drawing
    position: absolute

    &.draw-mark
      left: 0em
      top: -0.05em
      font-size: 2.32em

    &.ease-mark
      left: -0.1em
      top: -0.25em
      font-size: 2.38em

    &.creativity-mark
      left: -0.02em
      top: -0.25em
      font-size: (156/36em)

  .plan-lottie
    width: 70px
    margin: 0
    margin-bottom: -11px
    margin-left: 1px

    svg
      // transform: scale(1.2) !important
</style>
