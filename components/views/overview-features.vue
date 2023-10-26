<template lang="pug">
.overview-features( ref="el" )
  mixin writeIntro
    .intro-part
      .feature-label {{ $t('overviewPage.moduleWriteTitle') }}
      .feature-title {{ $t('overviewPage.moduleWriteSubtitle') }}
      .feature-desc {{ $t('overviewPage.moduleWriteItemA') }}
      .feature-desc {{ $t('overviewPage.moduleWriteItemB') }}
      .feature-desc {{ $t('overviewPage.moduleWriteItemC') }}

  mixin drawIntro
    .intro-part
      .feature-label {{ $t('overviewPage.moduleDrawLabel') }}
      .feature-title(v-html="$t('overviewPage.moduleDrawTitle')")
      .feature-desc {{ $t('overviewPage.moduleDrawItemA') }}
      .feature-desc {{ $t('overviewPage.moduleDrawItemB') }}
      .feature-desc {{ $t('overviewPage.moduleDrawItemC') }}

  mixin planIntro
    .intro-part
      .feature-label {{ $t('overviewPage.modulePlanLabel') }}
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

const el = ref()
const needScrollTrigger = ref(false)
const currentSection = ref('write')
const scrollProgress = ref(0)
const elIsVisible = useElementVisibility(el)

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const width = entry.target.getBoundingClientRect().width
  needScrollTrigger.value = width >= scrollTriggerBreakWidth
})

const setupScrollTrigger = () => {
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
</style>
