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

  await fs.ensureDir(path.join(rootDir, 'public', 'templates', 'snapshots'));

  console.log('crawling templates...')

  const templateList = await reader.getTemplateList();

  if (!templateList) {
    throw new Error('No template list found');
  }

  const { categories } = templateList;

  for (const category of categories) {
    for (const [index, template] of category.list.entries()) {
      if (!template.templateId) {
        console.log(`no templateId for ${template.id}`);
        continue;
      }
      // @ts-ignore
      delete template.properties;
      delete template.parsedBlocks;
      delete template.linkedPages;

      const featured = index === 0;

      const snapshotUrl = `https://affine.pro/template/snapshots/${template.templateId}.zip`;

      const params = new URLSearchParams({
        workspaceId: reader.workspaceId,
        docId: template.templateId,
        pageId: template.id, // deprecated
        name: template.title || template.id,
        snapshotUrl,
      });

      const t = {
        ...template,
        featured,
        cateTitle: category.title,
        cateName: category.category,
        cateSlug: category.slug,
        intro: featured ? category.description : undefined,
        useTemplateUrl: `https://app.affine.pro/template/import?${params.toString()}`,
        previewUrl: `https://app.affine.pro/template/preview?${params.toString()}`,
      }

      const snapshotPath = path.join(rootDir, 'public', 'templates', 'snapshots', `${template.templateId}.zip`);

      const zip = await reader.getDocSnapshot(template.templateId);
      if (!zip) {
        console.log(`no snapshot for ${template.templateId}`);
        continue;
      }
      const buffer = Buffer.from(await zip.arrayBuffer());
      await fs.writeFile(snapshotPath, buffer);
      await fs.writeFile(path.join(rootDir, 'content', 'templates', `${template.slug}.json`), JSON.stringify(t, null, 2));
      console.log(`saved ${template.slug}`)
    }
  }
}

async function main() {
  await clean();
  await crawlTemplates();
  console.log('done');
  process.exit(0);
}

main();