<template lang="pug">
.theme-switcher.flex.items-center
  .theme-handler.theme-auto(
    :class="{ 'is-active': mode === 'auto' }"
    @click="switchMode('auto')"
  )
    nuxt-icon( name="LocalWorkspace" )
  .theme-handler.theme-light(
    :class="{ 'is-active': mode === 'light' }"
    @click="switchMode('light')"
  )
    nuxt-icon( name="LightMode" )
  .theme-handler.theme-auto(
    :class="{ 'is-active': mode === 'dark' }"
    @click="switchMode('dark')"
  )
    nuxt-icon( name="DarkMode" )
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
const mode = useColorMode({ emitAuto: true })

type Mode = 'auto' | 'light' | 'dark'

const switchMode = (modeVal: Mode) => {
  mode.value = modeVal
}
</script>

<style lang="stylus">
.theme-switcher
  --theme-switch-bg-color: $primary10
  --theme-switch-handler-bg-color: $primary

  width: 178px
  height: 50px
  padding: 8px 10px
  background: var(--theme-switch-bg-color)
  border-radius: 18px
  justify-content: space-between

  .theme-handler
    display: flex
    justify-content: center
    align-items: center
    padding: 5px;
    gap: 10px;
    width: 34px;
    height: 34px;
    border-radius: 13px;
    cursor pointer
    color: var(--primary-gray)
    transition: 368ms

    &:not(.is-active):hover
      background: $primary10;

    &.is-active
      background: var(--primary);
      color: var(--secondary);

  .nuxt-icon
    font-size: 24px
</style>
