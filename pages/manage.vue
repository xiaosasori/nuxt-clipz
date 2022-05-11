<script lang="ts" setup>
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import type { Clip } from '~~/types/Clip'

definePageMeta({
  middleware: ['auth'],
})
const { $firebaseAuth, $firebaseDb, $firebaseStorage } = useNuxtApp()
const clips = ref<Clip[]>([])
const videoOrder = ref<'asc' | 'desc'>('desc')

onBeforeMount(async () => {
  const q = query(
    collection($firebaseDb, 'clips'),
    where('uid', '==', $firebaseAuth.currentUser?.uid),
    orderBy('timestamp', videoOrder.value)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    clips.value.push({ id: doc.id, ...doc.data() } as Clip)
  })
})

function openModal(clip) {}

async function deleteClip(clip: Clip, index: number) {
  const strRef = storageRef($firebaseStorage, `clips/${clip.fileName}`)
  await Promise.all([
    deleteObject(strRef),
    deleteDoc(doc($firebaseDb, 'clips', clip.id)),
  ])
  clips.value.splice(index, 1)
}
</script>

<template>
  <div>
    <!-- Top Bar -->
    <section class="container mx-auto my-8 bg-secondary p-6">
      <div class="rounded relative flex justify-between">
        <NuxtLink
          to="/upload"
          class="bg-indigo-400 text-white py-4 px-10 text-xl"
        >
          Upload Videos
        </NuxtLink>

        <!-- Sort Videos -->
        <select
          v-model="videoOrder"
          class="text-black px-8 text-xl outline-none appearance-none"
        >
          <option value="desc">Recent Uploads</option>
          <option value="asc">Oldest Uploads</option>
        </select>
      </div>
    </section>

    <!-- User's Video Section -->
    <div class="container mx-auto my-8">
      <!-- Video List -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          v-for="(clip, index) in clips"
          :key="index"
          class="mt-6 rounded-tl-2xl rounded-br-2xl shadow-xl bg-secondary flex flex-col justify-start"
        >
          <!-- Image -->
          <a href="#">
            <img
              class="card-img-top rounded-tl-2xl w-full"
              src="assets/img/1.jpg"
            />
          </a>

          <!-- Body -->
          <div class="p-6 text-2xl">
            <!-- Link -->
            <a href="#" class="font-bold mb-2">
              {{ clip.title }}
            </a>
            <a
              href="#"
              class="bg-gray-400 text-white px-2 py-1 ml-2 text-sm rounded"
            >
              Copy Link
            </a>
          </div>

          <!-- Actions -->
          <div class="flex text-center text-2xl bg-gray-800 p-2 mt-auto">
            <button
              class="flex-1 p-2 border-right border-r-2 border-gray-700 transition hover:text-indigo-400"
              @click="openModal(clip)"
            >
              <span class="material-icons text-base">build</span>
            </button>
            <button
              class="flex-1 p-2 rounded-br-2xl transition hover:text-indigo-400"
              @click="deleteClip(clip, index)"
            >
              <span class="material-icons text-base">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <app-edit [activeClip]="activeClip" (update)="update($event)"></app-edit> -->
  </div>
</template>
