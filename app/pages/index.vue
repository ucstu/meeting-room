<script setup lang="ts">
// 重定向到会议大厅
navigateTo("/lobby", { replace: true });
</script>

<template>
  <div
    class="min-h-screen bg-gray-900 text-white flex items-center justify-center"
  >
    <div class="text-center">
      <h1 class="text-2xl font-semibold mb-4">正在跳转到会议大厅...</h1>
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
      />
    </div>
  </div>
</template>
