<template lang="pug">
.template-single-hero
  .main-part
    h1.hero-title {{ meta.title }}
    p.hero-desc {{ meta.description }}
    .actions-row.flex.items-center.gap-3
      track-link(
        :to="meta.useTemplateUrl"
        target="_blank"
        action="Use_Template_Clicked"
      )
        el-button(
          size="medium"
          type="primary"
        ) Use this template
      track-link(
        :to="meta.previewUrl"
        action="Preview_Clicked"
        target="_blank"
      )
        el-button(
          size="medium"
          type="secondary"
        ) Preview
    template-share.mt-30px( :meta="meta" )

  .cover-part
    .image-mask
    img.cover-img(
      :alt="meta.coverAlt"
      :src="meta.cover"
    )
</template>

<script setup lang="ts">
const props = defineProps<{
  meta: Template
}>()
</script>

<style lang="stylus">
.template-single-hero
  --hero-min-height: 490px
  --main-part-width: 347px

  $mediaInPhone = '(max-width: 600px)'

  position relative
  min-height: var(--hero-min-height)
  display: flex
  align-items: flex-end

  @media $mediaInPhone
    padding-top: 10px
    flex-direction: column
    align-items: flex-start
    --hero-min-height: 654px

  .main-part
    position relative
    z-index 4
    padding: 0
    padding-bottom: 48px
    max-width: var(--main-part-width)

  .hero-title
    font-weight: 700;
    font-size: fv(32, 36);
    line-height: (44/36);
    color: #141414;
    margin: 0

  .hero-desc
    font-size: fv(14, 15);
    line-height: 1.6;
    color: #7A7A7A;
    margin-top: 13px
    multiline-overflow(6)

  .cover-part
    position absolute
    left: 360px
    bottom: 0
    width: percentage(800/1086)
    min-width: 700px

    @media $mediaInPhone
      left: 0
      min-width: 530px
      width: 100%
      bottom: -10px

    .image-mask
      position absolute
      background: linear-gradient(181.1deg, rgba(248, 248, 247, 0) 0.94%, #F8F8F7 36.68%);
      width: 200%
      left: -50%;
      z-index: 2;
      height: 328px;
      bottom: -20%;

      @media $mediaInPhone
        height: 200px

    .cover-img
      background-position: top center
      width: 100%
      aspect-ratio: 766/491
      border: 1px solid #E6E6E6;
      background-color: white;
      border-radius: 8px;
      transform: matrix(0.99, 0.16, -0.41, 0.91, 0, 0);
      object-fit: cover
      object-position: top center

  .template-share
    display: none

    @media $mediaInMobile
      display: flex

    @media $mediaInPhone
      position absolute
      top: calc(var(--hero-min-height) - 34px)

</style>
