import { instantiateReader } from 'affine-reader/template';
import fs from 'fs-extra';

import path from 'node:path';
import { rootDir } from './utils';

const reader = instantiateReader({
  workspaceId: 'qf73AF6vzWphbTJdN7KiX',
  target: 'https://app.affine.pro',
});

const clean = async () => {
  await fs.emptyDir(path.join(rootDir, 'content', 'templates'));
};

async function crawlTemplates() {
  const pages = await reader.getDocPageMetas();

  if (!pages) {
    throw new Error('No pages found');
  }

  console.log('crawling templates...')

  const templateList = await reader.getTemplateList();

  if (!templateList) {
    throw new Error('No template list found');
  }

  const { categories } = templateList;

  for (const category of categories) {
    for (const template of category.list) {
      // @ts-ignore
      delete template.properties;
      delete template.parsedBlocks;
      delete template.linkedPages;

      const t = {
        ...template,
        cateTitle: category.title,
        cateName: category.category,
        cateSlug: category.slug,
      }

      await fs.writeFile(path.join(rootDir, 'content', 'templates', `${template.slug}.json`), JSON.stringify(t, null, 2));
      console.log(`saved ${template.slug}`)
    }
  }
}

async function main() {
  await clean();
  await crawlTemplates();
}

main();