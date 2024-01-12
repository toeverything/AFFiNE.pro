import { src, dest, series } from 'gulp'
import fs from 'fs/promises'
import axios from 'axios'
import _ from 'lodash'

const file = require('gulp-file')

function cleanBlog(cb: any) {
  return fs.rm('./content/blog', { recursive: true, force: true });
}

async function convertBlogToMarkdowns(cb: any) {
  try {
    const { data } = await axios(`https://affine.pro/api/blog?token=${process.env.API_TOKEN}`)
        const pages = data.pages
      .filter((page: any) => page.publish)

    if (!pages || !pages.length) {
      throw new Error('No pages')
    }

    _.uniqBy(pages, 'slug')
      .map((page: any, index: number) => {
        return src('/content/*')
          .pipe(file(`${page.slug}.json`, JSON.stringify(page, null, 2)))
          .pipe(dest('./content/blog'))
      })
  } catch (error) {
    console.log('convertBlogToMarkdowns error', error)
    throw error
  }
  cb()
}

exports.default = series(cleanBlog, convertBlogToMarkdowns)
