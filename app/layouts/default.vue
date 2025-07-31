<script lang="ts" setup>
useHead({
  titleTemplate: "%s - Meeting Room",
  meta: [
    { name: "description", content: "在线会议管理系统 - 与您的团队连接" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Meeting Room" },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>
