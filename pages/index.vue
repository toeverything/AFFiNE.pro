<template lang="pug">
.page.page-home.page-overflow
  .container
    nuxt-link( to="/blog/hello" ) {{ $t('hello') }}

</template>

<script setup lang="ts">
useHead({
  titleTemplate: 'AFFiNE - All In One Workos',
  meta: [
    { name: 'twitter:title', content: 'AFFiNE - All In One Workos' },
  ]
})
</script>

<style lang="stylus">
.page-overflow
  color: $primary87
  font-size: fluid-value()

  @media $mediaInMobile
    padding-top: 10px
</style>
