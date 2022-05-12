import { createFFmpeg } from '@ffmpeg/ffmpeg'

const isReady = ref(false)
let ffmpeg

async function init() {
  if (isReady.value) {
    return
  }
  ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()
  isReady.value = true
}

export default function () {
  return { init, isReady }
}
