import { Cacheables } from "cacheables"

const cache = new Cacheables({
  logTiming: true,
  log: true
})

export default async <T>(url: string) => {
  const getCacheData = () =>
    cache.cacheable(() => useFetch<T>(url), url, {
      cachePolicy: 'max-age',
      // 4 hours
      maxAge: 1000 * 3600 * 4,
    })

  const cached = cache.isCached(url)

  if (cached) {
    console.log(`Getting value from cache for ${url}`)
  }

  const { data, error } = await getCacheData()

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }

  return data
}
