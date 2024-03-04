<template lang="pug">
.changelog-card
  .sidebar-part
    .info-date {{ publishDate }}
  .main-part
    .info-version.mb-4 {{ changelog.version }}
    .card-style
      .cover(
        v-if="changelog.cover"
        :style="{ backgroundImage: `url(${changelog.cover})` }"
      )
      .info-title {{ changelog.title }}
      .info-desc( v-if="changelog.description" ) {{ changelog.description }}
      nuxt-link.view-button(
        v-if="changelog.detailLink"
        :to="changelog.detailLink"
        target="_blank"
      ) {{ $t('whatIsNewPage.viewDetail') }}

</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
  changelog: Changelog
}>()

const publishDate = useDateFormat(new Date(props.changelog.date || Date.now()), 'YYYY, MMM DD')
</script>

<style lang="stylus">
.changelog-card
  border-top: 0.5px solid #cccccc
  margin-top: 64px
  padding-top: 64px

  position: relative
  width: 100%

  --sidebar-width: 272px

  .sidebar-part
    margin-bottom: 24px
    padding-right: 72px
    font-size: 14px
    color: #000000

    @media (min-width: 1600px)
      text-align: right
      position: absolute
      left: 0
      padding-top: 4px
      transform: translateX(-100%)

  .main-part
    .card-style
      padding: 16px 16px 24px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
      border-radius: 16px;

    .info-version
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.02em;
      color: #000000;

    .cover
      margin-bottom: 16px
      border-radius: 8px;
      aspect-ratio: 880/398;
      background-color: #eee

    .info-title
      font-weight: 500
      font-size: fluid-value(20, 24)
      line-height: (32/24)
      margin-bottom: 4px
      color: #000000;
      letter-spacing: -0.02em;

    .info-desc
      font-size: fluid-value(14, 16);
      line-height: (24/16)
      color: #424149;
      white-space: pre-line
      margin-bottom: 16px

    .view-button
      $bg = rgba(0, 0, 0, 1)
      background: $bg;
      border-radius: 28px;
      padding: 8px 24px;
      font-weight: 500
      font-size: 14px
      letter-spacing: -0.01em;
      transition: 318ms
      color: white

      &:hover
        background: lighten($bg, 18%)

</style>
