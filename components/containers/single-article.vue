<template lang="pug">
.single-article
  .main-container
    nuxt-link.all-posts-handler.flex.items-center( to="/" )
      nuxt-icon( name="ArrowRightSmall" )
      | {{ $t('Home') }}

    .article-detail.readable
      slot
</template>

<style lang="stylus">
.single-article
  .main-container
    position relative
    margin-top: 16px
    padding: 0 fluid-value(16, 40)
    width: 100%
    margin: auto
    max-width: 880px

  .article-detail
    padding-top: fluid-value(28, 47, 390, 744)

    @media (max-width: 1280px)
      padding-bottom: 130px

  .all-posts-handler
    font-size: 18px;
    line-height: 22px;
    color: var(--primary-gray)
    position absolute
    white-space: nowrap
    cursor pointer
    top: 75px
    left: s('max(-17vw, -290px)')

    @media (max-width: 1280px)
      top: auto
      bottom: 50px
      left: 16px

    &:hover
      color: var(--primary)

    .nuxt-icon
      font-size: 33px
      margin-right: 33px
</style>
