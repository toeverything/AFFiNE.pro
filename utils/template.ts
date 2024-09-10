import { PATH } from '~/utils/constants';

export const getTemplateCateMeta = (meta: TemplateContentFileMeta) => {
  if (!meta) return;

  const title = meta.cateTitle
    ? meta.cateTitle + ' | AFFiNE'
    : 'Templates | AFFiNE';
  const desc =
    meta.description ||
    'There can be more than Notion and Miro. AFFiNE is a next-gen knowledge base that brings planning, sorting and creating all together.';
  const url = `${PATH.SHARE_HOST}/templates/category-${meta.cateSlug}`;
  const image = meta.cover || 'https://affine.pro/og.jpeg';

  return [
    { name: 'twitter:title', content: title },
    { name: 'twitter:url', content: url },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: image },

    { name: 'description', content: desc },

    { name: 'og:title', content: title },
    { name: 'og:url', content: url },
    { name: 'og:description', content: desc },
    { name: 'og:image', content: image },
  ];
};
