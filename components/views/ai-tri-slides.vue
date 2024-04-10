<template lang="pug">
.ai-tri-slides
  .full-row
    .slide-switcher-list.transparent-scroll(
      ref="switcherList"
    )
      .slide-switcher(
        v-for="(item, i) in slides"
        :class="[ `name-${item.name}`, { 'is-active': i === currentSlideIndex, 'is-next': i === nextSlideIndex } ]"
        @click="currentSlideIndex = i"
      )
        .active-bg
        .progress-bar(
          :style="{ '--progress': nextProgress }"
        )
        .content-wrapper.flex.gap-12px
          .left-part
            nuxt-icon.text-size-32px( :name="item.icon" )
          .main-part
            .info-title {{ item.title }}
            .info-desc {{ item.desc }}

  .slide-card(
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  )
    .slide-image(
      v-for="(item, i) in slides"
      :class="[ `name-${item.name}`, { 'is-active': i === currentSlideIndex } ]"
    )
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'

let autoSwitchTl: ReturnType<typeof gsap.timeline>

const switcherList = ref()
const currentSlideIndex = ref(0)
const nextSlideIndex = computed(() => {
  let index = currentSlideIndex.value + 1
  if (index >= slides.length) {
    index = 0
  }
  return index
})
const nextProgress = ref(0)

const slides = [
  { name: 'write', title: 'Write Better', desc: 'Get insight, perfect tone, summarize content, and more - all in seconds.', icon: 'SelectText' },
  { name: 'draw', title: 'Draw Faster', desc: 'Turn your ideas into images, Mind-maps for easy, impactful communication.', icon: 'Pen'  },
  { name: 'present', title: 'Present Smarter', desc: 'Generate ready-to-use presentations, one prompt at a time.', icon: 'MakeItReal'  },
]

const handleMouseenter = () => {
  autoSwitchTl?.pause()
}
const handleMouseleave = () => {
  autoSwitchTl?.resume()
}

watch(currentSlideIndex, async () => {
  autoSwitchTl.restart()

  await nextTick()
  const $currentSwitcher = document.querySelector<HTMLDivElement>('.slide-switcher.is-active')
  if ($currentSwitcher) {
    switcherList.value.scrollTo({
      left: $currentSwitcher.offsetLeft - 20,
      behavior: "smooth",
    })
    // $currentSwitcher.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
})

onMounted(() => {
  autoSwitchTl = gsap.timeline({
    defaults: {
      ease: 'none'
    },
    loop: true
  })
  autoSwitchTl.fromTo(nextProgress, { value: 0 }, {
    value: 1,
    duration: 5,
    delay: 1,
    onComplete: () => {
      currentSlideIndex.value = Math.min(currentSlideIndex.value + 1)
      if (currentSlideIndex.value >= slides.length) {
        currentSlideIndex.value = 0
      }
    }
  })
})

onUnmounted(() => {
  if (autoSwitchTl) {
    autoSwitchTl.kill()
  }
})

</script>

<style lang="stylus">
.ai-tri-slides
  margin-top: fluid-value(0, 36)

  .full-row
    margin-left: calc(-1 * var(--padding))
    margin-right: calc(-1 * var(--padding))

  .slide-switcher-list
    padding: 24px var(--padding) fluid-value(12, 24)
    overflow-y: clip
    overflow-x: auto
    display: flex
    gap: 16px

    @media(max-width: 768px)
      gap: 20px

    .slide-switcher
      position relative
      flex: 1
      background: #FFFFFF;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 12px
      min-width: 300px
      min-height 90px
      cursor pointer
      color: #424149
      overflow: hidden

      .active-bg
        position absolute
        inset: 0
        border-radius: 8px
        background-color: #1E96EB
        background-image: radial-gradient(42.44% 173.91% at 88.6% 30.98%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)
        transition: 318ms
        opacity: 0

      .progress-bar
        --progress: 0
        position absolute
        inset: 0
        opacity 0
        z-index: 2
        background-color: #1E96EB
        transform-origin: left center
        transform: scaleX(var(--progress))

      .content-wrapper
        position relative
        z-index 3

      .info-title
        font-weight: 500;
        font-size: 15px;
        line-height: (24/15)

      .info-desc
        font-size: 14px
        line-height: (22/14)

      &:not(.is-active):hover
        color: #1E96EB

        .active-bg
          opacity: 0.1

      &.is-next
        .progress-bar
          opacity: 0.1

      &.is-active
        transition: 318ms
        color: white

        .active-bg
          opacity: 1

  .slide-card
    width: 100%
    aspect-ratio: 1080/660
    border-radius: fluid-value(3, 12)
    filter: drop-shadow(20px 284px 114px rgba(0, 0, 0, 0.01)) drop-shadow(12px 160px 96px rgba(0, 0, 0, 0.05)) drop-shadow(5px 71px 71px rgba(0, 0, 0, 0.09)) drop-shadow(1px 18px 39px rgba(0, 0, 0, 0.15))
    overflow hidden
    position relative

  .slide-image
    position absolute
    width: 100%
    height: 100%
    background-size: cover
    opacity 0
    transition: 468ms
    transition-timing-function: cubic-bezier(0.25,0.46,0.45,0.94)
    transform: translateX(-8px)

    &.name-write
      background-image: url(/ai/slide-write.png)

    &.name-draw
      background-image: url(/ai/slide-draw.png)

    &.name-present
      background-image: url(/ai/slide-present.png)

    &.is-active
      opacity 1
      transform: translate3d(0px, 0px, 0px)

</style>
