import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import rehypeSlug from 'rehype-slug';
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'


export async function renderHTML(md: string): Promise<string> {
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, {
        allowDangerousHtml: true
      })
      .use(rehypeSlug, { prefix: 't' })
      .use(rehypePrism)
      .use(rehypeStringify, {
        allowDangerousHtml: true
      })
      .process(md)
  ).toString()

  return html
}
