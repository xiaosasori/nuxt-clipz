<script lang="ts" setup>
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import type { UploadTask } from 'firebase/storage'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from 'firebase/storage'
import BUpload from '~/components/base/BUpload.vue'

const router = useRouter()
const { $firebaseStorage, $firebaseAuth, $firebaseDb } = useNuxtApp()
const selectedClip = ref([])
const isUploading = ref(false)
const uploadProgress = ref(0)
const isError = ref(false)
const isSuccess = ref(false)
const message = ref('')
let uploadTask: UploadTask

async function uploadFile(credentials) {
  isUploading.value = true
  const file = selectedClip.value[0].file as File
  const strRef = storageRef($firebaseStorage, `clips/${file.name}`)
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
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          isUploading.value = false
          isSuccess.value = true
          message.value =
            'Success! Your clip is now ready to share with the world.'
          // store clip to firestore
          const clip = {
            uid: $firebaseAuth.currentUser.uid,
            displayName: $firebaseAuth.currentUser.displayName,
            title: credentials.title,
            fileName:
              Math.random().toString(36).slice(2) + Date.now().toString(36),
            url: downloadURL,
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

      <!-- Upload Dropbox -->
      <BUpload
        v-if="selectedClip.length === 0"
        v-model:files="selectedClip"
        outer-class="w-full px-10 py-40 rounded text-center cursor-pointer border border-dashed border-gray-400 transition duration-500 hover:text-white hover:bg-indigo-400 hover:border-indigo-400 hover:border-solid text-xl"
        accept="video/*"
        outer-dragging-over-class="border-indigo-400 border-solid"
        input-dragging-over-class="bg-indigo-400"
      />
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
            <div class="border-8 cursor-pointer border-green-400">
              <img src="assets/img/1.jpg" />
            </div>
            <div class="border-8 cursor-pointer border-transparent">
              <img src="assets/img/2.jpg" />
            </div>
            <div class="border-8 cursor-pointer border-transparent">
              <img src="assets/img/3.jpg" />
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
    </div>
  </section>
</template>
