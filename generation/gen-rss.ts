// credit to https://github.com/asad0206
import path from 'node:path';
import fs from 'fs-extra';

import { rootDir } from './utils';

async function main() {
  const basePath = path.join(rootDir, 'content', 'blog');
  const blogFileNames = await fs.readdir(basePath);

  // get all blogs jsons
  const blogs: ContentFileMeta[] = await Promise.all(blogFileNames.map(async (fileName) => {
    const filePath = path.join(basePath, fileName);
    const file = await fs.readFile(filePath, 'utf8');
    return JSON.parse(file);
  })
  );

  const siteURL = "https://affine.pro";
  const feedTitle = "AFFiNE AI";
  const feedDescription = "All In One KnowledgeOS";
  const feedURL = `${siteURL}/rss.xml`;

  // i asked to make it good and this is what i got ...
  const escapeXML = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  // formatting the time stamp
  const formatDate = (timestamp: number) => new Date(timestamp).toUTCString();

  // covert timestamps and sort by the most recent date
  const sortedBlogs = blogs
    .map((blog) => ({
      ...blog,
      date: formatDate(blog.updated || blog.created || Date.now()) // Use 'created' timestamp, fallback to 'createDate'
    }))
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Use template literals for better readability
  let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXML(feedTitle)}</title>
    <description>${escapeXML(feedDescription)}</description>
    <link>${siteURL}</link>
    <atom:link href="${feedURL}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    ${sortedBlogs.map((blog) => `
    <item>
      <title>${escapeXML(blog.title || "")}</title>
      <description><![CDATA[${blog.description || ""}]]></description>
      <link>${escapeXML(`${siteURL}/blog/${blog.slug}`)}</link>
      <guid isPermaLink="true">${escapeXML(`${siteURL}/blog/${blog.slug}`)}</guid>
      <pubDate>${blog.date}</pubDate>
      ${blog.cover ? `<enclosure url="${escapeXML(blog.cover)}" type="image/png" />` : ""}
    </item>
    `).join('')}
  </channel>
</rss>`;

  await fs.writeFile(path.join(rootDir, 'public', 'rss.xml'), rssFeed);
}

main();
