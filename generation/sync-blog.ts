import { instantiateReader } from 'affine-reader/blog';
import fs from 'fs-extra';

import path from 'node:path';
import { rootDir } from './utils';

const reader = instantiateReader({
  workspaceId: 'qf73AF6vzWphbTJdN7KiX',
  target: 'https://app.affine.pro',
});

const clean = async () => {
  await fs.emptyDir(path.join(rootDir, 'content', 'blog'));
};

declare module 'affine-reader/blog' {
  interface WorkspacePageContent {
    layout?: string;
  }
}

async function crawlBlogs() {
  const pages = await reader.getDocPageMetas();

  if (!pages) {
    throw new Error('No pages found');
  }

  for (const [idx, page] of pages.entries()) {
    if (page.trash || !page.title) {
      continue;
    }

    console.log(`Crawling "${page.title}" of ${idx}/${pages.length}`);

    const content = await reader.getWorkspacePageContent(page.guid);
    if (!content || content.layout !== 'blog' || !content.publish) {
      continue;
    }
    content.slug = content.slug?.replaceAll('/', '');

    const fileDist = path.join(rootDir, 'content', 'blog', content.slug?.replaceAll('/', '') + '.json');

    delete content.parsedBlocks;
    delete content.linkedPages;
    // @ts-ignore
    delete content.properties;

    await fs.writeFile(fileDist, JSON.stringify(content, null, 2));
    console.log(`Saved ${page.id}`);
  }
}

async function main() {
  await clean();
  await crawlBlogs();
}

main();