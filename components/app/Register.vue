<script lang="ts" setup>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const emit = defineEmits(['close'])
const { $firebaseAuth, $firebaseDb } = useNuxtApp()

const castNumber = (node) => {
  node.hook.input((value, next) => next(Number(value)))
}

async function register(credentials, node) {
  try {
    const userCred = await createUserWithEmailAndPassword(
      $firebaseAuth,
      credentials.email,
      credentials.password
    )
    delete credentials.password_confirm
    await Promise.all([
      setDoc(doc($firebaseDb, 'users', userCred.user.uid), credentials),
      updateProfile($firebaseAuth.currentUser, {
        displayName: credentials.name,
      }),
    ])
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
        'block w-full bg-indigo-400 text-white py-1.5 px-3 rounded transition hover:bg-indigo-500 disabled:(opacity-50 bg-indigo-400)',
    }"
    @submit="register"
  >
    <!-- Name -->
    <FormKit
      outer-class="mb-3"
      label="Name"
      placeholder="Enter Name"
      name="name"
      label-class="inline-block mb-2"
      input-class="input"
      validation="required|length:3"
    />
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
    <!-- Age -->
    <FormKit
      type="number"
      outer-class="mb-3"
      label="Age"
      placeholder="Enter Age"
      name="age"
      label-class="inline-block mb-2"
      input-class="input"
      :plugins="[castNumber]"
      validation="required|min:18|max:120"
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
    <!-- Confirm Password -->
    <FormKit
      type="password"
      outer-class="mb-3"
      label="Confirm Password"
      placeholder="Confirm Password"
      name="password_confirm"
      label-class="inline-block mb-2"
      input-class="input"
      validation="required|confirm"
    />
    <!-- Phone Number -->
    <FormKit
      outer-class="mb-3"
      label="Phone Number"
      placeholder="Enter Phone Number"
      name="phone_number"
      label-class="inline-block mb-2"
      input-class="input"
      validation="required"
    />
  </FormKit>
</template>
