<template lang="pug">
.template-intro.readable(
  v-html="html"
)
</template>

<script setup lang="ts">
import { renderHTML } from '~/services/blog/renderHTML'

const props = defineProps<{
  md: string
}>()

const html = ref('')

const updateHtml = async () => {
  html.value = await renderHTML(props.md)
}

watch(() => props.md, () => {
  updateHtml()
})

await updateHtml()
</script>

<style lang="stylus">
.template-intro
  margin-top: fv(24, 36)
  font-size: 15px

  p
    line-height: (24/15);

  h1, h2, h3, h4, h5, h6
    font-weight: 600;
    font-size: 22px;
    line-height: (30/22);
    margin-bottom: 12px
</style>
