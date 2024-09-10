export { };

declare global {
  interface Asset {
    name: string;
    url: string;
  }

  interface Release {
    tag_name: string;
    prerelease: boolean;
    published_at: string;
    assets: Asset[];
  }

  interface ReleaseTab {
    name?: string;
    version: string;
    releaseMap?: {
      canary: Release | null;
      stable: Release | null;
      beta: Release | null;
    };
  }

  interface Changelog {
    title: string;
    version: string;
    date: string | number;
    description?: string;
    detailLink?: string;
    cover?: string;
  }

  interface UserStory {
    avatar: string;
    name: string;
    position: string;
    content: string;
  }

  interface ContentFileMeta {
    title: string | null
    authors: string[] | null
    tags: string[] | null
    id: string
    slug: string | null
    cover?: string | null
    coverAlt?: string;
    description: string | null
    created: number | null
    updated: number | null
    md: string
    layout: string | null
    publish?: boolean
  }

  interface TemplateContentFileMeta extends ContentFileMeta {
    // New fields
    cateTitle: string;
    cateName: string;
    cateSlug: string;
    relatedTemplates: string[];
    relatedBlogs: string[];
    useTemplateUrl: string;
    previewUrl: string;
  }
}
