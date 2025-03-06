// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/ui'],

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },

  supabase: {
    key: process.env.SUPABASE_KEY,
    url: process.env.SUPABASE_URL,
    redirectOptions: {
      login: '/login',
      callback: '/confirm-login',
    },
  },

  compatibilityDate: '2025-03-06',
})