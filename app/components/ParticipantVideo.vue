<script setup lang="ts">
import { MicrophoneIcon } from "@heroicons/vue/24/outline";
import { VideoCameraSlashIcon } from "@heroicons/vue/24/solid";

interface Participant {
  id: number;
  name: string;
  isMicOn: boolean;
  isCameraOn: boolean;
  avatar: string;
}

interface Props {
  participant: Participant;
}

defineProps<Props>();
</script>

<template>
  <div class="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
    <!-- 视频区域 -->
    <div class="w-full h-full flex items-center justify-center">
      <div
        v-if="participant.isCameraOn"
        class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
      >
        <img
          :src="participant.avatar"
          :alt="participant.name"
          class="w-20 h-20 rounded-full"
        />
      </div>
      <div
        v-else
        class="w-full h-full bg-gray-700 flex items-center justify-center"
      >
        <VideoCameraSlashIcon class="w-12 h-12 text-gray-400" />
      </div>
    </div>

    <!-- 参会者信息 -->
    <div
      class="absolute bottom-2 left-2 right-2 flex items-center justify-between"
    >
      <span
        class="text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded"
      >
        {{ participant.name }}
      </span>
      <div class="flex space-x-1">
        <div
          v-if="!participant.isMicOn"
          class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
        >
          <MicrophoneIcon class="w-3 h-3" />
        </div>
      </div>
    </div>
  </div>
</template>
