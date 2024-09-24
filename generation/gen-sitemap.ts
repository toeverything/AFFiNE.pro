import path from 'node:path';
import fs from 'fs-extra';
import { Readable } from 'node:stream';

import { SitemapStream, streamToPromise } from 'sitemap';
import xmlFormat from 'xml-formatter';

import { useTemplateMetas } from '../services/templates/useTemplateMetas';

import { rootDir } from './utils';

const contentPath = path.join(rootDir, 'content');

async function getJsons(dir: string) {
  const fileNames = await fs.readdir(dir);
  const files = await Promise.all(fileNames.map(async (fileName) => {
    const filePath = path.join(dir, fileName);
    const file = await fs.readFile(filePath, 'utf8');
    return JSON.parse(file);
  }));
  return files;
}

async function main() {
  const lastmod = '';
  const changefreq = 'daily';

  const blogs: ContentFileMeta[] = await getJsons(path.join(contentPath, 'blog'));
  const templates: TemplateContentFileMeta[] = await getJsons(path.join(contentPath, 'templates'));
  const templateMetas = useTemplateMetas(templates);

  const blogArticlesRoutes = blogs
    .toSorted((a, b) => (b.updated ?? 0) - (a.updated ?? 0))
    .map((el) => ({
      url: `blog/${el.slug}`,
      priority: 1,
    }));

  const templateRoutes = templates.map((el) => ({
    url: `templates/${el.slug}`,
    priority: 1,
  }));

  const templateCateRoutes = templateMetas.cates.map((el) => ({
    url: `templates/category-${el.slug}`,
    priority: 1,
  }));

  const dynamicRoutes = [
    { url: '/', lastmod, priority: 1 },
    { url: '/about-us', lastmod, priority: 0.8 },
    { url: '/blog', lastmod, changefreq, priority: 1 },
    { url: '/templates', lastmod, changefreq, priority: 1 },
    { url: '/pricing', lastmod, priority: 0.8 },
    { url: '/ai', lastmod, priority: 1 },
    { url: '/download', lastmod, priority: 0.8 },
    { url: '/what-is-new', lastmod, priority: 0.8 },
    // { url: '/terms', lastmod, priority: 0.8 },
    // { url: '/privacy', lastmod, priority: 0.8 },
    ...blogArticlesRoutes,
    ...templateRoutes,
    ...templateCateRoutes,
  ];

  const sitemap = new SitemapStream({ hostname: 'https://affine.pro' });

  dynamicRoutes.forEach((route) => {
    sitemap.write(route);
  });

  sitemap.end();

  const buffer = await streamToPromise(Readable.from(sitemap));
  const sitemapOutput = xmlFormat(buffer.toString(), {
    whiteSpaceAtEndOfSelfclosingTag: false,
    collapseContent: true,
  });
  await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), sitemapOutput);
}

main();
