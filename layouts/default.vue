<template lang="pug">
.layout.default-layout
  site-header
  .fluid-container
    slot
  site-footer

  client-only
    mobile-intercept-modal
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
