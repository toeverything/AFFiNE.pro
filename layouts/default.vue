<template lang="pug">
.layout.default-layout
  .fluid-container
    slot
</template>

<style lang="stylus">
.default-layout
  min-width: 768px
  height: 100dvh
  height: 100vh
  min-height: 500px
  overflow: hidden

  .fluid-container
    height: 100%
</style>
