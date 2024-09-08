import fs from "fs/promises";
import _ from "lodash";
import {
  getTemplateSnapshot,
  getTemplateWorkspacePages,
} from "./services/templates/getWorkspacePages";
import { getWorkspacePages } from "./services/blog/getWorkspacePages";

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
      await fs.writeFile(
        `./content/blog/${page.slug}.json`,
        JSON.stringify(page, null, 2)
      );
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
      await fs.writeFile(
        `./content/templates/${page.slug}.json`,
        JSON.stringify(page, null, 2)
      );
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
  await syncBlogs();
  await syncTemplates();
  process.exit(0);
}

main();
