import { useNuxtApp } from '#app'

export function useMixpanel() {
  return useNuxtApp().$mixpanel
}
