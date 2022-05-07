<script lang="ts" setup>
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <Dialog
    :open="modelValue"
    class="fixed z-50 inset-0 overflow-y-auto"
    @close="modelValue = $event"
  >
    <!-- Modal BG Overlay -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <DialogPanel
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="py-4 text-left px-6">
          <!-- Title -->
          <div class="flex justify-between items-center pb-4">
            <DialogTitle>
              <slot name="heading" />
            </DialogTitle>

            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click="modelValue = false"
            >
              &#x2715;
            </div>
          </div>

          <DialogDescription>
            <slot />
          </DialogDescription>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>
