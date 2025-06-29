<template>
  <div>
    <NuxtPage />
    <NotificationToast ref="toast" />
  </div>
</template>

<script setup>
const toast = ref()
provide("toast", toast)
</script>
