import { instantiateReader } from 'affine-reader/blog';
import fs from 'fs-extra';
import stringify from 'json-stable-stringify';

import path from 'node:path';
import { rootDir } from './utils';

const reader = instantiateReader({
  workspaceId: 'gccB8ILpdX7bvgbngvoon',
  target: 'https://app.affine.pro',
});

const changelogDir = path.join(rootDir, 'content', 'changelogs');

declare module 'affine-reader/blog' {
  interface WorkspacePageContent {
    detailLink?: string;
    version?: string;
    date?: string | number;
  }

  interface WorkspacePage {
    updatedDate: number;
  }
}

function sanitizeVersion(version: string) {
  return version.replaceAll(/[\.\\\/]/g, '_');
}

async function crawlChangelogs() {
  const pages = await reader.getDocPageMetas();

  if (!pages) {
    throw new Error('No pages found');
  }

  const unvisitedFiles = new Set(await fs.readdir(changelogDir));
  const idToVersion = new Map<string, string>();

  for (const file of await fs.readdir(changelogDir)) {
    const content = await fs.readJSON(path.join(changelogDir, file), 'utf-8');
    idToVersion.set(content.id, content.version || null);
  }

  for (const [idx, page] of pages.entries()) {
    if (page.trash || !page.title) {
      continue;
    }

    // check if the file exists && file's updatedDate is newer than page's updatedDate
    let filePath = idToVersion.has(page.id) ? path.join(changelogDir, sanitizeVersion(idToVersion.get(page.id)!) + '.json') : null;
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
    if (!content || !content.version) {
      continue;
    }

    filePath ??= path.join(changelogDir, sanitizeVersion(content.version) + '.json');

    delete content.parsedBlocks;
    delete content.linkedPages;
    // @ts-ignore
    delete content.properties;

    content.date = typeof content.date === 'string' ? new Date(content.date).getTime() : content.date;

    await fs.writeFile(filePath, stringify(content, { space: '  ' }));
    console.log(`Saved ${page.id}`);

    unvisitedFiles.delete(page.id);
  }

  // remove all unvisited files
  for (const file of unvisitedFiles) {
    // await fs.remove(path.join(changelogDir, file));
    console.log(`Removed ${file}`);
  }
}

async function main() {
  await crawlChangelogs();
}

main();
