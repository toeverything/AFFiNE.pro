<template lang="pug">
.template-related-list(
  v-if="list.length"
)
  .title-row.flex( v-if="title" )
    .left-spacer
    h4.title {{ title }}

  .scrollable.is-x
    .flex
      .left-spacer
      .flex.list-content
        template-card(
          v-for="item in list"
          :key="item.slug"
          :meta="item"
          :type="type"
        )
      .right-spacer

</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  type: 'template' | 'blog';
  meta: TemplateContentFileMeta;
}>();

const store = useStore();
const isBlog = props.type === 'blog';

const list = computed(() => {
  const slugs = isBlog ? props.meta.relatedBlogs : props.meta.relatedTemplates;
  const list = isBlog ? store.blog : store.templates;

  if (!slugs) return [];

  return slugs
    .map((slug) => list.find((item) => item.slug === slug.replace('/', '')))
    .filter((el) => el);
});
</script>

<style lang="stylus">
.template-related-list
  position relative
  z-index 2
  margin-bottom: 42px
  --width: 880px

  .title
    font-weight: 600;
    font-size: 18px;
    line-height: 1.44;
    color: #141414;
    margin-bottom: 24px

  .scrollable
    overflow-x: auto

  .list-content
    gap: fluid-value(24, 69, 744, 1200)

    > *
      flex-shrink: 0
      width: 255px

  .right-spacer
    width: fluid-value(32, 200, 744, 1920)
    flex-shrink: 0

  .left-spacer
    flex-shrink: 0
    width: calc((100vw - var(--width)) / 2)
    min-width: 32px

    @media (max-width: 480px)
      min-width: 20px
</style>
