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
  to: string;
  onClick: () => any;
  target?: string;
  rel?: string;
  action?: string;
  params?: Record<string, string>;
}>();

const gtm = useGtm();
const mixpanel = useMixpanel();

const handleLinkClick = () => {
  if (props.onClick) {
    props.onClick();
  }
  if (!props.action) return;
  mixpanel.track(props.action, props.params);
  if (!gtm) return;
  // @TODO: Support custom dimensions
  gtm.trackEvent({
    event: props.action,
    action: 'click',
    category: props.params?.resolve || 'link',
    ...props.params,
  });
};
</script>
