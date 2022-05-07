<script lang="ts" setup>
import BModal from '../base/BModal.vue'
import BTab from '../base/BTab.vue'
import Login from './Login.vue'

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
        <!-- Login Form -->
        <Login />
      </template>
      <template #tab-2>
        <!-- Registration Form -->
        <form>
          <!-- Name -->
          <FormKit
            outer-class="mb-3"
            label="Name"
            placeholder="Enter name"
            name="name"
            label-class="inline-block mb-2"
            input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:outline-none rounded bg-transparent focus:border-indigo-400"
          />
          <!-- Email -->
          <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <input
              type="email"
              class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition duration-500 focus:outline-none rounded bg-transparent focus:border-indigo-400"
              placeholder="Enter Email"
            />
          </div>
          <!-- Age -->
          <div class="mb-3">
            <label class="inline-block mb-2">Age</label>
            <input
              type="number"
              class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition duration-500 focus:outline-none rounded bg-transparent focus:border-indigo-400"
            />
          </div>
          <!-- Password -->
          <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <input
              type="password"
              class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition duration-500 focus:outline-none rounded bg-transparent focus:border-indigo-400"
              placeholder="Password"
            />
          </div>
          <!-- Confirm Password -->
          <div class="mb-3">
            <label class="inline-block mb-2">Confirm Password</label>
            <input
              type="password"
              class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition duration-500 focus:outline-none rounded bg-transparent focus:border-indigo-400"
              placeholder="Confirm Password"
            />
          </div>
          <!-- Phone Number -->
          <div class="mb-3">
            <label class="inline-block mb-2">Phone Number</label>
            <input
              type="text"
              class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition duration-500 focus:outline-none rounded bg-transparent focus:border-indigo-400"
              placeholder="Enter Phone Number"
            />
          </div>
          <button
            type="submit"
            class="block w-full bg-indigo-400 text-white py-1.5 px-3 rounded transition hover:bg-indigo-500 disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </template>
    </BTab>
  </BModal>
</template>
