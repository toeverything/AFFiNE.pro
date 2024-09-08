import fs from "fs/promises";
import _ from "lodash";
import {
  getTemplateSnapshot,
  getTemplateWorkspacePages,
} from "./services/templates/getWorkspacePages";

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

function cleanTemplates() {
  return fs.rm("./content/templates", { recursive: true, force: true });
}

async function convertTemplatesToMarkdowns() {
  try {
    const pages = ((await getTemplateWorkspacePages()) ?? []).filter(
      (page) => page.publish
    );

    if (!pages || !pages.length) {
      throw new Error("No pages");
    }

    await ensureDir("./public/templates/snapshots");
    await ensureDir("./content/templates");

    // save template snapshots
    for (const page of pages) {
      const zip: Blob = await getTemplateSnapshot(page.templateId);
      await fs.writeFile(
        `./content/templates/${page.slug}.json`,
        JSON.stringify(page, null, 2)
      );
      const buffer = Buffer.from(await zip.arrayBuffer());
      await fs.writeFile(`./public/templates/snapshots/${page.id}.zip`, buffer);
    }
  } catch (error) {
    console.log("convertTemplatesToMarkdowns error", error);
    throw error;
  }
}

async function main() {
  await cleanTemplates();
  await convertTemplatesToMarkdowns();
}

main();
