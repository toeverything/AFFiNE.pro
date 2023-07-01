export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const route = useRoute()
  nuxtApp.hook('app:error', (error) => {
    if (error.statusCode === 404 && error.__nuxt_error) {
      clearError()
      router.push(`/not-found?fromPath=${route.path}`)
    }
  })
})
