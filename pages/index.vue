<template lang="pug">
.page.page-home.page-overview
  .container
    //- nuxt-link( to="/blog/hello" ) {{ $t('hello') }}

  .section-sns
    overflow-sns

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
.page-overview
  color: $primary87
  font-size: fluid-value()

  @media $mediaInMobile
    padding-top: 10px

  .section-grad2-title
    font-weight: 800;
    font-size: fluid-value(20, 64);
    line-height: (77/64);
    background-image: linear-gradient(180deg, #0E55EE 0%, #002A86 100%);
    background-clip: text;
    color: transparent

    /html.dark &
      background-image: linear-gradient(180deg, #A8C3FF 0%, #417DFF 100%)

  .section-sns
    padding: fluid-value(60, 180) 20px
</style>
