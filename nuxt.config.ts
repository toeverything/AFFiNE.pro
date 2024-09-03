import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiToken: '',
    public: {
      ENV: process.env.NODE_ENV,
      UPDATED_DATE: Date.now(),
    },
  },

  devServer: {
    host: '0.0.0.0',
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
    },
    routeRules: {
      '/': { prerender: true },
      '/ai': { prerender: true },
      '/templates': { prerender: true },
      '/templates/**': { prerender: true },
      '/blog': { prerender: true },
      '/blog/**': { prerender: true },
    },
  },

  ssr: true,

  app: {
    keepalive: true,
    head: {
      titleTemplate: '%s | AFFiNE - All In One KnowledgeOS',
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=6',
        },
        {
          name: 'description',
          content:
            'The universal editor that lets you work, play, present or create just about anything.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://affine.pro' },
        { name: 'twitter:title', content: 'AFFiNE - All In One KnowledgeOS' },
        {
          name: 'twitter:description',
          content:
            'The universal editor that lets you work, play, present or create just about anything.',
        },
        { name: 'twitter:site', content: '@AffineOfficial' },
        { name: 'twitter:image', content: 'https://affine.pro/og.png' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'AFFiNE' },
        { name: 'og:title', content: 'AFFiNE - All In One KnowledgeOS' },
        { name: 'og:url', content: 'https://affine.pro' },
        { name: 'og:image', content: 'https://affine.pro/og.png' },
        {
          name: 'og:description',
          content:
            'The universal editor that lets you work, play, present or create just about anything.',
        },
        { name: 'saashub-verification', content: 'koz5tiouhxbt' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-96.png' },
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap',
          as: 'style',
          rel: 'preload',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap',
          as: 'style',
          rel: 'preload',
        },
      ],
      script: [
        {
          id: 'check-dark-light',
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
          `,
        },
        {
          type: 'text/javascript',
          children: `
            (function(w){w.fpr=w.fpr||function(){w.fpr.q = w.fpr.q||[];w.fpr.q[arguments[0]=='set'?'unshift':'push'](arguments);};})(window);
            fpr("init", {cid:"daflad6y"});
            fpr("click");
          `,
        },
        {
          src: 'https://cdn.firstpromoter.com/fpr.js',
          async: true,
        },
      ],
    },
  },

  imports: {
    dirs: ['stores', 'composables'],
  },

  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },

  experimental: {
    inlineSSRStyles: false,
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
    enableRouterSync: true,
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  build: {
    transpile: ['gsap'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@require "../styles/ref.styl"`,
        },
      },
    },
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
      strictMessage: false,
    },
  },

  image: {
    cloudflare: {
      baseURL: 'https://affine.pro',
    },
  },
});
