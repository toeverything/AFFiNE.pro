<template lang="pug">
.template-sidebar
  .sidebar-section.section-share
    .sidebar-title Share
    template-share( :meta="meta" )
  .sidebar-section.section-tags( v-if="tags.length" )
    .sidebar-title Categories
    .tags.flex.flex-col.items-start.gap-8px
      nuxt-link.tag(
        v-for="tag in tags"
        :to="`/templates/category-${encodeURIComponent(meta.cateSlug || tag)}`"
      ) {{ tag }}
</template>

<script setup lang="ts">
const props = defineProps<{
  meta: Template;
}>();

const tags = computed(() => props.meta.tags);
</script>

<style lang="stylus">
.template-sidebar
  .sidebar-title
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #141414;
    margin-bottom: 12px

  .sidebar-section
    margin-bottom: 20px

  .tag
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid #E6E6E6;
    border-radius: 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    transition: 0.3s
    color: #141414;

    &:hover
      background: rgba(0,0,0,0.04)
</style>
