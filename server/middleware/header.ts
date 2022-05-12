export default defineEventHandler((event) => {
  // enable SharedArrayBuffer for Ffmpeg
  event.res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  event.res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
})
