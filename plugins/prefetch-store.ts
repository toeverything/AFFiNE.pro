import { primaryAPI } from '~/apis'

export default defineNuxtPlugin(async nuxtApp => {

  try {
    primaryAPI.getBlog()
    primaryAPI.getReleases()
  } catch (error) {
    console.log('prefetch store error', error)
  }

})
