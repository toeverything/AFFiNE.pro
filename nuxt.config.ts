// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ENV: process.env.NODE_ENV,
      UPDATED_DATE: Date.now()
    }
  },

  ssr: true,

  app: {
    keepalive: true,
    head: {
      title: 'AFFiNE - All In One Workos',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://affine.pro' },
        { name: 'twitter:title', content: 'AFFiNE - All In One Workos' },
        { name: 'twitter:description', content: 'There can be more than Notion and Miro. AFFiNE is a next-gen knowledge base that brings planning, sorting and creating all together.' },
        { name: 'twitter:site', content: '@AffineOfficial' },
        { name: 'twitter:image', content: 'https://affine.pro/og.jpeg' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'AFFiNE' },
        { name: 'og:title', content: 'AFFiNE - All In One Workos' },
        { name: 'og:url', content: 'https://affine.pro' },
        { name: 'og:image', content: 'https://affine.pro/og.jpeg' },
        { name: 'og:description', content: 'There can be more than Notion and Miro. AFFiNE is a next-gen knowledge base that brings planning, sorting and creating all together.' },
        { name: 'theme-color', content: '#556cd6' },
      ],
      script: [
        { id: 'check-dark-light',
          children: `
            ;(() => {
              const preference = localStorage.getItem('vueuse-color-scheme')
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
              if (!preference || preference === 'auto' ? prefersDark : preference === 'dark') {
                document.documentElement.classList.add('dark')
              }
            })()
          ` }
      ]
    }
  },

  imports: {
    dirs: [ 'stores', 'composables' ]
  },

  components: {
    dirs: [
      { path: '~/components', pathPrefix: false }
    ]
  },

  modules: [
    '@nuxt/content',
    '@element-plus/nuxt',
    'unplugin-icons/nuxt',
    'nuxt-icons',
    '@unocss/nuxt',
    '@pinia/nuxt',
  ]
})
