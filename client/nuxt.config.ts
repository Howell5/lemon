// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:5000',
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ['composables/**', 'utils/**', 'stores/**'],
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  alias: {
    '@': '../',
  },

  compatibilityDate: '2024-11-03',
})
