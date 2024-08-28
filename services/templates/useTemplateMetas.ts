function getTags(templateMetas: Template[]) {
  const tagsMap = new Map<string, number>()
  templateMetas.forEach((meta) => {
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

function getCates(templateMetas: Template[]) {
  const catesMap = new Map<string, string>()
  templateMetas.forEach((meta) => {
    catesMap.set(meta.tags[0], meta.cateSlug)
  })
  return Array.from(catesMap, ([title, slug]) => ({ title, slug }))
}

export const useTemplateMetas = (
  templateMetas: Template[],
  query?: { tag: string }
) => {
  const publishedMetas = templateMetas
    .filter((meta) => (
      meta.publish &&
      // meta.cover &&
      meta.title &&
      meta.md &&
      meta.slug
    ))
    .sort(({ created: a, order: c }, { created: b, order: d }) => {
      if (c !== d) {
        return c - d;
      }
      return (b || 0) - (a || 0);
    })
  let featuredMeta = publishedMetas[0]

  const tags = getTags(publishedMetas)
  const cates = getCates(publishedMetas)
  let filteredMetas = query?.tag
    ? publishedMetas.filter((meta) => meta.tags?.includes(query.tag) || meta.cateSlug === query.tag)
    : publishedMetas

  if (query?.tag && filteredMetas.length > 0) {
    featuredMeta = filteredMetas[0]
  }

  if (filteredMetas.length > 3 && filteredMetas[0].id === featuredMeta.id) {
    filteredMetas = filteredMetas.slice(1)
  }
  return { templateMetas: publishedMetas, tags, cates, featuredMeta, filteredMetas }
}
