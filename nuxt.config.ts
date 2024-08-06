// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      title: 'Nuvo oauth2 SDK demo',
      meta: [
        {
          name: 'description',
          content: 'Nuvo oauth2 SDK demo',
        },
      ],
    },
  },

  // generate
  experimental: {
    payloadExtraction: false,
  },

  // modules
  modules: ['@element-plus/nuxt', '@pinia/nuxt', '@nuxtjs/color-mode', '@nuxtjs/device'],

  // colorMode: {
  //   preference: 'dark',
  //   fallback: 'dark',
  //   classSuffix: '',
  // },
  // https://content.nuxtjs.org/examples/mdc/nested-components
  components: [{ path: '~/components', global: true }],

  elementPlus: { importStyle: 'scss' },

  devServer: {
    host: '127.0.0.1',
    port: 1024,
  },

  compatibilityDate: '2024-07-09',
})
