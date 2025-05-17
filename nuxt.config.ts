import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4
  },

  runtimeConfig: {
    githubToken: "" // can be overridden by NUXT_GITHUB_TOKEN environment variable
  },

  vite: {
    plugins: [tailwindcss()]
  },

  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/image"],

  image: {
    domains: ["avatars.githubusercontent.com"]
  }
});
