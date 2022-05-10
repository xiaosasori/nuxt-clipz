<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
})
const videoOrder = ref(1)
const clips = [{ title: 'test' }]
function openModal(clip) {}

function deleteClip(clip) {}
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
          <option :value="1">Recent Uploads</option>
          <option :value="2">Oldest Uploads</option>
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
              @click="deleteClip(clip)"
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
