<template lang="pug">
nuxt-link(
  :to="PATH.AFFINE_INSIDER"
  target="_blank"
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
  size?: string
}>()
</script>

<style lang="stylus">
.app-entry-button
  null
</style>
