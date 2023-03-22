<template lang="pug">
client-only
  svg.svg-defs
    defs
      linearGradient( :id="`brand-gradient`" x2="0" y2="100%")
        stop(
          offset="0%"
          stop-color="var(--color-stop-top)"
        )
        stop(
          offset="100%"
          stop-color="var(--color-stop-down)"
        )
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.svg-defs
  width: 0
  height: 0
  position absolute
  visibility: hidden

  #brand-gradient
    --color-stop-top: #0E55EE
    --color-stop-down: #002A86

    /html.dark &
      --color-stop-top: #6999FF
      --color-stop-down: #5438FF
</style>
