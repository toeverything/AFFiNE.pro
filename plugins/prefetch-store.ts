import { primaryAPI } from '~/apis'

export default defineNuxtPlugin(nuxtApp => {

  primaryAPI.getBlog()
  primaryAPI.getReleases()

})
