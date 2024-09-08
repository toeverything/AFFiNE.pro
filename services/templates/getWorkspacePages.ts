import * as reader from "affine-reader/template";

type WorkspacePage = reader.WorkspacePage;

export const templateReader = reader.instantiateReader({
  workspaceId: "qf73AF6vzWphbTJdN7KiX",
  target: "https://app.affine.pro",
});

export const getTemplateWorkspacePages = async () => {
  const pages = await templateReader.getDocPageMetas();
  const templateList = await templateReader.getTemplateList();
  const { categories, templateListPageId } = templateList;

  const templates: WorkspacePage[] = [];

  categories.map((category) => {
    category.list.map((template) => {
      delete template.properties;
      delete template.parsedBlocks;
      delete template.linkedPages;
      template.order = category.featured?.id === template.id ? -2 : 0;
      template.cateName = category.category;
      template.cateSlug = category.slug;
      template.cateTitle = category.title;
      if (template.order === -2) {
        template.intro = category.description;
      }
      templates.push(template);
    });
  });

  const workspacePages = templates.filter(
    (p): p is WorkspacePage => p !== undefined
  );

  return workspacePages;
};

export const getTemplateSnapshot = async (docId: string) => {
  return await templateReader.getDocSnapshot(docId);
};
