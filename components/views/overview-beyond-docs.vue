<template lang="pug">
scroll-trigger-container.overview-beyond-docs(
  ref="el"
  :height="`400vh`"
  :style="{ '--progress': scrollProgress, '--enter-progress': scrollStates.enterProgress, ...scrollStyle }"
)
  .pin-content.flex.flex-col.items-center.justify-center(
    ref="pinContent"
  )
    .grid-bg
      .grid-line
      .grid-line.is-lighter

    .middle-block
      .highlight-text-wrapper(
        v-if="locale === 'en'"
      )
        .type-pure
          | It's not just a collection of<br/>
          | <span class="word word-docs">Docs</span>, <span class="word word-whiteboard">whiteboards</span>,<br/>
          | and <span class="word word-tables">tables</span>.
        .type-gradient.text-brand-grad
          | It's not just a collection of<br/>
          | Docs, whiteboards,<br/>
          | and tables.

      .flip-image-wrapper
        .flip-image.image-docs
        .flip-image.image-whiteboard
        .flip-image.image-table

      .feature-image-wrapper
        .image-list.flex
          hover-spotlight-card
            .feature-image.image-a
          hover-spotlight-card
            .feature-image.image-b
          hover-spotlight-card
            .feature-image.image-c
          hover-spotlight-card
            .feature-image.image-d

</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const { locale } = useI18n()

const el = ref<any>(null)
const pinContent = ref<HTMLElement>()
const scrollProgress = ref(0)
const scrollStates = reactive({
  enterProgress: 1,
  textGradientProgress: 0,
  wordDocsProgress: 0,
  wordDocsEnterProgress: 0,
  wordDocsLeaveProgress: 0,
  wordWhiteboardProgress: 0,
  wordWhiteboardEnterProgress: 0,
  wordWhiteboardLeaveProgress: 0,
  wordTableProgress: 0,
  wordTableEnterProgress: 0,
  wordTableLeaveProgress: 0,
  flipDocsProgress: 0,
  flipWhiteboardProgress: 0,
  flipTableProgress: 0,
  featureImageProgress: 0,
})

const scrollStyle = computed(() => {
  return {
    '--text-gradient-alpha': scrollStates.textGradientProgress,
    '--docs-alpha': scrollStates.wordDocsProgress,
    '--docs-mask': 1 - scrollStates.wordDocsEnterProgress,
    '--docs-mask-leave': scrollStates.wordDocsLeaveProgress,
    '--whiteboard-alpha': scrollStates.wordWhiteboardProgress,
    '--whiteboard-mask': 1 - scrollStates.wordWhiteboardEnterProgress,
    '--whiteboard-mask-leave': scrollStates.wordWhiteboardLeaveProgress,
    '--table-alpha': scrollStates.wordTableProgress,
    '--table-mask': 1 - scrollStates.wordTableEnterProgress,
    '--table-mask-leave': scrollStates.wordTableLeaveProgress,
    '--flip-docs-progress': scrollStates.flipDocsProgress,
    '--flip-whiteboard-progress': scrollStates.flipWhiteboardProgress,
    '--flip-table-progress': scrollStates.flipTableProgress,
    '--feature-image-progress': scrollStates.featureImageProgress,
  }
})

const setupScrollTrigger = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el.value.$trigger,
      pin: pinContent.value,
      start: "top top",
      end: () => {
        const height = pinContent.value?.getBoundingClientRect().height
        return `bottom ${height}px`
      },
      scrub: 1
    }
  })
    // Stage: Enter
    .to(scrollStates, { enterProgress: 1, ease: 'none', duration: 0.1 })
    // Stage: Animation
    // - Word: Docs
    .to(scrollStates, { wordDocsProgress: 1, wordDocsEnterProgress: 1, ease: 'none', duration: 1 })
    .to(scrollStates, { wordDocsProgress: 0, wordDocsLeaveProgress: 1, flipDocsProgress: 1, ease: 'none', duration: 1, delay: 0.5 })
    // - Word: Whiteboard
    .to(scrollStates, { wordWhiteboardProgress: 1, wordWhiteboardEnterProgress: 1, ease: 'none', duration: 1 })
    .to(scrollStates, { wordWhiteboardProgress: 0, wordWhiteboardLeaveProgress: 1, flipWhiteboardProgress: 1, ease: 'none', duration: 1, delay: 0.5 })
    // - Word: Table
    .to(scrollStates, { wordTableProgress: 1, wordTableEnterProgress: 1, ease: 'none', duration: 1 })
    .to(scrollStates, { wordTableProgress: 0, wordTableLeaveProgress: 1, flipTableProgress: 1, ease: 'none', duration: 1, delay: 0.5 })
    // - Text Gradient
    .to(scrollStates, { textGradientProgress: 1, ease: 'none', duration: 1 })
    // - Feature Image
    .to(scrollStates, { featureImageProgress: 1, ease: 'none', duration: 2 })
    // Stage: Placeholder
    .to(scrollStates, { duration: 0.5 })
}

