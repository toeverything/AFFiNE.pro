<template lang="pug">
.overview-trusted-by.flex.flex-col.items-center
  .section-mini-title {{ $t('overviewPage.trustedByTitle') }}
  .logo-wall
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.overview-trusted-by
  .section-mini-title
    font-weight: 800
    font-size: fluid-value(16, 24)
    line-height: (29/24)
    margin-bottom: 8px
    text-align: center

    @media $mediaInXS
      padding: 0 30px

  .logo-wall
    margin-top: fluid-value(45, 59)
    width: 80%
    max-width: 785px
    aspect-ratio: 785/279
    background-size: contain
    background-repeat: no-repeat
    background-position: center center
    background-image: url(@/assets/overview/trusted-by-logo-wall.png)

    @media $mediaInXS
      margin-top: fluid-value(30)
      aspect-ratio: 326/112
      background-image: url(@/assets/overview/trusted-by-logo-wall-mobile.png)

</style>
