<template lang="pug">
.overview-open-source-everything(
  :style="{ '--scale': scale }"
)
  .inner-layer.fixed-layer
    h2.float-el.section-title.text-brand-grad {{ $t('overviewPage.openSourceTitle') }}
    .middle-content
    .float-el.section-desc.text-brand-grad( v-html="$t('overviewPage.openSourceDesc')" )
  .inner-layer.marquee-layer.transparent-scroll
    .marquee.flex(
      :style="{ '--marquee-duration': `${params.duration}s` }"
    )
      open-source-marquee-content.middle-content.marquee-content(
        :enableMarquee="enableMarquee"
        :isShowRoadmapAlterLine="isShowRoadmapAlterLine"
      )
      open-source-marquee-content.middle-content.marquee-content(
        :enableMarquee="enableMarquee"
        :isShowRoadmapAlterLine="isShowRoadmapAlterLine"
      )

t-pane( title="Overview" )
  t-folder( title="Open Source" )
    t-input( v-model="params.duration" name="marqueeDuration" :opt-params="{ min: 1, max: 100 }" )
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { isMobile } = useDevice()

const TARGET_WIDTH = 1900
const TARGET_HEIGHT = 800

const scale = ref<number>(1)
const enableMarquee = ref(false)
const isShowRoadmapAlterLine = ref(false)
const params = reactive({
  duration: 40
})

const setupScrollTrigger = () => {
  gsap.to(enableMarquee, {
    scrollTrigger: {
      start: isMobile ? "20% center" : "38% center",
      trigger: '.overview-open-source-everything',
      onEnter: () => {
        if (enableMarquee.value) return
        enableMarquee.value = true
        setTimeout(() => {
          isShowRoadmapAlterLine.value = true
        }, 1500)
      },
    },
  })
}

const reduceHeightAfterScale = () => {
  const $section = document.querySelector('.section-open-source-everything') as HTMLElement
  const $container = document.querySelector('.overview-open-source-everything') as HTMLElement
  const $marquee = document.querySelector('.marquee-layer') as HTMLElement
  if (!$section || !$container || !$marquee) return
  const marqueeHeight = $marquee.offsetHeight
  const containerHeight = $container.offsetHeight
  const sectionHeight = (containerHeight - marqueeHeight) + (marqueeHeight * scale.value)
  $section.style.setProperty('--section-height', `${sectionHeight}px`)
  ScrollTrigger.refresh()
}

const setupResize = () => {
  useResizeObserver(document.body, (entries) => {
    const width = window.innerWidth
    const height = window.innerHeight
    scale.value = Math.min(1, width/TARGET_WIDTH, height/TARGET_HEIGHT)
    scale.value = Math.max(0.4, scale.value)
    reduceHeightAfterScale()
  })
}

onMounted(() => {
  setupScrollTrigger()
  setupResize()
})
</script>

<style lang="stylus">
.overview-open-source-everything
  position relative
  padding-top: fluid-value(100, 170)
  padding-bottom: fluid-value(50, 180)

  .blur-card
    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.45) 100%)
    border: 1px solid #464646;
    backdrop-filter: blur(5px)
    border-radius: 20px
    height: 100%
    display inline-flex
    padding: 30px

  .middle-content
    height: 740px
    min-height: 600px
    // max-height: 80vh
    min-width: 100vw
    flex-shrink: 0

  .card-title
    font-weight: 800;
    font-size: fluid-value(40, 46)
    line-height: (44/36)
    background: linear-gradient(180deg, #FDFEFF 0%, #AFC9FF 100%)
    background-clip: text
    color: transparent

  .inner-layer
    --outer-padding: fluid-value(20, 159)

  .marquee-layer
    overflow-x: auto
    min-width: 100vw

    .marquee
      min-width: 100vw
      // padding-right: fluid-value(0, 69)

    .scroll-padding
      width: fluid-value(0, 69)
      flex-shrink: 0

    .middle-content
      gap: 89px

      > *
        flex-shrink: 0

    @keyframes marquee-horiz
      from
        transform: translate3d(0, 0, 0)
      to
        transform: translate3d(-100%, 0, 0)

    .marquee-content
      animation: marquee-horiz var(--marquee-duration) linear infinite;
      animation-play-state: paused
      backface-visibility hidden

      &.is-play
        will-change: transform
        animation-play-state: running

  .fixed-layer,
  .marquee
    transform: scale(var(--scale))
    transform-origin: left top

  .fixed-layer
    position absolute
    width: 100%
    pointer-events: none
    margin-left: var(--outer-padding)

    .float-el
      position absolute
      text-align: left
      white-space: pre

    .section-title
      top: 25px
      left: 32px
      font-size: 64px
      transform: translateY(-100%)

    .section-desc
      font-weight: 800;
      font-size: 36px
      line-height: (44/36)
      padding-top: 36px
      bottom: 0
      transform: translateY(100%)

      @media $mediaInXS
        padding-top: 58px

</style>
