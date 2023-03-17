// @ts-nocheck
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import type { Node } from 'unist-util-visit/lib'

export const remarkRemoveCover: Plugin = () => (tree, file) => {
  let hasCover = false
  visit(tree, 'paragraph', (root) => {
    if (root.children.length === 1 && !hasCover) {
      const child = root.children[0]
      if (child.type === 'image') {
        root.children = []
        hasCover = true
      }
    }
  })
}

/**
 * Get the cover image from the first paragraph of a markdown file.
 */
export const getCoverImage = (tree: Node): string | null => {
  let coverImage: string | null = null
  visit(tree, 'paragraph', (root) => {
    if (root.children.length === 1 && !coverImage) {
      const child = root.children[0]
      if (child.type === 'image') {
        coverImage = child.url
      }
    }
  })
  return coverImage
}
