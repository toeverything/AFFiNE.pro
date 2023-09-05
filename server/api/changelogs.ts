import { Cacheables } from 'cacheables'
import type { WorkspacePage } from 'affine-reader'
import { getBlocksuiteReader } from 'affine-reader'
import grayMatter from 'gray-matter'

const FIVE_MINUTES = 1000 * 60 * 5

const cache = new Cacheables({
  logTiming: true,
  log: true
})

let lastFetch = 0
let _pages$: Promise<Changelog[] | undefined> | null = null

const reader = getBlocksuiteReader({
  workspaceId: `gccB8ILpdX7bvgbngvoon`
})

const parseWorkspacePageMeta = async (page: WorkspacePage, reader: ReturnType<typeof getBlocksuiteReader>): Changelog  => {
  const doc = await reader.getDocMarkdown(page.guid)

  try {
    const fileMetaRaw = grayMatter(doc?.md!)
    const {
      title,
      version,
      date,
      description,
      cover,
      detailLink,
    } = fileMetaRaw.data

    return {
      title: title || null,
      description: description || null,
      version: version || null,
      date: (date instanceof Date && date.getTime()) || date || Date.now(),
      cover: cover || null,
      detailLink: detailLink || null,
    }
  } catch (error) {
    return {} as Changelog
  }
}

const getWorkspacePages = async (invalidateCache = false) => {
  if (!_pages$ || lastFetch < Date.now() - 1000 * 30 || invalidateCache) {
    const start = performance.now()
    if (lastFetch) {
      console.log(
        'Fetching changelogs again, last fetch is ' +
          (Date.now() - lastFetch) +
          'ms ago.'
      )
    }
    _pages$ = reader.getDocPageMetas().then((pages) => {
      console.log(
        'Changelogs fetched in ' + (performance.now() - start).toFixed(1) + 'ms'
      )

      let _pages = (pages
        ?.filter((p) => !p.trash)) || []

      return Promise.all(_pages.map((page) => parseWorkspacePageMeta(page, reader)))
    })
    lastFetch = Date.now()
  } else {
    console.log('Using cached pages.')
  }

  const pages = await _pages$

  return pages?.filter(p => p.title && p.date && p.version)
}

export default defineEventHandler(async (event) => {
  const getData = () =>
    cache.cacheable(() => getWorkspacePages(), `${event.node.req.url}`, {
      cachePolicy: 'max-age',
      maxAge: FIVE_MINUTES,
    })

  try {
    const list = await getData()
    return {
      list
    }
  } catch(error) {
    console.log('[API] get changelogs error', error)
    throw error
  }
})
