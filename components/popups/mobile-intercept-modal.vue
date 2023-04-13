<template lang="pug">
el-dialog.mobile-intercept-modal(
  v-model="store.ui.isShowMobileInterceptModal"
  :show-close="false"
  align-center
  width="100%"
)
  nuxt-icon.info-icon.mb-40px( name="LocalWorkspace" )
  .info-title.mb-2 {{ $t('useDesktopVersion.title') }}
  .info-desc {{ $t('useDesktopVersion.desc') }}

  .action-button(
    @click="store.ui.isShowMobileInterceptModal = false"
  ) {{ $t('ok') }}
</template>

<script setup lang="ts">
const store = useStore()
</script>

<style lang="stylus">
.mobile-intercept-modal
  text-align: center
  background: transparent

  .info-icon
    font-size: 63px

  .info-title
    font-weight: 800;
    font-size: 14px;
    line-height: 32px;

  .info-desc
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    white-space: pre

  // @TODO: Wrap into component
  .action-button
    padding: 10px 51px;
    gap: 10px;
    font-weight: 800;
    font-size: 15px;
    line-height: 18px;
    display: inline-flex;
    align-items: center;
    color: var(--primary-gray);
    text-align: center
    background: linear-gradient(180deg, #0E55EE 0%, #002A86 100%)
    border-radius: 44px
    text-transform: uppercase
    margin-top: 30vh
    transition: 368ms
    user-select: none

    &:active
      transform: translateY(2px)
  </style>
