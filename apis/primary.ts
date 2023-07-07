const FOUR_HOURS = 1000 * 3600 * 4

class PrimaryAPI {

  async getBlog () {
    const store = useStore()

    if (process.client) {
      if (store.blog.length) return store.blog
    }
    try {
      const res = await $fetch<any>('/api/blog')
      if (res.pages?.length) {
        store.blog = res.pages
      }
      return res.pages
    } catch (error) {
      console.log('getBlog error', error)
    }
  }

  async getReleases () {
    const res = await useFetchWithCache<Release[]>('/api/releases', FOUR_HOURS)
    return res.value
  }

  async getChangelogs () {
    const res = await useFetchWithCache<Changelog[]>('/api/changelogs', FOUR_HOURS)
    return res.value
  }

}

export const primaryAPI = new PrimaryAPI
