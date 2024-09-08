import gulp from "gulp";
import fs from "fs/promises";
import _ from "lodash";
import {
  getTemplateSnapshot,
  getTemplateWorkspacePages,
} from "./services/templates/getWorkspacePages";

import file from "gulp-file";

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

    _.uniqBy(pages, "slug").map((page, index) => {
      return gulp
        .src("/content/*")
        .pipe(file(`${page.slug}.json`, JSON.stringify(page, null, 2)))
        .pipe(gulp.dest("./content/templates"));
    });

    // save template snapshots
    for (const page of pages) {
      const zip: Blob = await getTemplateSnapshot(page.templateId);
      const buffer = Buffer.from(await zip.arrayBuffer());
      fs.writeFile(`./public/templates/snapshots/${page.id}.zip`, buffer);
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
