<template lang="pug">
track-link.get-start-link(
  :to="PATH.AFFINE_WEB_APP"
  target="_blank"
  action="Button"
  :params="{ resolve: 'Get Started', placement: placement || 'unknown' }"
)
  el-button.app-entry-button(
    :size="size"
    type="default"
  )
    | {{ $t('getStarted') }}

.explore-on-desktop {{ $t('exploreOnDesktop') }}
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

defineProps<{
  placement?: string
  size?: string
}>()
</script>

<style lang="stylus">
.get-start-link
  display: block

  @media $mediaInMobile
    display: none

.explore-on-desktop
  display: none
  margin-top: 36px
  border-radius: 34px;
  background: var(--Black-Tertiary, #8E8D91)
  padding: 12px 52px
  color: var(--Black-Quinary, #F4F4F5);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.32px;

  @media $mediaInMobile
    display: block
</style>
