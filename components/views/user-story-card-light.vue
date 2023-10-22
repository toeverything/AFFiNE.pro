<template lang="pug">
hover-spotlight-card.user-story-card-light(
  ref="el"
  :light-size="150"
)
  .meta-row.flex.items-start
    .avatar(
      :style="{ backgroundImage: `url('${story.avatar}')` }"
      :class="{ 'is-default': story.avatar.includes('default') }"
    )
    .main-body
      .user-name {{ story.name }}
      .user-position {{ story.position }}
  .story-content
    Highlighter(
      :searchWords="['AFFiNE']"
      :textToHighlight="story.content"
    )
</template>

<script setup lang="ts">
import Highlighter from 'vue-highlight-words'
import { useMouseInElement } from "@vueuse/core"

defineProps<{
  story: UserStory
}>()

const el = ref<HTMLDivElement>(null)
const { elementX, elementY, stop } = useMouseInElement(el, { handleOutside: false })
const { isMobile } = useDevice()

onMounted(() => {
  if (isMobile) {
    stop()
  }
})

</script>

<style lang="stylus">
.user-story-card-light
  position: relative
  padding: 24px
  border-radius: 16px
  background: rgba(255, 255, 255, 0.1)
  border: 1px solid rgba(0, 0, 0, 0.10);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  --light-color: rgba(83, 30, 235, 0.04)
  --border: 0px

  .meta-row
    margin-bottom: fluid-value(16, 16)

  .story-content
    font-size: 13px;
    line-height: 138.462%

    mark
      background: transparent
      color: var(--brand)

  .avatar
    aspect-ratio: 1/1
    width: 42px
    margin-right: 12px
    background-size: cover
    background-position: no-repeat
    flex-shrink: 0
    border: 1px solid #eee
    border-radius: 50%

    &.is-default
      border: none

  .user-name
    color: var(--primary-deep)
    font-weight: 500
    font-size: 16px
    line-height: 1.5

  .user-position
    color: var(--primary-deep)
    font-size: 13px
    line-height: normal;
    opacity: 0.5;
    // margin-bottom: 2px
</style>
