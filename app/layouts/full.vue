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
  <div class="min-h-screen bg-slate-900">
    <slot />
  </div>
</template>
