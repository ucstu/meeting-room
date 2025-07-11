<script lang="ts" setup>
if (import.meta.env.PROD) {
  useHead(
    {
      script: [
        {
          src: "/cdn-cgi/challenge-platform/scripts/jsd/main.js",
          crossorigin: "anonymous",
          referrerpolicy: "origin",
        },
      ],
    },
    { mode: "client" },
  );
}
</script>

<template>
  <NuxtPage />
</template>
