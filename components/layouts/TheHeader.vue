<script setup>
import { signOut } from 'firebase/auth'
import AuthModal from '../app/AuthModal.vue'

const isOpen = ref(false)

const { $firebaseAuth } = useNuxtApp()
const user = useUser()
const router = useRouter()
function logout() {
  signOut($firebaseAuth)
  router.replace('/')
}
</script>

<template>
  <header id="header" class="bg-secondary">
    <nav class="container mx-auto flex justify-start items-center py-8 px-4">
      <!-- App Name -->
      <NuxtLink
        to="/"
        class="text-3xl text-indigo-400 font-bold uppercase mr-4"
      >
        Clips
      </NuxtLink>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!user">
            <button class="px-2" @click="isOpen = true">
              Login / Register
            </button>
          </li>
          <template v-else>
            <li>
              <NuxtLink
                to="/manage"
                active-class="text-indigo-400"
                class="px-2"
              >
                Manage
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/upload"
                active-class="text-indigo-400"
                class="px-2"
              >
                Upload
              </NuxtLink>
            </li>
            <li>
              <button class="px-2" @click="logout">Logout</button>
            </li>
          </template>
          <li>
            <NuxtLink active-class="text-indigo-400" class="px-2" to="/about">
              About
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <ClientOnly>
      <AuthModal v-model="isOpen" />
    </ClientOnly>
  </header>
</template>
