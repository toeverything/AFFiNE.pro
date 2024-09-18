import { defineEventHandler } from 'h3';
import { serverQueryContent } from '#content/server';

export default defineEventHandler(async (event) => {
  const siteURL = "https://affine.pro";
  const feedTitle = "AFFiNE AI";
  const feedDescription = "All In One KnowledgeOS";
  const feedURL = `${siteURL}/rss.xml`;

  // get the blogs
  const blogs = await serverQueryContent(event, 'blog').find();

  // i asked to make it good and this is what i got ...
  const escapeXML = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  // sorting the blogs by date
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXML(feedTitle)}</title>
        <description>${escapeXML(feedDescription)}</description>
        <link>${siteURL}</link>
        <atom:link href="${feedURL}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <ttl>60</ttl>
  `;

  // add the blog details to the rss feed
  sortedBlogs.forEach((blog) => {
    rssFeed += `
      <item>
        <title>${escapeXML(blog.title || "")}</title>
        <description><![CDATA[${escapeXML(blog.description || "")}]]></description>
        <link>${escapeXML(`${siteURL}/blog/${blog.slug}`)}</link>
        <guid>${escapeXML(`${siteURL}/blog/${blog.slug}`)}</guid>
        <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
        ${blog.cover ? `<enclosure url="${escapeXML(blog.cover)}" type="image/jpeg" />` : ""}
      </item>
    `;
  });

  rssFeed += `
      </channel>
    </rss>
  `;

  event.node.res.setHeader('Content-Type', 'application/xml');
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600');
  return rssFeed;
});
