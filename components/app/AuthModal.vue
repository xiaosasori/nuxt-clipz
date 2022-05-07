<script lang="ts" setup>
import BModal from '../base/BModal.vue'
import BTab from '../base/BTab.vue'
import Login from './Login.vue'
import Register from './Register.vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const tabs = ['Login', 'Register']
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <BModal v-model="modelValue">
    <template #heading>
      <p class="text-2xl font-bold">Your Account</p>
    </template>

    <BTab :tabs="tabs">
      <template #tab-1>
        <Login />
      </template>
      <template #tab-2>
        <Register />
      </template>
    </BTab>
  </BModal>
</template>
