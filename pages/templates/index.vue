<template lang="pug">
.page.page-templates
  .section.section-hero
    .limit-container
      h1.section-title Start with Template

      template-tags-list(
        :tags="templateTags"
      )

    .limit-container.narrow-container
      template-hero-card(
        :meta="templateHero"
      )

  .section.section-main
    .limit-container.narrow-container
      .template-list
        template-card(
          v-for="meta in templateList"
          :key="meta.slug"
          :meta="meta"
        )

      template-intro
</template>

<script lang="ts" setup>
import { primaryAPI } from '~/apis'
import { useTemplateMetas } from '~/services/templates/useTemplateMetas'

const store = useStore()
const route = useRoute()
const asyncOptions = reactive({
  isLoading: true,
  isError: false,
  isInited: false,
})

const loadData = async () => {
  try {
    asyncOptions.isLoading = true
    await primaryAPI.getTemplates()
  } catch (error) {
    asyncOptions.isError = true
  }
  asyncOptions.isLoading = false
}

const templateMetas = computed(() => useTemplateMetas(store.templates, {
  tag: route.query.tag as string
}))

const templateHero = computed(() => {
  return templateMetas.value.templateMetas[0]
})

const templateList = computed(() => {
  return templateMetas.value.filteredMetas
})

const templateTags = computed(() => {
  return templateMetas.value.tags
})

await loadData()

useHead({
  title: 'Templates',
});
</script>

<style lang="stylus">
.page.page-templates
  padding-top: fv(60, 100)

  .narrow-container
    max-width: 1100px

  .section-hero
    margin-bottom: fv(4, 20)

    .section-title
      font-weight: 500;
      font-size: fv(36, 60);
      line-height: (65/60);
      letter-spacing: -0.05em;
      background: linear-gradient(91.4deg, #474747 20.12%, #000000 55.27%, #474747 82.61%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      margin-bottom: fv(32, 36)

  .template-list
    display: grid
    column-gap: fv(24, 32)
    row-gap: fv(24, 32)
    grid-template-columns: 1fr 1fr 1fr

    @media (max-width: 920px)
      grid-template-columns: 1fr 1fr

    @media $mediaInXS
      grid-template-columns: 1fr
</style>
