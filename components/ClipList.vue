<script lang="ts" setup>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import type { Clip } from '~~/types/Clip'
import { convertFirebaseTimeStampToDate } from '~/helpers/utils'

const { $firebaseDb } = useNuxtApp()
const clips = ref<Clip[]>([])
const limitItem = 3

async function getClips() {
  const queryConstraint = [orderBy('timestamp', 'desc'), limit(limitItem)]

  if (clips.value.length) {
    const lastItem = getDoc(doc($firebaseDb, 'clips', clips.value.at(-1)!.id))
    queryConstraint.push(startAfter(lastItem))
  }
  const q = query(collection($firebaseDb, 'clips'), ...queryConstraint)

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    clips.value.push({ id: doc.id, ...doc.data() } as Clip)
  })
}

onBeforeMount(() => {
  getClips()
})

const list = ref()
useInfiniteScroll(list, getClips, { distance: 10 })
</script>

<template>
  <div ref="list" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <NuxtLink
      v-for="clip in clips"
      :key="clip.id"
      :to="`/clip/${clip.id}`"
      class="mt-6 rounded-tl-2xl rounded-br-2xl shadow-xl bg-secondary transform hover:-translate-y-2 hover:shadow-2xl transition duration-300"
    >
      <!-- Image -->
      <img
        class="card-img-top rounded-tl-2xl w-full"
        :src="clip.screenshotURL"
        :alt="clip.screenshotFileName"
        crossorigin="anonymous"
      />

      <!-- Shape -->
      <div class="relative">
        <div
          class="absolute pointer-events-none bottom-full w-full bg-secondary text-white"
        >
          <div class="absolute bottom-full w-full pb-5 overflow-hidden">
            <svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              class="absolute bottom-0 w-full h-full tranform"
              style="transform-origin: top center; transform: scale(2)"
            >
              <path d="M0 25h25L75 0h25v50H0z" fill="#283046" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="p-8">
        <!-- Heading -->
        <h2 class="text-3xl mb-2">{{ clip.title }}</h2>

        <!-- Name & Date -->
        <p class="mb-0">
          {{ clip.displayName }} &#183;
          <span class="text-gray-400">{{
            convertFirebaseTimeStampToDate(clip.timestamp)
          }}</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
