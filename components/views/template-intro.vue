<template lang="pug">
content-doc.template-intro.readable(
  path="/template-intro"
  :head="false"
)
</template>

<script setup lang="ts">
</script>

<style lang="stylus">
.template-intro
  margin-top: fv(24, 36)
  font-size: 15px

  p
    line-height: (24/15);

  h1, h2, h3, h4, h5, h6
    font-weight: 600;
    font-size: 22px;
    line-height: (30/22);
    margin-bottom: 12px
</style>
