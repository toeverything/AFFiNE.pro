import { instantiateReader } from "affine-reader/template";
import fs from "fs-extra";
import stringify from "json-stable-stringify";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { rootDir } from "./utils";

const reader = instantiateReader({
  workspaceId: "qf73AF6vzWphbTJdN7KiX",
  target: "https://app.affine.pro",
});

const clean = async () => {
  await fs.emptyDir(path.join(rootDir, "content", "templates"));
};

const R2_BUCKET = "affine-cdn";
const R2_PREFIX = "template-snapshots";

const uploadTemplateSnapshot = (() => {
  const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  return async function upload(key: string, buffer: Buffer) {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: `${R2_PREFIX}/${key}.zip`,
      Body: buffer,
      ContentType: "application/zip",
    });
    await r2.send(command);
  };
})();

async function crawlTemplates() {
  const pages = await reader.getDocPageMetas();

  if (!pages) {
    throw new Error("No pages found");
  }

  await fs.ensureDir(path.join(rootDir, "public", "templates", "snapshots"));

  console.log("crawling templates...");

  const templateList = await reader.getTemplateList();

  if (!templateList) {
    throw new Error("No template list found");
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

      const snapshotUrl = `https://cdn.affine.pro/${R2_PREFIX}/${template.templateId}.zip`;

      const params = new URLSearchParams({
        workspaceId: reader.workspaceId,
        docId: template.templateId,
        pageId: template.id, // deprecated
        name: template.title || template.id,
        mode: template.templateMode || "page",
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
      };
      const zip = await reader.getDocSnapshot(template.templateId);
      if (!zip) {
        console.log(`no snapshot for ${template.templateId}`);
        continue;
      }
      const buffer = Buffer.from(await zip.arrayBuffer());
      console.log(`uploading ${template.templateId} to ${R2_BUCKET}`);
      await uploadTemplateSnapshot(template.templateId, buffer);
      await fs.writeFile(
        path.join(rootDir, "content", "templates", `${template.slug}.json`),
        stringify(t, { space: "  " })
      );
      console.log(`saved ${template.slug}`);
    }
  }
}

async function main() {
  await clean();
  await crawlTemplates();
  console.log("done");
  process.exit(0);
}

main();
