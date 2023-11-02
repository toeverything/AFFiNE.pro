<template lang="pug">
.page.page-blog-article(
)
  async-container(
    v-bind="asyncOptions"
    :hasContent="article"
  )
    .jumbotron-container
      h1.article-title {{ article.title }}
      .article-desc( v-if="article.description" ) {{ article.description }}

    .main-container
      .all-posts-handler.flex.items-center( @click="handleReturnClick" )
        nuxt-icon( name="ArrowRightSmall" )
        | {{ $t('allPosts') }}
      nuxt-img.article-cover.mb-28px(
        v-if="article.cover"
        format="webp"
        width="1600"
        height="800"
        :src="article.cover"
      )
      .article-tag-row.flex.gap-4
        .article-tag( v-for="tag in article.tags" ) {{ tag }}

      .users-row.flex.flex-wrap.items-center.gap-20px( v-if="users && users.length" )
        .user-meta.flex.items-center(
          v-for="user in users"
        )
          template( v-if="user" )
            .user-avatar.mr-3(
              v-if="user.avatar"
              :style="{ backgroundImage: `url(${user.avatar})` }"
            )
            .user-name {{ user.name }}

      .updated-info.mt-15px Updated: {{ publishDate }}

      .article-detail.readable(
        v-html="html"
      )
</template>

<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { PATH } from '~/utils/constants'
import { primaryAPI } from '~/apis'
import { USER_MAP } from '~/services/blog/userMap'
import { renderHTML } from '~/services/blog/resolveContentFile'
import type { ContentFileMeta } from '~/services/blog/resolveContentFile'

const article = ref<ContentFileMeta>()
const html = ref('')
const store = useStore()
const route = useRoute()
const router = useRouter()
const isFromList = ref(false)

const asyncOptions = reactive({
  emptyTips: 'Article Not Found',
  errorTips: 'Article Load Error',
  errorActionText: 'Back to Home',
  onErrorAction: () => {
    router.push('/')
  },
  isLoading: true,
  isError: false
})

const loadData = async () => {
  try {
    asyncOptions.isError = false
    asyncOptions.isLoading = true
    await primaryAPI.getBlog()
    article.value = store.blog.find(item => item.slug === route.params.slug)
    html.value = await renderHTML(article.value?.md as string)
  } catch (error) {
    console.log('Load blog articles error', error)
    asyncOptions.isError = true
    if (!article.value) {
      // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
      router.push(`/not-found?fromPath=${route.path}`)
    }
  }
  asyncOptions.isLoading = false
}

const users = computed(() => {
  return article.value?.authors?.map(user => USER_MAP[user])
})

const publishDate = useDateFormat(computed(() => new Date(article.value?.updated || Date.now())), 'MM/DD/YYYY')

const pageMeta = computed(() => {

  const title = article.value?.title
    ? article.value?.title + " | AFFiNE"
    : "Blog | AFFiNE - All In One KnowledgeOS"; // should always have a title`
  const desc = article.value?.description || 'There can be more than Notion and Miro. AFFiNE is a next-gen knowledge base that brings planning, sorting and creating all together.'
  const url = `${PATH.SHARE_HOST}/blog/${article.value?.slug}`
  const image =  article.value?.cover || 'https://affine.pro/og.jpeg'

  return {
    title: article.value?.title,
    meta: [
      { name: 'twitter:title', content: title },
      { name: 'twitter:url', content: url },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image },

      { name: 'og:title', content: title },
      { name: 'og:url', content: url },
      { name: 'og:description', content: desc },
      { name: 'og:image', content: image },
    ]
  }
})

definePageMeta({
  keepalive: false,
  heroType: 'blog'
})

await loadData()

useHead(pageMeta)

onMounted(() => {
  isFromList.value = store.context.lastPath === '/blog' && window.history.state.back === '/blog'
})

const handleReturnClick = () => {
  if (isFromList.value) {
    return window.history.go(-1)
  }

  router.push('/blog')
}

</script>

<style lang="stylus">
.page.page-blog-article
  min-height: 10vh
  --tag-color: var(--brand)
  --tag-bg-color: #fff

  .jumbotron-container
    width: 100%
    margin: auto
    max-width: 1380px
    padding: fluid-value(34, 64) fluid-value(16, 64)
    text-align: center

    .article-title
      font-weight: 800
      font-size: fluid-value(20, 54)
      line-height: 58/48
      margin: 0
      margin-bottom: 10px

    .article-desc
      padding: 0 64px
      color: var(--primary-gray)
      font-weight: 500
      font-size: fluid-value(14, 24)
      line-height: 1

      @media $mediaInXS
        padding: 0px

  .main-container
    position relative
    margin-top: 16px
    padding: 0 fluid-value(16, 40)
    width: 100%
    margin: auto
    max-width: 880px

  .article-tag
    border-radius: 8px
    padding: 5px 15px
    font-weight: 500
    font-size: 14px
    line-height: 17px
    background: var(--tag-bg-color)
    color: var(--tag-color)

  .article-cover
    width: 100%
    aspect-ratio: 800/400
    object-fit: cover
    object-position: center
    vertical-align: middle
    height: auto !important
    background: var(--el-fill-color-light)

  .users-row
    margin-top: 15px

    .user-name
      font-weight: 700
      font-size: 14px
      line-height: 17px

    .user-avatar
      width: 32px
      height: 32px
      background-size: cover
      background-position: center center
      border-radius: 50%

  .updated-info
    color: var(--primary-gray)
    font-weight: 500
    font-size: 14px
    line-height: 17px

  .article-detail
    padding-top: fluid-value(28, 47, 390, 744)

    @media (max-width: 1280px)
      padding-bottom: 130px

  .all-posts-handler
    font-size: 18px;
    line-height: 22px;
    color: var(--primary-gray)
    position absolute
    white-space: nowrap
    cursor pointer
    top: 15px
    left: s('max(-17vw, -290px)')

    @media (max-width: 1280px)
      top: auto
      bottom: 50px
      left: 16px

    &:hover
      color: var(--primary)

    .nuxt-icon
      font-size: 33px
      margin-right: 33px

  .async-container
    .el-empty
      margin-top: 10vh

  /html.dark &
    --tag-color: #E6E6E6
    --tag-bg-color: rgba(249, 249, 249, 0.3)

</style>
