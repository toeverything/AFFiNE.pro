export let __DEBUG__ = process.env.NUXT_PUBLIC_ENV === 'development'
export let __STAGING__ = process.env.NUXT_PUBLIC_ENV === 'staging'
export let __PROD__ = !__DEBUG__ && process.env.NUXT_PUBLIC_ENV === 'production'

if (process.client) {
  // @ts-ignore
  const config = window.__NUXT__.config
  const isStaging = config.public.ENV === 'staging'
  __STAGING__ = isStaging
}
