<template lang="pug">
.site-header
  nuxt-loading-indicator(
    :duration="3000"
    color="repeating-linear-gradient(to right,var(--brand) 0%, #3c48e6 50%, #1e96eb 100%)"
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

  @media (max-width: 800px)
    .header-navbar
      display: none

    .header-navbar-mobile
      display: block

  .new-label
    background: linear-gradient(180deg, #56B9FF 0%, #23A4FF 37.88%, #1E96EB 75%);
    box-shadow: 4px 6px 3px rgba(69, 71, 73, 0.02), 2px 4px 3px rgba(69, 71, 73, 0.08), 1px 2px 2px rgba(69, 71, 73, 0.13), 0px 0px 1px rgba(69, 71, 73, 0.15);
    border-radius: 2px;
    padding: 2px 3px;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    letter-spacing: -0.01em;
    color: white;

</style>
