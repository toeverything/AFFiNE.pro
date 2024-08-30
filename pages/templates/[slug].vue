<template lang="pug">
.page.page-template-single(
  v-if="template"
)
  .overflow-hidden
    .limit-container.hero-container.narrow-container

      template-return-handler(
        @click="handleReturnClick"
      )

      template-single-hero( :meta="template" )

  template-related-list(
    title="Similar templates"
    type="template"
    :meta="template"
  )

  .limit-container.content-container
    .flex.content-row
      .template-detail.readable(
        v-html="html"
      )
      template-sidebar( :meta="template" )

  template-related-list(
    title="Learn"
    type="blog"
    :meta="template"
  )

  template-slogan-banner

</template>

<script lang="ts" setup>
import { PATH } from '~/utils/constants'
import { primaryAPI } from '~/apis'
import { renderHTML } from '~/services/blog/resolveContentFile'

const template = ref<Template>()
const html = ref('')
const store = useStore()
const route = useRoute()
const router = useRouter()
const isFromList = ref(false)

const asyncOptions = reactive({
  emptyTips: 'Template Not Found',
  errorTips: 'Template Load Error',
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
    await primaryAPI.getTemplates()
    template.value = store.templates.find(item => item.slug === route.params.slug)

    html.value = await renderHTML(template.value?.md as string)
  } catch (error) {
    console.log('Load template single error', error)
    asyncOptions.isError = true
    if (!template.value) {
      router.push(`/not-found?fromPath=${route.path}`)
    }
  }
  asyncOptions.isLoading = false
}

const handleReturnClick = () => {
  if (isFromList.value) {
    return window.history.go(-1)
  }

  router.push('/templates')
}

definePageMeta({
  // keepalive: false,
})

const pageMeta = computed(() => {
  const title = template.value?.title
    ? template.value?.title + " | AFFiNE"
    : "Templates | AFFiNE - All In One KnowledgeOS"; // should always have a title`
  const desc = template.value?.description || 'There can be more than Notion and Miro. AFFiNE is a next-gen knowledge base that brings planning, sorting and creating all together.'
  const url = `${PATH.SHARE_HOST}/templates/${template.value?.slug}`
  const image =  template.value?.cover || 'https://affine.pro/og.jpeg'

  return {
    title: template.value?.title,
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

await loadData()

useHead(pageMeta)

onMounted(() => {
  isFromList.value = store.context.lastPath === '/templates' && window.history.state.back === '/templates'
})
</script>

<style lang="stylus">
.page.page-template-single
  --section-spacing: 32px

  .narrow-container
    max-width: 1100px

  .hero-container
    padding-top: 40px
    padding-bottom: var(--section-spacing)

    @media (max-width: 1100px)
      overflow hidden

  .content-container
    max-width: 944px

  .template-single-hero
    margin-top: 32px

  .content-row
    justify-content: space-between
    gap: fv(32, 86, 744)

    @media $mediaInMobile
      flex-direction: column

    .template-detail
      flex: 673
      padding-top: fv(12, 24)

    .template-sidebar
      flex: 144
      padding-top: fv(12, 24)
      top: 80px
      position sticky
      height: fit-content

      @media $mediaInMobile
        position static
        padding-top: 0

        .section-share
          display: none
</style>
