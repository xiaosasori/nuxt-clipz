<script lang="ts" setup>
import { doc, getDoc } from 'firebase/firestore'

import { convertFirebaseTimeStampToDate } from '~/helpers/utils'
import type { Clip } from '~~/types/Clip'

const route = useRoute()
const id = route.params.id as string

const { $firebaseDb } = useNuxtApp()

const clip = ref<Clip>()
onBeforeMount(async () => {
  const clipSnapshot = await getDoc(doc($firebaseDb, 'clips', id))
  clip.value = { id: clipSnapshot.id, ...clipSnapshot.data() } as Clip
})
</script>

<template>
  <div>
    <section v-if="clip" class="container mx-auto my-8 bg-secondary p-6">
      <div class="rounded relative flex flex-col">
        <!-- Title and Uploader -->
        <h1 class="font-bold mb-2 text-3xl">
          {{ clip.title }}
        </h1>
        <div class="text-gray-400 mb-6">
          Uploaded By {{ clip.displayName }}
          <span>{{ convertFirebaseTimeStampToDate(clip.timestamp) }}</span>
        </div>

        <!-- Video Editor -->
        <div class="relative aspect-video">
          <!-- Video Player -->
          <video
            crossorigin="anonymous"
            controls
            class="video-js vjs-theme-forest mx-auto"
          >
            <source
              :src="clip.url"
              :type="`video/${clip.fileName.split('.').pop()}`"
            />
          </video>
        </div>
      </div>
    </section>
  </div>
</template>
