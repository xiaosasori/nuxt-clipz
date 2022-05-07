<script setup>
import '@unocss/reset/tailwind.css'
import '~/assets/style.css'

import TheHeader from './components/layouts/TheHeader.vue'
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
