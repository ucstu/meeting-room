<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <NotificationToast
      :notifications="notifications"
      @remove="removeNotification"
    />
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

const notifications = ref<Notification[]>([]);

function addNotification(notification: Omit<Notification, "id" | "createdAt">) {
  const newNotification: Notification = {
    ...notification,
    id: Date.now().toString(),
    createdAt: Date.now(),
    duration: notification.duration || 5000,
  };
  notifications.value.push(newNotification);
}

function removeNotification(id: string) {
  const index = notifications.value.findIndex((n) => n.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
  }
}

// 提供全局通知方法
provide("addNotification", addNotification);
provide("removeNotification", removeNotification);
</script>
