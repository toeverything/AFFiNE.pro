<template lang="pug">
div Home

nuxt-link( to="/blog/hello" ) Hello

.flex
  el-button( @click="toggleDark()" ) {{ isDark ? 'Dark' : 'Light' }}
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
