import fs from "fs/promises";
import _ from "lodash";
import {
  getTemplateSnapshot,
  getTemplateWorkspacePages,
} from "./services/templates/getWorkspacePages";
import { getWorkspacePages } from "./services/blog/getWorkspacePages";
import path from "node:path";

async function checkDir(path: string) {
  try {
    if ((await fs.stat(path)).isDirectory()) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function ensureDir(path: string) {
  if (await checkDir(path)) {
    return;
  }
  await fs.mkdir(path, { recursive: true });
}

function toBlobPath(blobId: string) {
  return path.resolve(process.cwd(), `./public/blobs/${blobId}`);
}

async function blobExists(blobId: string) {
  try {
    const stat = await fs.stat(toBlobPath(blobId));
    return stat.isFile();
  } catch (error) {
    return false;
  }
}

async function ensureBlob(blobId: string) {
  if (await blobExists(blobId)) {
    return;
  }
  await ensureDir(path.dirname(toBlobPath(blobId)));
  const blob = await fetch(
    `https://app.affine.pro/api/workspaces/qf73AF6vzWphbTJdN7KiX/blobs/${blobId}`
  );
  const buffer = Buffer.from(await blob.arrayBuffer());
  // todo: encode image with higher compression
  await fs.writeFile(toBlobPath(blobId), buffer);
}

async function replaceBlobUrl(content: string) {
  // find all blob urls of https://app.affine.pro/api/workspaces/qf73AF6vzWphbTJdN7KiX/blobs/uuid
  const blobUrls = content.matchAll(
    /https:\/\/app\.affine\.pro\/api\/workspaces\/qf73AF6vzWphbTJdN7KiX\/blobs\/([A-Za-z0-9=_-]+)/g
  );
  if (!blobUrls) {
    return content;
  }
  content = content.replaceAll(
    "https://app.affine.pro/api/workspaces/qf73AF6vzWphbTJdN7KiX",
    ""
  );
  for (const blobUrl of blobUrls) {
    // check if blob exists
    const blobId = blobUrl[1];
    await ensureBlob(blobId);
  }
  return content;
}

async function syncBlogs() {
  try {
    await fs.rm("./content/blog", { recursive: true, force: true });

    const pages = ((await getWorkspacePages()) ?? []).filter(
      (page) => page.publish
    );

    if (!pages || !pages.length) {
      throw new Error("No pages");
    }

    await ensureDir("./content/blog");

    for (const [idx, page] of pages.entries()) {
      console.log(`(${idx + 1}/${pages.length}) saving ${page.id}`);
      let content = JSON.stringify(page, null, 2);
      content = await replaceBlobUrl(content);
      await fs.writeFile(`./content/blog/${page.slug}.json`, content);
    }
  } catch (error) {
    console.log("syncBlogs error", error);
    throw error;
  }
}

async function syncTemplates() {
  try {
    await fs.rm("./content/templates", { recursive: true, force: true });

    const pages = ((await getTemplateWorkspacePages()) ?? []).filter(
      (page) => page.publish
    );

    if (!pages || !pages.length) {
      throw new Error("No pages");
    }

    await ensureDir("./public/templates/snapshots");
    await ensureDir("./content/templates");

    // save template snapshots
    for (const [idx, page] of pages.entries()) {
      console.log(`(${idx + 1}/${pages.length}) saving ${page.id}`);
      let content = JSON.stringify(page, null, 2);
      content = await replaceBlobUrl(content);
      await fs.writeFile(`./content/templates/${page.slug}.json`, content);
      const zip: Blob = await getTemplateSnapshot(page.templateId);
      const buffer = Buffer.from(await zip.arrayBuffer());
      await fs.writeFile(`./public/templates/snapshots/${page.id}.zip`, buffer);
      console.log(`(${idx + 1}/${pages.length}) saved ${page.id}`);
    }
  } catch (error) {
    console.log("syncTemplates error", error);
    throw error;
  }
}

async function main() {
  // await syncBlogs();
  await syncTemplates();
  process.exit(0);
}

main();
