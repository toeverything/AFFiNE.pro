import { useNuxtApp } from '#imports'

export function useMixpanel() {
  return useNuxtApp().$mixpanel
}
