<script setup lang="ts">
import { ChatBubbleLeftRightIcon, UserPlusIcon } from "@heroicons/vue/24/solid";

interface Props {
  participantCount: number;
  isInMeeting: boolean;
  showChat: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  joinMeeting: [];
  inviteParticipants: [];
  toggleChat: [];
}>();
</script>

<template>
  <header
    class="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700"
  >
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-semibold">在线会议室</h1>
      <span class="text-sm text-gray-400">{{ participantCount }} 人参会</span>
    </div>

    <div class="flex items-center space-x-3">
      <button
        v-if="!isInMeeting"
        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
        @click="emit('joinMeeting')"
      >
        加入会议
      </button>

      <button
        class="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
        title="邀请参会者"
        @click="emit('inviteParticipants')"
      >
        <UserPlusIcon class="w-5 h-5" />
      </button>

      <button
        class="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
        :class="{ 'bg-blue-600': showChat }"
        title="聊天"
        @click="emit('toggleChat')"
      >
        <ChatBubbleLeftRightIcon class="w-5 h-5" />
      </button>
    </div>
  </header>
</template>
