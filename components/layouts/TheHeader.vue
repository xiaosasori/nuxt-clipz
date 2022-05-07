<script setup>
import AuthModal from '../app/AuthModal.vue'

const isOpen = ref(false)
</script>

<template>
  <header id="header" class="bg-secondary">
    <nav class="container mx-auto flex justify-start items-center py-8 px-4">
      <!-- App Name -->
      <a class="text-3xl text-indigo-400 font-bold uppercase mr-4">Clips</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <button class="px-2" @click="isOpen = true">
              Login / Register
            </button>
          </li>
          <li>
            <a class="px-2" href="#">Manage</a>
          </li>
          <li>
            <a class="px-2" href="#">Upload</a>
          </li>
          <li>
            <a class="px-2" href="about.html">About</a>
          </li>
        </ul>
      </div>
    </nav>
    <ClientOnly>
      <AuthModal v-model="isOpen" />
    </ClientOnly>
  </header>
</template>
