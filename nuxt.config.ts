import { defineNuxtConfig } from 'nuxt'
import { transformerDirectives, transformerVariantGroup } from 'unocss'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt'
  ],
  unocss: {
    attributify: true,
    transformers: [
      transformerDirectives(),
      transformerVariantGroup()
    ]
  }
})
