const packageVersion = import.meta.env.npm_package_version

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: false,
  },

  experimental: {
    inlineRouteRules: true,
    typedPages: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  router: {
    options: {
      strict: true,
    },
  },

  app: {
    head: {
      templateParams: {
        separator: '\u00B7',
        siteName: 'NuxtPong',
      },
      titleTemplate: '%s %separator %siteName',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    rootTag: 'body',
    rootAttrs: {
      'id': import.meta.env.npm_package_name.split('/')[1],
      'data-version': packageVersion,
    },
  },

  runtimeConfig: {
    public: {
      packageVersion,
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  nitro: {
    experimental: {
      websocket: true,
    },
    // routeRules: {
    //   '/**': {
    //     headers: {
    //       'Cross-Origin-Opener-Policy': 'same-origin',
    //       'Cross-Origin-Embedder-Policy': 'require-corp',
    //     },
    //   },
    // },
    typescript: {
      tsConfig: {
        compilerOptions: {
          skipLibCheck: true,
        },
        exclude: [
          '../.config/nuxt.ts',
          '../app/**/*',
        ],
      },
    },
  },

  vite: {
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
    },
    worker: {
      format: 'es',
    },
  },

  $development: {
    app: {
      head: {
        templateParams: {
          environment: '🔥',
        },
        titleTemplate: '%environment %s %separator %siteName',
      },
    },
  },

  modules: [
    '@nuxt/ui-pro',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
})
