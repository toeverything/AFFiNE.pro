import { getBlocksuiteReader } from 'affine-reader'
import { ContentFileMeta, parseWorkspacePageMeta } from './resolveContentFile'

const reader = getBlocksuiteReader({
  // public workspace id for affine.pro
  workspaceId: `qf73AF6vzWphbTJdN7KiX`
})

let lastFetch = 0

let _pages$: Promise<ContentFileMeta[] | undefined> | null = null

export async function getWorkspacePages(invalidateCache = false) {
  if (!_pages$ || lastFetch < Date.now() - 1000 * 30 || invalidateCache) {
    const start = performance.now()
    if (lastFetch) {
      console.log(
        'Fetching pages again, last fetch is ' +
          (Date.now() - lastFetch) +
          'ms ago.'
      )
    }
    _pages$ = reader.getDocPageMetas().then((pages) => {
      console.log(
        'Pages fetched in ' + (performance.now() - start).toFixed(1) + 'ms'
      )
      const filteredPages = pages
        ?.filter((p) => !p.trash)
        .filter(p => p.title) || []

      return Promise.all(
        filteredPages.map((page) => parseWorkspacePageMeta(page, reader))
      )
    })
    lastFetch = Date.now()
  } else {
    console.log('Using cached pages.')
  }
  const pages = await _pages$
  return pages
}

export async function getWorkspacePage(
  slug: string,
  invalidateCache = false
): Promise<ContentFileMeta | undefined> {
  const pages = await getWorkspacePages(invalidateCache)
  const _slug = slug.toLowerCase().trim()
  let page = pages?.find((p) => p.slug === _slug || p.id === _slug)
  if (!page && !invalidateCache) {
    page = await getWorkspacePage(slug, true)
  }
  if (page) {
    return page
  }
  console.error(
    'cannot find ' + slug + 'in ',
    pages?.map((p) => p.slug)
  )
}
