<template lang="pug">
nuxt-link.template-hero-card(
  :to="{ path: `/templates/${meta.slug}`, meta: { source: 'list' } } "
)
  .meta-row.flex.w-full
    .cover-img.card-cover(
      :style="{ backgroundImage: `url(${meta.cover})` }"
    )
    .content-part
      h2.card-title {{ meta.title }}
      p.card-desc {{ meta.description }}
      .flex.justify-end.mt-22px.button-row
        el-button.detail-button(
          type="primary"
          size="action-rounded"
        ) Details
</template>

<script setup lang="ts">
const props = defineProps<{
  meta: Template
}>()
</script>

<style lang="stylus">
.template-hero-card
  display flex
  padding: fv(32, 62, 744) fv(26, 77, 1024)
  padding-bottom: 0
  background: linear-gradient(98.09deg, #A0E2FF 0%, #DCF0FF 100%);
  border: 3px solid #F3F3F3;
  border-radius: 8px;
  cursor pointer

  $mediaColDir = '(max-width: 800px)'

  .meta-row
    display: flex
    gap: fv(20, 70, 1000, 1280)

    @media $mediaColDir
      flex-direction: column-reverse
      align-items: center

  .content-part
    flex: 421

    @media $mediaColDir
      flex: auto

  .card-cover
    flex: 402
    border: 1px solid #F3F3F3
    border-radius: 8px 8px 0px 0px
    aspect-ratio: 402/333
    background-color: white
    background-position: top center

    @media $mediaColDir
      width: 100%
      max-width: 365px

  .card-title
    font-weight: 700;
    font-size: fv(28, 32);
    line-height: (39/32);
    letter-spacing: -0.02em;
    color: #141414;
    margin: 0

  .card-desc
    font-size: fv(12, 16);
    line-height: 1.5;
    color: #7A7A7A;
    margin-top: 13px
    multiline-overflow(7)

    @media $mediaColDir
      display: none

  .button-row
    @media $mediaColDir
      display: none
</style>
