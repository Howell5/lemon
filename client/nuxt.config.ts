import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://local.lemon.me:5000',
    },
  },

  devServer: {
    host: 'local.lemon.me',
    port: 5760,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ['composables/**', 'utils/**', 'store/**'],
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  alias: {
    '@client': resolve(__dirname, './'),
    '@server': resolve(__dirname, '../server/src'),
    '@shared': resolve(__dirname, '../shared'),
  },

  compatibilityDate: '2024-11-03',
})
