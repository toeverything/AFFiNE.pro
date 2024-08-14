<template lang="pug">
.page.page-templates
  .limit-container.template-container
    .section.section-hero
      h1.section-title Start with Template

      template-tags-list(
        :tags="templateTags"
      )
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
  .template-container
    padding-top: fv(90, 100)

  .section-hero
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


</style>
