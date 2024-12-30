<script setup lang="ts">
import { en } from '@nuxt/ui/locale'
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <UApp :locale="en">
      <NuxtPage :page-key="route => route.fullPath" />
    </UApp>
  </NuxtLayout>
</template>
