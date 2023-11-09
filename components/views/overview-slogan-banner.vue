<template lang="pug">
.overview-slogan-banner
  .limit-container.flex.flex-col.items-center
    affine-logo
    h2.section-title.section-grad-title {{ $t('overviewPage.sloganBannerTitle') }}
    .flex.justify-center.gap-4.action-row
      app-entry-button( size="large" )
      stars-on-github-button(
        class="lt-sm:hidden"
        size="large"
      )
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.overview-slogan-banner
  padding-top: fluid-value(60, 60)
  padding-bottom: fluid-value(60, 100)

  .affine-logo
    font-size: 90px
    margin-bottom: 24px

  .section-title
    max-width: fluid-value(500, 730)
    margin-bottom: 36px

  .action-row
    button,
    .stars-on-github-button
      min-width: 180px

</style>
