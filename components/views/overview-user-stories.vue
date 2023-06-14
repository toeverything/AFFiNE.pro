<template lang="pug">
.overview-user-stories(
  :style="{ '--x': `${clampedX}px`, '--y': `${clampedY}px` }"
)
  .top-stripe
  .container.flex.flex-col.items-center
    .section-subtitle {{ $t('overviewPage.userStoriesTitle') }}
    .stories-list( ref="el" )
      .spotlight-mask
      user-story-card(
        v-for="story in stories"
        :story="story"
      )
</template>

<script setup lang="ts">
import { useScroll, useMouseInElement } from "@vueuse/core"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const stories: UserStory[] = [
  { avatar: '/user-stories/Frame 5.png', name: 'PanicN3xus', position: 'User', content: `AFFiNE is an exceptional project that elevates note-making to a whole new level. I am highly impressed by the number of features that it brings to the table. Having tried several other open-source note-making software, I can confidently say that AFFiNE is the best.` },
  { avatar: '/user-stories/Frame 7.png', name: 'Dan Charles', position: 'CEO - The Keyman Group', content: `Really impressed with how AFFiNE is able to streamline our team's workflow and improve productivity. Switch between different modes to write, draw, and plan all in one place and with data security which we are most concerned about. It makes everything easy.` },
  { avatar: '/user-stories/Frame 8.png', name: 'TinsFox', position: 'Front-end development engineer', content: `AFFiNE is by far the best open-source community I’ve come across. Open, inclusive and user-first. At the same time, AFFiNE is also a great product. Being open source means more possibilities and more exciting things can be created.` },
  { avatar: '/user-stories/Frame 6.png', name: 'Mattias', position: 'Student', content: `I've been looking for an open-source note-taking solution for ages now and AFFiNE is the first to support all the features I need -- and it even manages to do this while being absolutely beautiful! AFFiNE is very feature rich and the synchronization is also awesome.` },
  { avatar: '/user-stories/Frame 3.png', name: 'Orange-Cheng', position: 'Product manager of the TATDOD Space', content: `Extremely impressed with the quality and capabilities of AFFiNE, particularly its simple and intuitive interface. The attention to detail that has been put into every aspect of the product, from its design to its functionality, is truly exceptional. The product's innovative features and capabilities are sure to make a significant impact in the industry, providing customers with a seamless and user-friendly experience.` },
  { avatar: '/user-stories/Frame 4.png', name: 'Alice', position: 'Student from KCL', content: `One feature I particularly appreciate is the ability to seamlessly switch from typing to handwriting, adding a touch of elegance and versatility to my work.` },
  { avatar: '/user-stories/Frame 1.png', name: 'Ragma.TP', position: 'Project manager of Tiktok', content: `I'm thrilled with how effortless it was to set up workspaces, arrange pages, and collaborate with my team members in real-time. AFFiNE just makes everything easy, streamlines our workflow and boosts our productivity.` },
  { avatar: '/user-stories/Frame 2.png', name: 'Eliot', position: 'Student', content: `AFFiNE is an open source that is close to its community and filled with useful features. I use edgeless mode to connect all my knowledge to a single page.` },
]

const el = ref<HTMLDivElement>(null)
const scrollState = reactive({
  y: 0
})

const { elementX, elementY } = useMouseInElement(el)
const clampedX = computed(() => clamp(elementX.value, -300, 1500))
const clampedY = computed(() => clamp(elementY.value, -100, 1000))

onMounted(async () => {
  await nextTick()
  elementX.value = 500
  elementY.value = 200
})

</script>

<style lang="stylus">
.overview-user-stories
  --stripe-height: 67px

  margin-top: calc(var(--stripe-height) + 20px)
  position: relative
  padding-top: fluid-value(33, 131)
  padding-bottom: fluid-value(40, 260)
  background: linear-gradient(180deg, #000000 0%, #19191B 100%)

  .top-stripe
    position: absolute
    top: calc(-1 * var(--stripe-height))
    height: var(--stripe-height)
    width: 100%
    background-color: #000
    box-shadow: 0px 40px 32px rgba(255, 255, 255, 0.05)

    &:before
      content: ''
      position: absolute
      bottom: 0
      width: 100%
      opacity: 0.5
      height: 1px
      background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)

  .section-subtitle
    font-weight: 800
    font-size: fluid-value(20, 40)
    line-height: (24/20)
    margin-bottom: fluid-value(43, 95)

  .stories-list
    position: relative
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    min-height: 50vh
    max-width: 1566px
    width: 100%
    padding: 0 fluid-value(16, 50)
    column-gap: fluid-value(12, 30)
    row-gap: fluid-value(12, 108)
    grid-template-columns: repeat(auto-fill, minmax(177px, 30%))
    // @FIXME: Support on Chrome
    grid-template-rows: masonry

    @media $mediaInBigScreen
      -webkit-mask-attachment: fixed
      mask-size: 180% 230%
      mask-image: radial-gradient(50% 50% at var(--x) var(--y), #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)

    > *
      width: 30%

    @media $mediaInMobile
      display: block
      column-count: 3

      > *
        width: initial
        break-inside: avoid
        margin-bottom: fluid-value(12, 30)

    @media (max-width: 550px)
      column-count: 2

  .spotlight-mask
    position: absolute
    width: 100%
    pointer-events: none

  .container
    position: relative
</style>
