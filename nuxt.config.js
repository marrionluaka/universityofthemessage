import i18n from './i18n'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'University Of The Message',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/css/webfonts.css',
    '~assets/css/styles.css'
  ],

  styleResources: {
    stylus: ['~assets/styl/_variables.styl', '~assets/styl/_mixins.styl']
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/components',
    '~/plugins/composition',
    '~/plugins/rich-text-renderer'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.STORY_BLOCK_SPACE_TOKEN,
        cacheProvider: 'memory'
      }
    ],
    // Doc: https://i18n.nuxtjs.org/setup
    ['nuxt-i18n', {
      strategy: 'prefix_and_default',
      defaultLocale: 'fr',
      locales: [
        { code: 'fr', name: 'Français', iso: 'fr-FR' },
        { code: 'en', name: 'English', iso: 'en-US' },
      ],
      vueI18n: i18n
    }],

    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',

    'nuxt-fontawesome',

    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
