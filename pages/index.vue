<template lang="pug">
div Home

nuxt-link( to="/blog/hello" ) {{ $t('hello') }}

.flex
  el-button( @click="toggleDark()" ) {{ isDark ? 'Dark' : 'Light' }}

.flex
  select( v-model="locale" )
    option( v-for="item in locales" :value="item.code" ) {{ item.name }}

</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { locale, locales, setLocaleCookie } = useI18n()
const isDark = useDark()
const toggleDark = useToggle(isDark)

watch(locale, () => {
  setLocaleCookie(locale.value)
})
</script>
