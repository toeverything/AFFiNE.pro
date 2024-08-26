import gulp from "gulp";
import fs from "fs/promises";
import _ from "lodash";
import { getWorkspacePages } from "./services/blog/getWorkspacePages";
import { getTemplateWorkspacePages } from "./services/templates/getWorkspacePages";

import file from "gulp-file";

function cleanBlog() {
  return fs.rm("./content/blog", { recursive: true, force: true });
}
function cleanTemplates() {
  return fs.rm("./content/templates", { recursive: true, force: true });
}

async function convertBlogToMarkdowns() {
  try {
    const pages = ((await getWorkspacePages()) ?? []).filter(
      (page) => page.publish
    );

    if (!pages || !pages.length) {
      throw new Error("No pages");
    }

    _.uniqBy(pages, "slug").map((page, index) => {
      return gulp
        .src("/content/*")
        .pipe(file(`${page.slug}.json`, JSON.stringify(page, null, 2)))
        .pipe(gulp.dest("./content/blog"));
    });
  } catch (error) {
    console.log("convertBlogToMarkdowns error", error);
    throw error;
  }
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
  } catch (error) {
    console.log("convertTemplatesToMarkdowns error", error);
    throw error;
  }
}

async function main() {
  await cleanBlog();
  await cleanTemplates();
  convertTemplatesToMarkdowns();
  convertBlogToMarkdowns();
}

main();
