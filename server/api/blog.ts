import { Cacheables } from 'cacheables'
import { getWorkspacePages } from '~/services/blog/getWorkspacePages'

const FIVE_MINUTES = 1000 * 60 * 5

const cache = new Cacheables({
  logTiming: true,
  log: true
})

export default defineEventHandler(async (event) => {
  const getData = () =>
    cache.cacheable(() => getWorkspacePages(), `${event.node.req.url}`, {
      cachePolicy: 'max-age',
      maxAge: 1,
    })

  try {
    const pages = await getData()
    return {
      pages
    }
  } catch(error) {
    console.log('[API] get blog error', error)
    throw error
  }
})
