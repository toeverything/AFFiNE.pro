import { ContentFileMeta } from '~/services/blog/resolveContentFile'

const FOUR_HOURS = 1000 * 3600 * 4

class PrimaryAPI {

  async getBlog () {
    const store = useStore()

    if (process.client) {
      if (store.blog.length) return store.blog
    }
    try {
      const res = await queryContent<ContentFileMeta>('blog')
        .find()

      if (res?.length) {
        store.blog = res.sort(({ created: a }, { created: b }) => {
          if (a === null || b === null) {
            return 0
          }
          if (a < b) {
            return 1
          }
          if (a > b) {
            return -1
          } else {
            return 0
          }
        })
      }
      return res
    } catch (error) {
      console.log('getBlog error', error)
    }
  }

  async getReleases () {
    const res = await useFetchWithCache<Release[]>('/api/releases', FOUR_HOURS)
    return res.value
  }

  async getReleaseTabs () {
    const res = await useFetchWithCache<ReleaseTab[]>('/api/release-tabs', FOUR_HOURS)
    return res.value
  }

  async getChangelogs () {
    const res = await useFetchWithCache<Changelog[]>('/api/changelogs', FOUR_HOURS)
    return res.value
  }

}

export const primaryAPI = new PrimaryAPI
