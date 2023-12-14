<template lang="pug">
track-link(
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
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

defineProps<{
  placement?: string
  size?: string
}>()
</script>

<style lang="stylus">
.app-entry-button
  null
</style>
