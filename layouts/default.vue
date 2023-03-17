<template lang="pug">
.layout.default-layout
  site-hero-bg
  site-header
  .fluid-container
    slot
  site-footer
</template>

<style lang="stylus">
.default-layout
  min-height: 500px
  position relative
  overflow: hidden

  .fluid-container
    height: 100%
    min-height: 500px
</style>
