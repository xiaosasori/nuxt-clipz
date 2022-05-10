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
  routes: {
    '/manage': { ssr: false },
  },
  publicRuntimeConfig: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
  },
  unocss: {
    presets: [presetWind(), presetAttributify()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    shortcuts: [
      {
        input:
          'block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent',
      },
    ],
  },
})
