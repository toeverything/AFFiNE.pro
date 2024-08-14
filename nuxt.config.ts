import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiToken: '',
    public: {
      ENV: process.env.NODE_ENV,
      UPDATED_DATE: Date.now()
    }
  },

  devServer: {
    host: '0.0.0.0'
  },

  nitro: {
    routeRules: {
      '/templates': { swr: true },
      '/templates/**': { swr: true },
      '/blog': { swr: true },
      '/blog/**': { swr: true },
    }
  },

  ssr: true,

  app: {
    keepalive: true,
    head: {
      titleTemplate: '%s | AFFiNE - All In One KnowledgeOS',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' },
        { name: 'description', content: 'The universal editor that lets you work, play, present or create just about anything.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://affine.pro' },
        { name: 'twitter:title', content: 'AFFiNE - All In One KnowledgeOS' },
        { name: 'twitter:description', content: 'The universal editor that lets you work, play, present or create just about anything.' },
        { name: 'twitter:site', content: '@AffineOfficial' },
        { name: 'twitter:image', content: 'https://affine.pro/og.png' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'AFFiNE' },
        { name: 'og:title', content: 'AFFiNE - All In One KnowledgeOS' },
        { name: 'og:url', content: 'https://affine.pro' },
        { name: 'og:image', content: 'https://affine.pro/og.png' },
        { name: 'og:description', content: 'The universal editor that lets you work, play, present or create just about anything.' },
        { name: 'saashub-verification', content: 'koz5tiouhxbt' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-96.png' }
      ],
      script: [
        { id: 'check-dark-light',
          children: `
            ;(() => {
              const preference = 'light'
              localStorage.setItem('vueuse-color-scheme', preference)
              const prefersLight = window.matchMedia('(prefers-color-scheme: dark)').matches
              if (!preference || preference === 'auto' ? prefersLight : preference === 'light') {
                document.documentElement.classList.add('light')
              } else {
                document.documentElement.classList.add('dark')
              }
            })()
          ` },
        {
          type: 'text/javascript',
          src: 'https://app.termly.io/embed.min.js',
          'data-auto-block': 'on',
          'data-website-uuid': 'd12cc511-9767-4514-9a8b-48f5883b5ba6'
        },
        {
          type: 'text/javascript',
          children: `
            (function(w){w.fpr=w.fpr||function(){w.fpr.q = w.fpr.q||[];w.fpr.q[arguments[0]=='set'?'unshift':'push'](arguments);};})(window);
            fpr("init", {cid:"daflad6y"});
            fpr("click");
          `
        },
        {
          src: 'https://cdn.firstpromoter.com/fpr.js',
          async: true
        }
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
    '@nuxt/image-edge',
    '@nuxtjs/device',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    'unplugin-icons/nuxt',
    'nuxt-icons',
    '@zadigetvoltaire/nuxt-gtm',
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],

  gtm: {
    id: process.env.NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || 'GTM-UNDEFINED',
    enableRouterSync: true
  },

  build: {
    transpile: ['gsap']
  },

  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@require "../styles/ref.styl"`
        }
      }
    }
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.js' },
      // { code: 'zhHans', iso: 'zh-Hans', name: '简体中文', file: 'zh-Hans.js' }
    ],
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false
    }
  },

  image: {
    cloudflare: {
      baseURL: 'https://affine.pro'
    }
  }

})
