<script lang="ts" setup>
async function login(credentials) {
  // console.log(credentials)
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
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
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
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
      validation="required"
    />
  </FormKit>
</template>
