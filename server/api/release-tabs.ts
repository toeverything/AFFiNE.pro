import axios from 'axios'
import { __PROD__ } from '../../utils/dev'

const REQUEST_URL = 'https://affine.pro/api/worker/releases'
const PROTOCOL = __PROD__ ? 'https://' : 'http://'

import releasesIndex from '../../content/releases/index.json'

export default defineEventHandler(async (event) => {
  try {
    const tabs: ReleaseTab[] = releasesIndex.tabs
    const queryContentUrl =  `/api/_content/query`
    const releasesData = await $fetch<any>(`${queryContentUrl}?_params={"where":{"_path": { "$contains": "/releases/"} }}`)

    tabs.map((tab: ReleaseTab) => {
      const releaseMap = {
        canary: null,
        stable: null,
        beta: null,
      }

      releasesData.map((el: any) => {
        const type = el.title.toLowerCase()
        if (el._dir === tab.version) {
          releaseMap[type as keyof typeof releaseMap] = el
        }
      })

      tab.releaseMap = releaseMap
    })

    let { data } = await axios.get(REQUEST_URL)

    if (Array.isArray(data)) {
      data = data.map(({ name, prerelease, assets, tag_name, published_at }) => {
        return {
          name,
          tag_name,
          published_at,
          prerelease,
          assets
        }
      }).filter(el => el.published_at)

      const latestCanary = data.find((el: Release) => {
        return el.prerelease && el.tag_name.includes('canary')
      })

      const latestBeta = data.find((el: Release) => {
        return el.prerelease && el.tag_name.includes('beta')
      })

      const latestStable = data.find((el: Release) => {
        return !el.prerelease && !el.tag_name.includes('beta') && !el.tag_name.includes('canary')
      })

      const releaseMap = tabs[0].releaseMap

      if (latestCanary && releaseMap && (!releaseMap.canary || !releaseMap.canary.assets?.length)) {
        releaseMap.canary = latestCanary
        releaseMap.beta = latestBeta
      }
      if (latestStable && releaseMap) {
        releaseMap.stable = latestStable
      }
    }

    return tabs
  } catch(error) {
    console.log('[API] get release-tabs error', error)
    throw error
  }
})
