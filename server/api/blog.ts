import { Cacheables } from 'cacheables'
import { getWorkspacePages } from '~/services/blog/getWorkspacePages'

const cache = new Cacheables({
  logTiming: true,
  log: true
})

export default defineEventHandler(async (event) => {
  const getData = () =>
    cache.cacheable(() => getWorkspacePages(), `${event.node.req.url}`, {
      cachePolicy: 'max-age',
      maxAge: 1000 * 3600 * 4,
    })

  const pages = await getData()

  return {
    pages
  }
})
