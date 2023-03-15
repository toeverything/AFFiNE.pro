export let __DEBUG__ = process.env.NODE_ENV === 'development'
export let __STAGING__ = process.env.NODE_ENV === 'staging'
export let __PROD__ = !__STAGING__ && process.env.NODE_ENV === 'production'
