import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "shadcn-nuxt", "@pinia/nuxt"],
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      API_URL:
        process.env.NUXT_PUBLIC_API_URL ||
        "https://services-verticaltendasbackend.b5gal9.easypanel.host",
      API_PRODUCT_URL:
        process.env.NUXT_PUBLIC_API_PRODUCT_URL ||
        "https://services-verticaltendasbackend.b5gal9.easypanel.host",
    },
  },
});
