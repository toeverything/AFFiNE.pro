import { defineConfig, presetUno, presetWind, presetAttributify } from 'unocss'

import extractorPug from '@unocss/extractor-pug'
import transformerDirectives from '@unocss/transformer-directives'
import { extractorSplit } from '@unocss/core'

// @FIXME:
// - To extract attribute in Pug
// - To support @screen directive in Stylus
export default defineConfig({
  presets: [
    presetUno(),
    presetWind()
  ],
  transformers: [
    transformerDirectives(),
  ],
  extractors: [
    extractorSplit,
    extractorPug()
  ],
  theme: {
    breakpoints: {
      xs: '30rem',
      sm: '48rem',
      md: '64rem',
      lg: '75rem',
      xl: '94.5rem',
    }
  }
})
