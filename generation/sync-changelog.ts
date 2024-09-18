import { instantiateReader } from 'affine-reader/blog';
import fs from 'fs-extra';
import stringify from 'json-stable-stringify';

import path from 'node:path';
import { rootDir } from './utils';

const reader = instantiateReader({
  workspaceId: 'gccB8ILpdX7bvgbngvoon',
  target: 'https://app.affine.pro',
});

const clean = async () => {
  await fs.emptyDir(path.join(rootDir, 'content', 'changelogs'));
};

declare module 'affine-reader/blog' {
  interface WorkspacePageContent {
    detailLink?: string;
    version?: string;
    date?: string | number;
  }
}

async function crawlChangelogs() {
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
    if (!content || !content.detailLink || !content.version) {
      continue;
    }

    const fileDist = path.join(rootDir, 'content', 'changelogs', content.version.replaceAll(/[\.\\\/]/g, '_') + '.json');

    delete content.parsedBlocks;
    delete content.linkedPages;
    // @ts-ignore
    delete content.properties;

    content.date = typeof content.date === 'string' ? new Date(content.date).getTime() : content.date;

    await fs.writeFile(fileDist, stringify(content, { space: '  ' }));
    console.log(`Saved ${page.id}`);
  }
}

async function main() {
  await clean();
  await crawlChangelogs();
}

main();