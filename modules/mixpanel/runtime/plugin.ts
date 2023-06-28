import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import mixpanel from 'mixpanel-browser'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.mixpanel

  console.log('init')
  mixpanel.init(config.token, config)

  return {
    provide: {
      mixpanel
    }
  }
})
