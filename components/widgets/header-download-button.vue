<template lang="pug">
nuxt-link(
  to="/download"
)
  el-button.header-download-button(
    type="default"
  )
    | Download
</template>

<script setup lang="ts">
import { PATH } from '~/utils/constants'
</script>

<style lang="stylus">
.header-download-button
  null
</style>
