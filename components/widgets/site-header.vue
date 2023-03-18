<template lang="pug">
.site-header
  nuxt-loading-indicator(
    color="repeating-linear-gradient(to right,var(--brand) 0%, #002A86 50%,#0047e1 100%)"
  )
  header-navbar(
    :y="scrollState.y"
  )
  header-navbar-mobile(
    :y="scrollState.y"
  )
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'

let scrollState = reactive({
  y: 0
})

onMounted(() => {
  listenToScroll()
})

const listenToScroll = () => {
  const { y } = useScroll(document)
  watch(y, () => {
    scrollState.y = y.value
  })
}
</script>

<style lang="stylus">
.site-header
  position relative
  // background: $secondary100
  z-index: $zIndexHeader

  .header-navbar-mobile
    display: none

  @media (max-width: 1280px)
    .header-navbar
      display: none

    .header-navbar-mobile
      display: block
</style>
