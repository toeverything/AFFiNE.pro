export let __DEBUG__ = process.env.NUXT_PUBLIC_ENV === 'development'
export let __STAGING__ = process.env.NUXT_PUBLIC_ENV === 'staging'
export let __PROD__ = !__DEBUG__ && process.env.NUXT_PUBLIC_ENV === 'production'
