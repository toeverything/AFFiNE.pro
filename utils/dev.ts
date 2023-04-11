export let __DEBUG__ = process.env.NODE_ENV === 'development' || (process.browser && location.hostname.includes('vercel.app'))
export let __STAGING__ = process.env.NODE_ENV === 'staging'
export let __PROD__ = !__DEBUG__ && process.env.NODE_ENV === 'production'
