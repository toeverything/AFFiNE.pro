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
  const tags = getTags(publishedMetas)
  let filteredMetas = query?.tag
    ? publishedMetas.filter((meta) => meta.tags?.includes(query.tag))
    : publishedMetas

  if (filteredMetas.length > 3 && filteredMetas[0] === publishedMetas[0]) {
    filteredMetas = filteredMetas.slice(1)
  }
  return { templateMetas: publishedMetas, tags, filteredMetas }
}
