<template lang="pug">
nuxt-link(
  to="/download"
)
  el-button.download-entry-button(
    :size="size"
    type="default"
  )
    | Download
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'

defineProps<{
  size?: string
}>()
</script>

<style lang="stylus">
.download-entry-button
  null
</style>
