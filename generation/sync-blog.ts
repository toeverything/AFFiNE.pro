import { instantiateReader } from 'affine-reader/blog';
import fs from 'fs-extra';
import stringify from 'json-stable-stringify';

import path from 'node:path';
import { rootDir } from './utils';

const reader = instantiateReader({
  workspaceId: 'qf73AF6vzWphbTJdN7KiX',
  target: 'https://app.affine.pro',
});

const blogDir = path.join(rootDir, 'content', 'blog');

declare module 'affine-reader/blog' {
  interface WorkspacePageContent {
    layout?: string;
  }

  interface WorkspacePage {
    updatedDate: number;
  }
}

async function crawlBlogs() {
  const pages = await reader.getDocPageMetas();

  if (!pages) {
    throw new Error('No pages found');
  }

  const unvisitedFiles = new Set(await fs.readdir(blogDir));
  const idToSlug = new Map<string, string>();

  for (const file of await fs.readdir(blogDir)) {
    const content = await fs.readJSON(path.join(blogDir, file), 'utf-8');
    idToSlug.set(content.id, content.slug || null);
  }

  for (const [idx, page] of pages.entries()) {
    if (page.trash || !page.title) {
      continue;
    }

    // check if the file exists && file's updatedDate is newer than page's updatedDate
    let filePath = idToSlug.has(page.id) ? path.join(blogDir, idToSlug.get(page.id) + '.json') : null;
    if (filePath && (await fs.exists(filePath))) {
      const fileContent: ContentFileMeta = await fs.readJSON(filePath, 'utf-8');
      if (fileContent.updatedDate && fileContent.updatedDate === page.updatedDate) {
        console.log(`Skip "${page.title}" of ${idx}/${pages.length}`);
        unvisitedFiles.delete(page.id);
        continue;
      }
    }

    console.log(`Crawling "${page.title}" of ${idx}/${pages.length}`);

    const content = await reader.getWorkspacePageContent(page.guid);
    if (!content || !content.slug) {
      continue;
    }
    content.slug = String(content.slug)?.replaceAll('/', '');

    delete content.parsedBlocks;
    delete content.linkedPages;
    // @ts-ignore
    delete content.properties;

    filePath ??= path.join(blogDir, content.slug + '.json');

    await fs.writeFile(filePath, stringify(content, { space: '  ' }));
    console.log(`Saved ${page.id}`);
    unvisitedFiles.delete(page.id);
  }

  // remove all unvisited files
  for (const file of unvisitedFiles) {
    await fs.remove(path.join(blogDir, file));
    console.log(`Removed ${file}`);
  }
}

async function main() {
  await crawlBlogs();
}

main();