<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3
          class="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors"
        >
          {{ room.name }}
        </h3>
        <p class="text-sm text-slate-600 mb-3 line-clamp-2">
          {{ room.description }}
        </p>
      </div>
      <div class="ml-4">
        <div
          class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
        >
          <span class="text-white text-lg">👥</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-4 text-sm text-slate-500">
        <div class="flex items-center space-x-1">
          <span>👥</span>
          <span>{{ room.participants }}/{{ room.maxParticipants }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <span>🕒</span>
          <span>{{ formatTime(room.startTime) }}</span>
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <div
          class="w-2 h-2 rounded-full"
          :class="room.status === 'active' ? 'bg-green-500' : 'bg-slate-400'"
        />
        <span class="text-xs font-medium text-slate-600">
          {{ getStatusText(room.status) }}
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex -space-x-2">
        <div
          v-for="(avatar, index) in room.avatars.slice(0, 3)"
          :key="index"
          class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
        >
          {{ avatar }}
        </div>
        <div
          v-if="room.avatars.length > 3"
          class="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-600 text-xs font-medium"
        >
          +{{ room.avatars.length - 3 }}
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <button
          class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
          @click="$emit('preview', room)"
        >
          {{ buttonTexts.preview }}
        </button>
        <button
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          :disabled="room.participants >= room.maxParticipants"
          @click="$emit('join', room)"
        >
          {{
            room.participants >= room.maxParticipants
              ? buttonTexts.full
              : buttonTexts.join
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Room {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  status: "active" | "waiting" | "ended";
  avatars: string[];
  host: string;
}

interface Props {
  room: Room;
}

interface Emits {
  (e: "join" | "preview", room: Room): void;
}

defineProps<Props>();
defineEmits<Emits>();

// 临时的语言状态，实际应该使用 useI18n
const currentLang = ref("zh");

const formatTime = (time: string) => {
  return new Date(time).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getStatusText = (status: string) => {
  const statusTexts = {
    zh: {
      active: "进行中",
      waiting: "等待中",
      ended: "已结束",
    },
    en: {
      active: "Active",
      waiting: "Waiting",
      ended: "Ended",
    },
  };

  return (
    statusTexts[currentLang.value as "zh" | "en"][
      status as keyof typeof statusTexts.zh
    ] || status
  );
};

const buttonTexts = computed(() => ({
  preview: currentLang.value === "zh" ? "预览" : "Preview",
  join: currentLang.value === "zh" ? "加入" : "Join",
  full: currentLang.value === "zh" ? "已满" : "Full",
}));
</script>
