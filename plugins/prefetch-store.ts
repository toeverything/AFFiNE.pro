import { primaryAPI } from '~/apis'

export default defineNuxtPlugin(async nuxtApp => {

  try {
    primaryAPI.getBlog()
    primaryAPI.getTemplates()
    if (process.client) {
      primaryAPI.getReleaseTabs()
    }
  } catch (error) {
    console.log('prefetch store error', error)
  }

})
