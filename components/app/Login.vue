<script lang="ts" setup>
import { signInWithEmailAndPassword } from 'firebase/auth'

const emit = defineEmits(['close'])

const { $firebaseAuth } = useNuxtApp()
async function login(credentials, node) {
  try {
    await signInWithEmailAndPassword(
      $firebaseAuth,
      credentials.email,
      credentials.password
    )

    emit('close')
  } catch (error) {
    node.setErrors([error.message])
  }
}
</script>

<template>
  <FormKit
    type="form"
    :submit-attrs="{
      inputClass:
        'block w-full bg-indigo-400 text-white py-1.5 px-3 rounded transition hover:bg-indigo-500',
    }"
    @submit="login"
  >
    <!-- Email -->
    <FormKit
      outer-class="mb-3"
      label="Email"
      placeholder="Enter Email"
      name="email"
      label-class="inline-block mb-2"
      input-class="input"
      validation="required|email"
    />
    <!-- Password -->
    <FormKit
      type="password"
      outer-class="mb-3"
      label="Password"
      placeholder="Enter Password"
      name="password"
      label-class="inline-block mb-2"
      input-class="input"
      validation="required"
    />
  </FormKit>
</template>
