import type { FFmpeg } from '@ffmpeg/ffmpeg'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const isReady = ref(false)
const isRunning = ref(false)
let ffmpeg: FFmpeg

async function init() {
  if (isReady.value) {
    return
  }
  ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()
  isReady.value = true
}

async function getScreenshots(file: File) {
  isRunning.value = true
  const data = await fetchFile(file)
  ffmpeg.FS('writeFile', file.name, data)
  const seconds = [1, 2, 3]
  const commands: string[] = []

  seconds.forEach((second) => {
    commands.push(
      // input
      '-i',
      file.name,
      // output options
      '-ss',
      `00:00:0${second}`,
      // telling ffmpeg to focus on a single frame
      '-frames:v',
      '1',
      // width 510, -1 to make the height to preserve aspect ratio
      '-filter:v',
      'scale=510:-1',
      // output
      `output_${second}.png`
    )
  })
  await ffmpeg.run(...commands)

  const screenshots: string[] = []
  seconds.forEach((second) => {
    const screenshotFile = ffmpeg.FS('readFile', `output_${second}.png`)
    const screenshotBlob = new Blob([screenshotFile.buffer], {
      type: 'image/png',
    })
    const screenshotURL = URL.createObjectURL(screenshotBlob)
    screenshots.push(screenshotURL)
  })
  isRunning.value = false

  return screenshots
}

export default function () {
  return { init, getScreenshots, isReady, isRunning }
}
