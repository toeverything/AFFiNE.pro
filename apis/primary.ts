class PrimaryAPI {

  async getBlog () {
    const store = useStore()

    if (process.client) {
      if (store.blog.length) return store.blog
    }
    const res = await $fetch<any>('/api/blog')
    if (res.pages?.length) {
      store.blog = res.pages
    }
    return res.pages
  }

}

export const primaryAPI = new PrimaryAPI
