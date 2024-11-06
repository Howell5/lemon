// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3001',
    },
  },

  compatibilityDate: '2024-11-03',
})