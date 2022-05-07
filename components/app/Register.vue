<script lang="ts" setup>
const castNumber = (node) => {
  node.hook.input((value, next) => next(Number(value)))
}
</script>

<template>
  <!-- <app-alert *ngIf="showAlert" [color]="alertColor">
  {{ alertMsg }}
</app-alert> -->
  <form @submit.prevent>
    <!-- Name -->
    <FormKit
      outer-class="mb-3"
      label="Name"
      placeholder="Enter Name"
      name="name"
      label-class="inline-block mb-2"
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
      validation="required|min:3"
    />
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
    <!-- Age -->
    <FormKit
      type="number"
      outer-class="mb-3"
      label="Age"
      placeholder="Enter Age"
      name="age"
      label-class="inline-block mb-2"
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
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
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
      validation="required"
    />
    <!-- Confirm Password -->
    <FormKit
      type="password"
      outer-class="mb-3"
      label="Confirm Password"
      placeholder="Confirm Password"
      name="confirm_password"
      label-class="inline-block mb-2"
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
      validation="required"
    />
    <!-- Phone Number -->
    <FormKit
      outer-class="mb-3"
      label="Phone Number"
      placeholder="Enter Phone Number"
      name="phone_number"
      label-class="inline-block mb-2"
      input-class="block w-full py-1.5 px-3 text-gray-200 border border-gray-400 transition
              duration-500 focus:(outline-none border-indigo-400) rounded bg-transparent"
      validation="required"
    />
    <button
      type="submit"
      class="block w-full bg-indigo-400 text-white py-1.5 px-3 rounded transition hover:bg-indigo-500 disabled:(opacity-50 bg-indigo-400)"
    >
      Submit
    </button>
  </form>
</template>
