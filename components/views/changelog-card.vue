<template lang="pug">
.changelog-card
  .sidebar-part
    .info-version {{ changelog.version }}
    .info-date {{ publishDate }}
  .main-part
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

const publishDate = useDateFormat(new Date(props.changelog.date || Date.now()), 'MMM DD, YYYY')
</script>

<style lang="stylus">
.changelog-card
  position: relative
  width: 100%

  --sidebar-width: 272px

  .sidebar-part
    margin-bottom: 32px
    padding-right: 72px

    @media (min-width: 1600px)
      text-align: right
      position: absolute
      left: 0
      transform: translateX(-100%)

    .info-version
      font-weight: 900
      font-size: fluid-value(24, 32)
      line-height: (39/32)
      margin-bottom: fluid-value(4, 21);

  .main-part

    .cover
      margin-bottom: 40px
      border-radius: 8px;
      aspect-ratio: 880/398;
      background-color: #eee

    .info-title
      font-weight: 900
      font-size: fluid-value(16, 24)
      line-height: (29/24)
      margin-bottom: 32px

    .info-desc
      font-size: fluid-value(14, 15);
      margin-bottom: 32px
      white-space: pre-line

    .view-button
      $bg = rgba(78, 63, 255, 0.7)
      background: $bg;
      border: 1px solid rgba(0, 0, 0, 0.16);
      border-radius: 28px;
      padding: 5px 15px;
      transition: 318ms
      color: white

      &:hover
        background: darken($bg, 8%)

</style>
