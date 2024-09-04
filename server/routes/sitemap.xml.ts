import { defineEventHandler } from 'h3';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { serverQueryContent } from '#content/server';
import { useTemplateMetas } from '../../services/templates/useTemplateMetas';

export default defineEventHandler(async (event) => {
  const lastmod = '';
  const changefreq = 'daily';

  const blog = await serverQueryContent(event, 'blog').find();
  const blogArticlesRoutes = blog.map((el) => ({
    url: el._path,
    priority: 1,
  }));

  const templates = await serverQueryContent(event, 'templates').find();
  const templateMetas = useTemplateMetas(templates);
  const templateRoutes = templates.map((el) => ({
    url: el._path,
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

  const sitemapOutput = await streamToPromise(Readable.from(sitemap)).then(
    (data) => data.toString()
  );

  event.node.res.setHeader('Content-Type', 'application/xml');
  return sitemapOutput;
});
