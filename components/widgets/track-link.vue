<template lang="pug">
nuxt-link(
  :to="to"
  :target="target"
  :rel="rel"
  @click="handleLinkClick"
)
  slot
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string,
  onClick: () => any,
  target?: string,
  rel?: string,
  action?: string,
  params?: Record<string, string>
}>()

const mixpanel = useMixpanel()

const handleLinkClick = () => {
  if (props.onClick) {
    props.onClick()
  }
  if (!props.action) return
  mixpanel.track(props.action, props.params)
}
</script>
