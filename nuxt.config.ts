// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/image"],
});

