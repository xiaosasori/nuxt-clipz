<script lang="ts" setup>
import { doc, updateDoc } from 'firebase/firestore'
import BModal from './base/BModal.vue'
import type { Clip } from '~~/types/Clip'

const props = defineProps<{ modelValue: boolean; clip: Clip }>()
const emit = defineEmits(['update:modelValue', 'success'])
const modelValue = useVModel(props, 'modelValue', emit)

const { $firebaseDb } = useNuxtApp()
async function updateVideo(credentials: any) {
  await updateDoc(doc($firebaseDb, 'clips', props.clip.id), {
    title: credentials.title,
  })

  emit('success', credentials.title)
}
</script>

<template>
  <BModal v-model="modelValue">
    <template #heading>
      <span class="text-2xl font-bold">Edit Video</span>
    </template>
    <!-- Form -->
    <FormKit
      type="form"
      :submit-attrs="{
        inputClass:
          'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-indigo-600 focus:outline-none',
        outerClass: 'mt-4 text-right',
      }"
      submit-label="Update"
      :value="clip"
      @submit="updateVideo"
    >
      <!-- Title -->
      <FormKit
        outer-class="mt-4"
        label="Title"
        placeholder="Enter Title"
        name="title"
        label-class="block text-xl mb-4"
        input-class="input"
        validation="required|length:3"
      />
    </FormKit>
  </BModal>
</template>
