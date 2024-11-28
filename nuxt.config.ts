// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt Blog!",
      meta: [
        { name: "description", content: "Blog Website where you can read blog and create your own blog post" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "UTF-8" },
        { name: "robots", content: "index, follow" },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "pinia-plugin-persistedstate/nuxt",
  ],
  pages: true,
});
