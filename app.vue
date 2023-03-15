<template lang="pug">
.app
  el-config-provider( :locale="locale" )
    nuxt-layout( keepalive )
      nuxt-page
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'

import en from 'element-plus/lib/locale/lang/en'

import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '~/styles/main.styl'

const locale = ref(en)
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap')

body
  margin: 0
  font-family: "Inter", "Roboto", "Helvetica", "Arial", sans-serif
  background: $secondary100
  font-size: 1rem
  line-height: 1.5
  letter-spacing: 0.00938em

a
  text-decoration: none
  color: inherit

*, :before, :after
  box-sizing: border-box

// Common
.nuxt-icon svg
  margin: 0 !important

// Page
.page
  height: 100%
  display: flex
  flex-direction: column

  &-header
    min-height: 146px
    // background: #fafafa
    background: white
    padding: 24px 32px
    border-bottom: 1px solid var(--divider-color)
  &-content,
  &-container
    display: flex
    width: 100%
    // height: 100%
    overflow: hidden
    margin: 0 auto
    flex: 1
    // overflow-y: auto
  .is-scrollable
    overflow-y: auto
    height: 100%
    width: 100%
    padding-bottom: 44px

  &-content-main
    flex: 1
    padding-left: 44px
    padding-right: 44px
    padding-top: 44px
    padding-bottom: 60px
    min-height: 100%
    overflow-y: auto;

  &-container
    padding-top: 0
    padding-bottom: 0
    width: 100%

  &-title
    // font-weight: 500
    font-size: 36px
    margin-bottom: 10px

  // Form
  .input-title
    .el-input__wrapper
      box-shadow: none
      padding: 0
      font-weight: 700;
      font-size: 24px;

    .el-input__inner
      color: black

  .el-textarea__inner
    font-size: 16px
    line-height: 24px
    color: black
    padding: 12px 16px

  .input-content

    &.el-textarea.is-disabled
      .el-textarea__inner
        background: none

    .el-textarea__inner
      box-shadow: none
      padding: 0

  // Actions
  .round-icon-button
    border: none
    padding: 0
    font-size: 32px
    width: 32px
    height: 32px
</style>
