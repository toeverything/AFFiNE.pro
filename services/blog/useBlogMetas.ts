import type { ContentFileMeta } from './resolveContentFile'

function getTags(blogMetas: ContentFileMeta[]) {
  const tagsMap = new Map<string, number>()
  blogMetas.forEach((meta) => {
    meta.tags?.forEach((tag) => {
      if (tagsMap.has(tag)) {
        tagsMap.set(tag, tagsMap.get(tag)! + 1)
      } else {
        tagsMap.set(tag, 1)
      }
    })
  })
  return Array.from(tagsMap)
}

export const useBlogMetas = (
  blogMetas: ContentFileMeta[],
  query?: { tag: string }
) => {
  const publishedMetas = blogMetas
    .filter((meta) => meta.publish)
    .sort(({ created: a }, { created: b }) => {
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
  const tags = getTags(publishedMetas)
  let filteredMetas = query?.tag
    ? publishedMetas.filter((meta) => meta.tags?.includes(query.tag))
    : publishedMetas

  if (filteredMetas.length > 3 && filteredMetas[0] === publishedMetas[0]) {
    filteredMetas = filteredMetas.slice(1)
  }
  return { blogMetas: publishedMetas, tags, filteredMetas }
}
