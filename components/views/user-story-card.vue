<template lang="pug">
.user-story-card(
  ref="el"
  :style="{ '--x': `${elementX}px`, '--y': `${elementY}px` }"
)
  .story-content {{ story.content }}
  .meta-row.flex.items-center
    .avatar(
      :style="{ backgroundImage: `url('${story.avatar}')` }"
    )
    .main-body
      .user-name {{ story.name }}
      .user-position {{ story.position }}
</template>

<script setup lang="ts">
import { useMouseInElement } from "@vueuse/core"

defineProps<{
  story: UserStory
}>()

const el = ref<HTMLDivElement>(null)
const { elementX, elementY, stop } = useMouseInElement(el)
const { isMobile } = useDevice()

onMounted(() => {
  if (isMobile) {
    stop()
  }
})

</script>

<style lang="stylus">
.user-story-card
  position: relative
  padding: fluid-value(9, 28) fluid-value(13, 36)
  border-radius: 10px
  background: rgba(255, 255, 255, 0.1)

  // Radial gradient border
  &:before
    content: ""
    pointer-events: none
    user-select: none
    position: absolute
    inset: 0px
    border-radius: inherit
    padding: 1px
    background: radial-gradient(420px circle at var(--x) var(--y), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))
    -webkit-mask: linear-gradient(black, black) content-box content-box, linear-gradient(black, black)
    -webkit-mask-composite: xor

  .story-content
    font-weight: 500
    font-size: fluid-value(10, 16)
    margin-bottom: fluid-value(10, 28)
    line-height: (24/16)

  .avatar
    aspect-ratio: 1/1
    width: fluid-value(17, 48)
    margin-right: fluid-value(6, 17)
    background-size: cover
    background-position: no-repeat
    flex-shrink: 0
    border: fluid-value(1, 2) solid white
    border-radius: 50%

  .user-name
    font-weight: 500
    font-size: fluid-value(12, 16)
    line-height: (19/16)
    margin-bottom: fluid-value(4, 10)

  .user-position
    font-weight: 500
    font-size: fluid-value(10, 14)
    line-height: (17/14)

</style>
