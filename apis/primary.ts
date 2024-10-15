const FOUR_HOURS = 1000 * 3600 * 4
const HALF_HOUR = 1000 * 3600 * 0.5

class PrimaryAPI {

  async getBlog() {
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

  async getTemplates() {
    const store = useStore()

    if (process.client) {
      if (store.templates.length) return store.templates
    }
    try {
      const res = await queryContent<TemplateContentFileMeta>('templates')
        .find()
      store.templates = res
      return res
    } catch (error) {
      console.log('getTemplates error', error)
    }
  }

  async getReleaseTabs() {
    const res: Release[] = await (await fetch(`${CONFIG.API_HOST}/api/worker/releases`)).json();
    const data = res
      .map(({ name, prerelease, assets, tag_name, published_at }) => {
        return {
          name,
          tag_name,
          published_at,
          prerelease,
          assets,
        };
      })
      .filter((el) => el.published_at && el.assets?.length);
    
    const latestCanary = data.find((el) => {
      return el.prerelease && el.tag_name.includes("canary");
    });
    
    const latestBeta = data.find((el) => {
      return el.prerelease && el.tag_name.includes("beta");
    });
    
    const latestStable = data.find((el) => {
      return (
        !el.prerelease &&
        !el.tag_name.includes("beta") &&
        !el.tag_name.includes("canary")
      );
    });
    
    const releaseMap = {
      canary: latestCanary,
      beta: latestBeta,
      stable: latestStable,
    };

    return releaseMap
  }

  async getChangelogs() {
    const store = useStore()

    if (process.client) {
      if (store.changelogs.length) return store.changelogs
    }
    try {
      const res = await queryContent<Changelog>('/changelogs').find()

      if (res?.length) {
        store.changelogs = res.sort(({ date: a }, { date: b }) => {
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
      console.log('getChangelogs error', error)
    }
  }

}

export const primaryAPI = new PrimaryAPI
