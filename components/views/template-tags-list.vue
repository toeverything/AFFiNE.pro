<template lang="pug">
.template-tags-list(v-if="tags.length")
  .scroll-indicator.dir-left(
      @click="x -= 200"
      :class="{ 'is-show': x > 0 }"
    )
      nuxt-icon( name="ArrowRightSmall" )
  .scroll-indicator.dir-right(
      @click="x += 200"
    :class="{ 'is-show': !arrivedState?.right }"
  )
    nuxt-icon( name="ArrowRightSmall" )
  .tags-list.transparent-scroll.flex.gap-5(
    ref="tagListEl"
    v-if="tags?.length"
  )
    nuxt-link.tag(
      :to="`/templates`"
      :class="{ 'active': asyncOptions.isInited && !route.query.tag }"
    ) {{ $t('all') }}

    nuxt-link.tag(
      v-for="[tag] in tags"
      :key="tag"
      :class="{ 'active': asyncOptions.isInited && tag === route.query.tag }"
      :to="`/templates?tag=${encodeURIComponent(tag)}`"
      replace
    ) {{ tag }}
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const props = withDefaults(defineProps<{
  tags?: string[]
}>(), {
  tags: [] as any,
})

// @FIXME: Infinite redirect when contains query on local
const route = useRoute()
const tagListEl = ref<HTMLElement | null>(null)
const { arrivedState, x } = useScroll(tagListEl, { behavior: 'smooth' })

const asyncOptions = reactive({
  isInited: false,
})

onMounted(() => {
  asyncOptions.isInited = true
})
</script>

<style lang="stylus">
.template-tags-list
  position relative

  .scroll-indicator
    display flex
    justify-content: center
    align-items: center
    position absolute
    z-index 3
    top: 2px
    cursor pointer
    width: 24px
    height: 24px
    border-radius: 50%
    // background: var(--secondary)
    opacity: 0
    visibility hidden
    transition: 318ms

    &:before
      content: ''
      width: 44px
      height: 20px
      position absolute
      left: 0
      background: linear-gradient(90deg, #f8f8f7 60.38%, rgba(248, 248, 247, 0.00) 100%);

    &:hover
      // background: #fff

    @media $mediaInXS
      display: none

    &.is-show
      opacity: 1
      visibility inherit

    .nuxt-icon
      font-size: 24px
      position relative
      z-index 2

    &.dir-left
      left: 0

    &.dir-right
      right: 0

      &:before
        background: linear-gradient(270deg, #f8f8f7 60.38%, rgba(248, 248, 247, 0.00) 100%);
        transform: translateX(-20px)

      .nuxt-icon
        transform: rotate(180deg)

  .tags-list
    height: 46px
    margin-top: 58px
    margin-bottom: 32px
    overflow-x: auto
    padding-right: 40px

    &::-webkit-scrollbar
      display: none

    &:after
      content: ''
      position absolute
      bottom: 0px
      height: 1px
      background: #F4F4F5
      width: 100%

    .tag
      --x-padding: 12px
      --y-margin: 16px
      padding: 4px var(--x-padding)
      margin-bottom: var(--y-margin)
      flex-shrink: 0
      color: #8E8D91
      font-size: 14px;
      line-height: 20px;
      border-radius: 4px
      position relative
      transition: 218ms

      &:after
        content: ''
        position absolute
        transition: 218ms
        z-index 2
        bottom: s('calc(-1 * var(--y-margin))')
        left: var(--x-padding)
        opacity : 0
        height: 1px
        background: black
        width: s('calc(100% - var(--x-padding) * 2)')

      &:hover
        background: #f2f2f2

      &.active
        font-weight: 400;
        color: black !important

        &:after
          opacity: 1

    @media $mediaInMobile
      margin-top: 30px
      padding-bottom: 20px

    @media $mediaInXS
      padding-bottom: 0px
</style>
