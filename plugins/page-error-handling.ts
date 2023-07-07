export default defineNuxtPlugin(async (nuxtApp) => {
  const router = useRouter()
  const route = useRoute()

  nuxtApp.hook('app:error', (error) => {
    if (error.statusCode === 404 && error.__nuxt_error) {
      router.push(`/not-found?fromPath=${route.path}`)
      if (route.name === 'blog-slug') {
        clearError()
      }
    }
  })
})
