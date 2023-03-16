<template lang="pug">
a.scroll-nuxt-link(
  @click.stop="handleRootClick"
)
  slot
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
}>()

const route = useRoute()
const router = useRouter()

const handleRootClick = () => {
  if (props.to === route.path) {
    window.scrollTo({top: 0, behavior: 'smooth'})
    return
  }

  if (props.to.startsWith('http')) {
    return window.open(props.to, '_blank')
  }

  router.push(props.to)
}
</script>

<style lang="stylus">
.scroll-nuxt-link
  cursor pointer
</style>
