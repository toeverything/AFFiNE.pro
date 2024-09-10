import type { WorkspacePage } from 'affine-reader';
import { getBlocksuiteReader } from 'affine-reader';
import { Buffer as BufferPolyfill } from 'buffer';
import grayMatter from 'gray-matter';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getCoverImage, remarkRemoveCover } from './remarkCover';

declare var Buffer: typeof BufferPolyfill;
globalThis.Buffer = BufferPolyfill;

export interface ContentFileMeta {
  title: string | null;
  authors: string[] | null;
  tags: string[] | null;
  id: string;
  slug: string | null;
  cover?: string | null;
  description: string | null;
  created: number | null;
  updated: number | null;
  md: string;
  layout: string | null;
  publish?: boolean;
  html?: string;
}

export const parseWorkspacePageMeta = async (
  page: WorkspacePage,
  reader: ReturnType<typeof getBlocksuiteReader>
): Promise<ContentFileMeta> => {
  try {
    const doc = await reader.getDocMarkdown(page.guid);
    const fileMetaRaw = grayMatter(doc?.md!.trim()!);
    const {
      title,
      author,
      tags,
      publish,
      description,
      updated,
      created,
      layout,
      slug,
    } = fileMetaRaw.data;

    const coverImage = getCoverImage(remark().parse(fileMetaRaw.content));

    return {
      title: title || null,
      authors:
        (typeof author === 'string' &&
          author.split(',').map((au) => au.trim())) ||
        null,
      tags:
        (typeof tags === 'string' &&
          tags.split(',').map((tag) => tag.trim())) ||
        null,
      description: description || null,
      created: (created instanceof Date && created.getTime()) || null,
      updated: (updated instanceof Date && updated.getTime()) || null,
      layout: layout || null,
      id: page.id,
      slug: slug || page.id,
      cover: coverImage,
      md: doc?.md ?? '',
      publish: !!publish,
    };
  } catch (error) {
    return {} as ContentFileMeta;
  }
};

export async function renderHTML(
  md: string,
  needToc?: boolean
): Promise<string> {
  const { content } = grayMatter(md);
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRemoveCover)
      .use(remarkRehype, {
        allowDangerousHtml: true,
      })
      .use(rehypeSlug, { prefix: 't' })
      .use(rehypePrism)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(content)
  ).toString();

  return html;
}
