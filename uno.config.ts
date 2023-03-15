import { defineConfig } from 'unocss'

import extractorPug from '@unocss/extractor-pug'
import transformerDirectives from '@unocss/transformer-directives'
import { extractorSplit } from '@unocss/core'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  extractors: [
    extractorPug(),
    extractorSplit
  ],
})
