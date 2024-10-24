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
    .filter((meta) => (
      meta.publish &&
      meta.cover &&
      meta.title &&
      meta.md &&
      meta.slug
    ))
    .toSorted(({ updated: u0, created: c0 }, { updated: u1, created: c1 }) => {
      return (u1 || c1 || 0) - (u0 || c0 || 0);
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
