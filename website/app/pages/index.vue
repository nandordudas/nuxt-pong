<script setup lang="ts">
definePageMeta({
  name: 'index',
  layout: 'default',
})

defineRouteRules({
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  },
})

useHead({
  title: 'Index',
})
</script>

<template>
  <Centered>
    <div class="h-dvh">
      <GameCanvas />
    </div>
  </Centered>
</template>
