<template lang="pug">
.page.page-blog
  .limit-container.blog-container(
  )
    .hero-blog(
      v-loading="asyncOptions.isLoading"
    )
      blog-card.cover-blog-card(
        v-if="blogHero"
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
          :class="{ 'text-brand-grad': !route.query.tag }"
        ) {{ $t('all') }}

        nuxt-link.tag(
          v-for="[tag] in blogTags"
          :key="tag"
          :class="{ 'text-brand-grad': tag === route.query.tag }"
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
  const $currentTag = document.querySelector('.tag.text-brand-grad')
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

  .cover-blog-card
    @media $mediaInDesktop
      .blog-title
        font-size: 32px
        line-height: 39px

    .blog-tag-row
      order: 1
      margin-top: 40px

  .tags-list-wrapper
    position relative

    .scroll-indicator
      display flex
      justify-content: center
      align-items: center
      position absolute
      top: -10px
      width: 53px
      height: 53px
      border-radius: 50%
      background: var(--secondary)
      border: 2px solid var(--scroll-indicator-border-color)
      opacity: 0
      visibility hidden
      transition: 318ms

      @media $mediaInXS
        display: none

      &.is-show
        opacity: 1
        visibility inherit

      .nuxt-icon
        font-size: 33px

      &.dir-right
        right: 0
        .nuxt-icon
          transform: rotate(180deg)

  .tags-list
    padding-bottom: 24px
    border-bottom: 1px solid var(--divider-color)
    margin-top: 58px
    margin-bottom: 43px
    overflow-x: auto
    padding-right: 40px

    .tag
      padding: 10px
      flex-shrink: 0
      color: var(--primary-gray)
      font-size: 20px;
      line-height: 24px;

      &.text-brand-grad
        font-weight: 800;

    @media $mediaInMobile
      margin-top: 30px
      padding-bottom: 20px

    @media $mediaInXS
      padding-bottom: 0px
      border-bottom: 0

      .tag
        font-size: 11.7167px;
        line-height: 14px;

  .blog-list
    display: grid
    column-gap: fluid-value(16, 102, 768)
    row-gap: fluid-value(34, 68, 768)
    grid-template-columns: 1fr 1fr

    @media $mediaInXS
      grid-template-columns: 1fr
      row-gap: 80px

  /html.dark &
    --scroll-indicator-border-color: #424242

</style>
