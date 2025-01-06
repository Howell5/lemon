import Aura from '@primevue/themes/aura'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://local.lemon.me:5000',
    },
  },

  devServer: {
    host: 'local.lemon.me',
    port: 3000,
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
    '@': '../',
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  compatibilityDate: '2024-11-03',
})
