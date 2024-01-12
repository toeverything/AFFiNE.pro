import { Cacheables } from 'cacheables'
import { getWorkspacePages } from '~/services/blog/getWorkspacePages'

const FIVE_MINUTES = 1000 * 60 * 5

const cache = new Cacheables({
  logTiming: true,
  log: true
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { token } = getQuery(event)

  if (!token || config.apiToken !== token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid token'
    })
  }

  console.log('[API] get blog from referrer', event.node.req.headers.referer)
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
