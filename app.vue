<script setup>
import '@unocss/reset/tailwind.css'
import { onAuthStateChanged } from 'firebase/auth'
import '~/assets/style.css'

import TheHeader from './components/layouts/TheHeader.vue'

const { $firebaseAuth } = useNuxtApp()
const user = useUser()

let unsubscribe
onMounted(() => {
  unsubscribe = onAuthStateChanged($firebaseAuth, (_user) => {
    if (_user) {
      user.value = _user
    } else {
      user.value = null
    }
  })
})

onBeforeUnmount(() => {
  unsubscribe()
})
</script>

<template>
  <div>
    <Head>
      <Title>Clipz</Title>
      <Link rel="preconnect" href="https://fonts.gstatic.com" />
      <Link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Head>
    <TheHeader />
    <NuxtPage />
  </div>
</template>
