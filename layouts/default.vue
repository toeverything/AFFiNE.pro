<template lang="pug">
.layout.default-layout
  site-header
  .fluid-container
    slot
  site-footer
</template>

<style lang="stylus">
.default-layout
  min-height: 500px

  .fluid-container
    height: 100%
    min-height: 500px
</style>
