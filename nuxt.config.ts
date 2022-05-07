import { defineNuxtConfig } from 'nuxt'
import {
  presetAttributify,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@formkit/nuxt'],
  unocss: {
    presets: [presetWind(), presetAttributify()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
  },
})