onMounted(() => {
  setupScrollTrigger()
})
</script>

<style lang="stylus">
.overview-beyond-docs
  .pin-content
    width: 100vw
    height: 100vh
    height: 100dvh

  .grid-bg
    position absolute
    inset: 0
    background: linear-gradient(0deg, #001136 40%, #000000 100%)
    z-index: -1
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

  .highlight-text-wrapper
    position relative
    font-weight: 900
    font-size: fluid-value(16, 48)
    line-height: (58/48)

    .word
      display inline-block
      position relative
      color: white

      &:before
        content: ''
        position absolute
        background-clip: text
        color: transparent

    .word-docs:before
      content: 'Docs'
      background-image: linear-gradient(180deg, #a4c0fd 0%, #7ea6fc 100%)
      clip-path: inset(0 calc(var(--docs-mask) * 100%) 0 calc(var(--docs-mask-leave) * 100%))

    .word-whiteboard:before
      content: 'whiteboards'
      background-image: linear-gradient(172.05deg, #7ADFFF 49.07%, #67d4f6 66.71%)
      clip-path: inset(0 calc(var(--whiteboard-mask) * 100%) 0 calc(var(--whiteboard-mask-leave) * 100%))

    .word-tables:before
      content: 'tables'
      background-image: linear-gradient(106.81deg, #AF89F5 37.47%, #a67bf5 62.22%)
      clip-path: inset(0 calc(var(--table-mask) * 100%) 0 calc(var(--table-mask-leave) * 100%))

    .type-gradient
      position absolute
      top: 0
      opacity: var(--text-gradient-alpha)

  .middle-block
    position relative
    top: -20%
    z-index: 2
    opacity: var(--enter-progress)
    transform: translateY(calc(-30% * var(--enter-progress)))

  .flip-image-wrapper
    height: 0
    z-index: -1
    position relative
    pointer-events: none

    .flip-image
      top: 4vh
      position absolute
      background-size:  contain
      opacity: 0
      transform-origin: center top
      width: 1000px
      max-width: s('min(90vh, 70vw)')
      background-repeat: no-repeat

      &.image-docs
        aspect-ratio: 1800/1096
        background-image: url(@/assets/overview/beyond-docs-flip-docs.png)
        opacity: calc(var(--docs-alpha) * var(--docs-alpha))
        transform: \
          rotate(calc(7.5deg * var(--flip-docs-progress))) \
          skewX(calc(-10deg * var(--flip-docs-progress))) \
          translateY(calc(-30% * var(--flip-docs-progress))) \

      &.image-whiteboard
        aspect-ratio: 1600/960
        background-image: url(@/assets/overview/beyond-docs-flip-whiteboard.png)
        opacity: calc(var(--whiteboard-alpha) * var(--whiteboard-alpha))
        transform: \
          rotate(calc(-11.25deg * var(--flip-whiteboard-progress))) \
          skewY(calc(10deg * var(--flip-whiteboard-progress))) \
          translateY(calc(-20% * var(--flip-whiteboard-progress))) \

      &.image-table
        width: 900px
        aspect-ratio: 1600/960
        background-image: url(@/assets/overview/beyond-docs-flip-table.png)
        opacity: calc(var(--table-alpha) * var(--table-alpha))
        transform: \
          rotate(calc(6deg * var(--flip-table-progress))) \
          skewX(calc(-10deg * var(--flip-table-progress))) \
          translateY(calc(-20% * var(--flip-table-progress))) \

  .feature-image-wrapper
    position relative
    height: 0
    opacity: var(--text-gradient-alpha)

    .image-list
      --gap: fluid-value(40, 80)
      display: flex
      position absolute
      margin-top: 5vh
      gap: var(--gap)
      transform: \
        translateX(calc((1 - var(--text-gradient-alpha)) * 0%)) \
        translateX(calc((-75% - var(--gap) * 0.75) * var(--feature-image-progress)))

      > *
        inset: 0
        aspect-ratio: 600/700
        width: 600px
        max-width: 40vh

      .feature-image
        background-size: contain
        width: 100%
        height: 100%

        &.image-a
          background-image: url(@/assets/overview/beyond-docs-feature-a.png)

        &.image-b
          background-image: url(@/assets/overview/beyond-docs-feature-b.png)

        &.image-c
          background-image: url(@/assets/overview/beyond-docs-feature-c.png)
          left: 200%

        &.image-d
          background-image: url(@/assets/overview/beyond-docs-feature-d.png)
          left: 300%

</style>
