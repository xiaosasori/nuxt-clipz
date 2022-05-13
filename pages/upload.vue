<script lang="ts" setup>
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import type { UploadTask } from 'firebase/storage'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from 'firebase/storage'
import BUpload from '~/components/base/BUpload.vue'
import useFfmpeg from '~~/composables/useFfmpeg'

const router = useRouter()
const { $firebaseStorage, $firebaseAuth, $firebaseDb } = useNuxtApp()
const selectedClip = ref<{ url: string; file: File }[]>([])
const isUploading = ref(false)
const uploadProgress = ref(0)
const isError = ref(false)
const isSuccess = ref(false)
const message = ref('')
let uploadTask: UploadTask | undefined
let screenshotTask: UploadTask | undefined

async function blobFromURL(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()

  return blob
}

const ffmpegService = useFfmpeg()
const screenshots = ref()
const selectedScreenshot = ref()
onBeforeMount(() => {
  ffmpegService.init()
})
watch(selectedClip, async (newVal) => {
  if (newVal.length > 0) {
    screenshots.value = await ffmpegService.getScreenshots(newVal[0].file)
    selectedScreenshot.value = screenshots.value[0]
  }
})

async function uploadFile(credentials: any) {
  isUploading.value = true
  const file = (selectedClip.value[0] as any).file as File
  const extension = file.type.split('/').pop()
  const fileName = `${
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  }`
  // upload screenshot
  const screenshotBlob = await blobFromURL(selectedScreenshot.value)
  const screenshotRef = storageRef(
    $firebaseStorage,
    `screenshots/${fileName}.png`
  )
  screenshotTask = uploadBytesResumable(screenshotRef, screenshotBlob)
  // upload clip
  const clipFileName = `${fileName}.${extension}`
  const strRef = storageRef($firebaseStorage, `clips/${clipFileName}`)
  uploadTask = uploadBytesResumable(strRef, file)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      uploadProgress.value = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
    },
    (error) => {
      isUploading.value = false
      isError.value = true
      selectedClip.value = []
      message.value = 'Upload failed! Please try again later.'
      console.error(error)
    },
    async () => {
      const screenshotURL = await getDownloadURL(screenshotTask!.snapshot.ref)
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask!.snapshot.ref)
        .then((downloadURL) => {
          isUploading.value = false
          isSuccess.value = true
          message.value =
            'Success! Your clip is now ready to share with the world.'
          // store clip to firestore
          const clip = {
            uid: $firebaseAuth.currentUser?.uid,
            displayName: $firebaseAuth.currentUser?.displayName,
            title: credentials.title,
            fileName: clipFileName,
            url: downloadURL,
            screenshotURL,
            timestamp: serverTimestamp(),
          }
          return addDoc(collection($firebaseDb, 'clips'), clip)
        })
        .then((clipDocRef) => {
          setTimeout(() => {
            router.push(`/clip/${clipDocRef.id}`)
          }, 1000)
        })
    }
  )
}

onBeforeUnmount(() => {
  uploadTask?.cancel()
})
</script>

<template>
  <section class="container mx-auto my-8 bg-secondary p-6">
    <div class="rounded relative flex flex-col">
      <div class="font-bold mb-6">Upload Video</div>
      <div
        v-if="!ffmpegService.isReady"
        class="material-icons text-center text-6xl p-8 animate-spin"
      >
        settings
      </div>
      <template v-else>
        <!-- Upload Dropbox -->
        <BUpload
          v-if="!screenshots?.length"
          v-model:files="selectedClip"
          outer-class="w-full px-10 py-40 rounded text-center cursor-pointer border border-dashed border-gray-400 transition duration-500 hover:text-white hover:bg-indigo-400 hover:border-indigo-400 hover:border-solid text-xl"
          accept="video/*"
          outer-dragging-over-class="border-indigo-400 border-solid"
          input-dragging-over-class="bg-indigo-400"
          :processing="ffmpegService.isRunning"
        >
          <template #label>
            <div>Drop your file here</div>
            <div v-if="ffmpegService.isRunning.value">
              <span
                class="material-icons text-center text-6xl p-8 animate-spin"
              >
                autorenew
              </span>
            </div>
          </template>
        </BUpload>
        <!-- Video Editor -->
        <div v-else>
          <div class="text-white text-center font-bold p-4 mb-4 rounded-md">
            <p v-if="isUploading">{{ uploadProgress }} %</p>
            <p :class="{ isError: 'bg-red-500', isSuccess: 'bg-green-500' }">
              {{ message }}
            </p>
          </div>
          <!-- Form -->
          <FormKit
            type="form"
            submit-label="Publish"
            :submit-attrs="{
              outerClass: 'mt-4 text-right',
              inputClass:
                'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-indigo-600 focus:outline-none',
            }"
            @submit="uploadFile"
          >
            <!-- Screenshots -->
            <h2 class="mb-4 text-xl">Select a Thumbnail</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div
                v-for="screenshot in screenshots"
                :key="screenshot"
                class="border-8 cursor-pointer"
                :class="{
                  'border-green-400': selectedScreenshot === screenshot,
                }"
                @click="selectedScreenshot = screenshot"
              >
                <img :src="screenshot" />
              </div>
            </div>

            <!-- Title -->
            <FormKit
              outer-class="mt-4"
              label="Title"
              placeholder="Enter Title"
              name="title"
              label-class="block text-xl mb-4"
              input-class="input"
              validation="required"
            />
          </FormKit>
        </div>
      </template>
    </div>
  </section>
</template>
