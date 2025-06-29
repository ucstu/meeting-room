<template>
  <div class="fixed bottom-6 right-6 z-50 space-y-3">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl p-4 min-w-80 max-w-sm"
      :class="getNotificationClasses(notification.type)"
    >
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="getIconClasses(notification.type)"
          >
            <Icon
              :name="getNotificationIcon(notification.type)"
              class="w-4 h-4 text-white"
            />
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-white">
            {{ notification.title }}
          </p>
          <p
            v-if="notification.message"
            class="mt-1 text-sm text-slate-300 leading-relaxed"
          >
            {{ notification.message }}
          </p>
        </div>

        <button
          class="flex-shrink-0 w-6 h-6 bg-transparent hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center"
          @click="$emit('remove', notification.id)"
        >
          <Icon name="lucide:x" class="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  createdAt: number;
}

defineProps<{
  notifications: Notification[];
}>();

defineEmits<{
  remove: [id: string];
}>();

function getNotificationIcon(type: Notification["type"]) {
  const icons = {
    success: "lucide:check",
    error: "lucide:x",
    warning: "lucide:alert-triangle",
    info: "lucide:info",
  };
  return icons[type];
}

function getNotificationClasses(type: Notification["type"]) {
  const classes = {
    success: "border-green-500/20",
    error: "border-red-500/20",
    warning: "border-yellow-500/20",
    info: "border-blue-500/20",
  };
  return classes[type];
}

function getIconClasses(type: Notification["type"]) {
  const classes = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  };
  return classes[type];
}
</script>
