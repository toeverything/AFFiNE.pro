<template lang="pug">
.page.page-not-found
  .section-hero
    .container.flex.flex-col
      nuxt-link.back-handler.flex.items-center( to="/" )
        nuxt-icon( name="reply" )
        | {{ $t('notFoundPage.backToHome') }}

      .page-title {{ t('notFoundPage.title') }}
      .page-desc {{ t('notFoundPage.desc') }}

      .not-found-layers
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t("notFoundPage.title"),
})
</script>

<style lang="stylus">
.page.page-not-found
  padding: fluid-value(100, 135) 20px

  .container
    --width: 370px

  .back-handler
    font-weight: 800;

    .nuxt-icon
      font-size: 30px
      margin-left: 20px
      margin-right: 18px

  .page-title
    margin-top: 8px
    margin-bottom: 8px
    font-size: 48px;
    font-weight: 800

  .page-desc
    font-size: 16px
    color: #808080

  .not-found-layers
    margin-top: 51px
    aspect-ratio: 272/181.2
    width: 76%
    background-size: contain
    background-repeat: no-repeat
    background-image: url(@/assets/error-handling/not-found-layers.png)
    filter: invert(100%)

</style>
