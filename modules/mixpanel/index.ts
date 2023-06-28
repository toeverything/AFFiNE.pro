import {defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { Config as MixpanelConfig } from 'mixpanel-browser'

// Module options TypeScript interface definition
export interface ModuleOptions extends MixpanelConfig {
  token: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mixpanel',
    configKey: 'mixpanel'
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    options = {
      token: '389c0615a69b57cca7d3fa0a4824c930',
      debug: process.env.NODE_ENV !== 'production'
    }
    nuxt.options.runtimeConfig.public.mixpanel = options

    if (!options.token) {
      console.warn('[nuxt-mixpanel]: No Mixpanel token provided. Please add it to the module options.')
    }

    addPlugin({
      src: resolver.resolve('./runtime/plugin'),
      mode: 'client'
    })

    addImports({
      name: 'useMixpanel',
      as: 'useMixpanel',
      from: resolver.resolve('./runtime/composables')
    })
  }
})
