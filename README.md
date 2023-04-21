# affine.pro

This repo is AFFiNE official website and blog source code.

## Git Flow
Feature dev: `feature/$x` or `master` -> [`staging`](https://next.affine.pro) -> [`production`](https://affine.pro)

Issue/Hotfix: `issue/$x` -> `production`


## How to publish blog

The new blog source uses AFFiNE - public workspace: [https://app.affine.pro/public-workspace/H6vffRmJbCfA-r3kq_36_](https://app.affine.pro/public-workspace/H6vffRmJbCfA-r3kq_36_)

You can use AFFiNE to write your article, contact [ShortCipher](https://github.com/ShortCipher5) to request permissions for the AFFiNE Blog Workspace.

Each blog should abide by the following format:
```
---
title: How AFFiNE Classifies Editors
author: Chi Zhang, Yifeng Wang , Ran Chen, Fanjing Zhang
tags: Let’s make XXX
slug: how-affine-classifies-editors
description: There are so many editors today that users may find it difficult to select
created: 2022-06-27
updated: 2022-06-27
layout: blog
pulish: false
---
[cover image]
[article content]
```

`title` the title of the article

`author` the author/authors of the article in a comma sepeareted list. For a list of available authors, see [services/blog/userMap.ts](services/blog/userMap.ts). Profile images are taken from the [public](public) folder.

`tags` the tag, or rather categorey, of the article

`slug` the unique url for the article `https://affine.pro/blog/{slug}` - do not use special characters and replace ` ` (spaces) with `-`

`description` a small description to the article, no more than 2 sentences

`created` this should be the publish date

`updated` this should be set as the publish date, and only this date is updated when edits are made

`layout` should generally stay as `blog`

`publish` set to false to ensure this article is not public, only set to `true` when the article is ready for publishing (will be published as soon as set to true)

# How to develop

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3001

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
