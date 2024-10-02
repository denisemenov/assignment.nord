// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/node_modules/@nordhealth/css/lib/nord.min.css'],
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    },
  },
});
