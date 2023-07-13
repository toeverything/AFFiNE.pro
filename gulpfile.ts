import { src, dest, series, TaskFunction } from 'gulp'
import { spawn } from 'child_process'
import axios from 'axios'
const file = require('gulp-file')

function cleanBlog(cb: any) {
  const cmd = spawn('rm', ['-rf', './content/blog'])
  cmd.on('close', () => {
    cb()
  })
}

async function convertBlogToMarkdowns(cb: any) {
  try {
    const { data } = await axios('https://affine.pro/api/blog')
    const pages = data.pages
    if (!pages || !pages.length) {
      throw new Error('No pages')
    }
    pages.map((page: any, index: number) => {
      page.order = index
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
