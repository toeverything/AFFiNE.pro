function getTags(templateMetas: TemplateContentFileMeta[]) {
  const tagsMap = new Map<string, number>();
  templateMetas.forEach((meta) => {
    meta.tags?.forEach((tag) => {
      if (tagsMap.has(tag)) {
        tagsMap.set(tag, tagsMap.get(tag)! + 1);
      } else {
        tagsMap.set(tag, 1);
      }
    });
  });
  return Array.from(tagsMap);
}

function getCates(templateMetas: TemplateContentFileMeta[]) {
  const catesMap = new Map<string, string>();
  templateMetas.forEach((meta) => {
    const tag = meta.cateName || meta?.tags?.[0]
    if (tag) {
      catesMap.set(tag, meta.cateSlug);
    }
  });
  return Array.from(catesMap, ([title, slug]) => ({ title, slug }));
}

export const useTemplateMetas = (
  templateMetas: TemplateContentFileMeta[],
  query?: { tag: string }
) => {
  const publishedMetas = templateMetas
    .filter(
      (meta) =>
        meta.publish &&
        // meta.cover &&
        meta.title &&
        meta.md &&
        meta.slug
    )
    .toSorted(({ created: a }, { created: b }) => {
      return (b || 0) - (a || 0);
    });

  const tags = getTags(publishedMetas);
  const cates = getCates(publishedMetas);
  let filteredMetas = query?.tag
    ? publishedMetas.filter(
      (meta) => meta.tags?.includes(query.tag) || meta.cateSlug === query.tag
    )
    : publishedMetas;

  const featuredMeta = filteredMetas.find((meta) => meta.featured) || filteredMetas[0];

  filteredMetas = filteredMetas.length > 3 ? filteredMetas.filter((meta) => meta.id !== featuredMeta.id) : filteredMetas;
  return {
    templateMetas: publishedMetas,
    tags,
    cates,
    featuredMeta,
    filteredMetas,
  };
};
