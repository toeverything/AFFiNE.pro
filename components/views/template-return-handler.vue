<template lang="pug">
.template-return-handler.flex.items-center
  .icon-circle-wrapper.flex.items-center.justify-center
    nuxt-icon( name="ArrowRightSmall" )
  | Template Gallery
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.template-return-handler
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  line-height: normal;
  letter-spacing: -0.32px;
  color: black
  white-space: nowrap
  cursor pointer
  transition: 318ms
  gap: 10px

  &:hover
    color: var(--brand)

  .icon-circle-wrapper
    width: 32px
    height: 32px
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15)

  .nuxt-icon
    font-size: 20px
</style>
