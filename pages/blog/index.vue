<template lang="pug">
.page.page-blog
  .limit-container.blog-container(
  )
    .hero-blog(
      v-loading="asyncOptions.isLoading"
    )
      blog-card.cover-blog-card(
        v-if="blogHero"
        needMeta
        :meta="blogHero"
      )

    el-empty(
      v-if="!asyncOptions.isLoading && !blogHero"
      description="No articles"
    )

    .tags-list-wrapper(
      v-if="blogTags?.length"
    )
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
        v-if="blogTags?.length"
      )
        nuxt-link.tag(
          :to="`/blog`"
          :class="{ 'active': !route.query.tag }"
        ) {{ $t('all') }}

        nuxt-link.tag(
          v-for="[tag] in blogTags"
          :key="tag"
          :class="{ 'active': tag === route.query.tag }"
          :to="`/blog?tag=${tag}`"
        ) {{ tag }}

    .blog-list
      blog-card(
        v-for="meta in blogList"
        :key="meta.slug"
        :meta="meta"
        lazy
        needMeta
      )

    overview-slogan-banner

</template>

<script lang="ts" setup>
import { useScroll } from '@vueuse/core'
import { PATH } from '~/utils/constants'
import { primaryAPI } from '~/apis'
import { useBlogMetas } from '~/services/blog/useBlogMetas'

const store = useStore()
const route = useRoute()
const router = useRouter()
const asyncOptions = reactive({
  isLoading: true,
  isError: false
})

const loadData = async () => {
  try {
    asyncOptions.isLoading = true
    await primaryAPI.getBlog()
  } catch (error) {
    asyncOptions.isError = true
  }
  asyncOptions.isLoading = false
}

const tagListEl = ref<HTMLElement | null>(null)

const blogMetas = computed(() => useBlogMetas(store.blog, {
  tag: route.query.tag as string
}))

const blogHero = computed(() => {
  return blogMetas.value.blogMetas[0]
})

const blogList = computed(() => {
  return blogMetas.value.filteredMetas
})

const blogTags = computed(() => {
  return blogMetas.value.tags
})

const handleTagClick = (tag: string) => {
  router.push({ path: '/blog', query: { tag } })
}

watch(() => route.query.tag, async () => {
  await nextTick()
  const $currentTag = document.querySelector('.tag.active')
  if ($currentTag) {
    $currentTag.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
})

await loadData()

useHead(() => ({
  title: 'Blog',
  link: [
    { rel: 'canonical', href: `${PATH.SHARE_HOST}/blog` },
  ]
}))

definePageMeta({
  heroType: 'blog'
})

const { arrivedState, x } = useScroll(tagListEl, { behavior: 'smooth' })
</script>

<style lang="stylus">
.page.page-blog
  --scroll-indicator-border-color: #ebebeb

  .blog-container
    min-height: 50vh
    padding-top: fluid-value(24, 60)

  .blog-card
    padding: 16px 16px 24px 16px
    border-radius: 16px
    border: 1px solid rgba(0, 0, 0, 0.10)
    background: #FFF
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.08)

    .blog-tag
      border-radius: 43px
      background: #000
      color: white
      letter-spacing: 1.3px
      padding: 2px 12px
      font-size: 13px
      line-height: 20px
      font-weight: 600
      height: 24px
      margin-bottom: 16px

    .card-cover
      margin-bottom: 16px

    .blog-title
      font-size: 18px;
      font-weight: 500
      line-height: 133.333%
      letter-spacing: -0.36px
      color: black
      margin-bottom: 4px

    .blog-desc
      color: #424149
      font-size: 16px
      font-weight: 400
      line-height: 150%

  .hero-blog
    padding: fluid-value(0, 30) 0

  .cover-blog-card
    @media $mediaInDesktop
      .blog-title
        font-size: 24px
        line-height: 32px
        letter-spacing: -0.48px

    .blog-tag-row
      // order: 1
      // margin-top: 40px

  .tags-list-wrapper
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
    scrollbar-width: none

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

  .blog-list
    display: grid
    column-gap: 24px
    row-gap: 24px
    grid-template-columns: 1fr 1fr

    @media $mediaInXS
      grid-template-columns: 1fr

  /html.dark &
    --scroll-indicator-border-color: #424242

</style>
