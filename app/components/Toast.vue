<template>
  <div
    class="fixed top-4 left-1/2 z-50 flex flex-col items-center space-y-2"
    style="transform: translateX(-50%)"
  >
    <transition-group name="toast-fade" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="px-4 py-2 rounded shadow text-white min-w-[180px] text-center"
        :class="
          toast.type === 'success'
            ? 'bg-green-500'
            : toast.type === 'error'
            ? 'bg-red-500'
            : 'bg-gray-800'
        "
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { toasts } = useToast();
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
