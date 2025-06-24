<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  time: string;
  type: "system" | "user" | "me";
}

interface Props {
  messages: ChatMessage[];
  showChat: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  toggleChat: [];
  sendMessage: [message: string];
}>();

const chatMessage = ref("");

const handleSendMessage = () => {
  if (chatMessage.value.trim()) {
    emit("sendMessage", chatMessage.value);
    chatMessage.value = "";
  }
};
</script>

<template>
  <aside
    v-if="showChat"
    class="w-80 bg-gray-800 border-l border-gray-700 flex flex-col"
  >
    <!-- 聊天头部 -->
    <div class="p-4 border-b border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="font-medium">会议聊天</h3>
        <button
          class="text-gray-400 hover:text-white"
          @click="emit('toggleChat')"
        >
          ×
        </button>
      </div>
    </div>

    <!-- 聊天消息 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'flex',
          message.type === 'me' ? 'justify-end' : 'justify-start',
        ]"
      >
        <div
          :class="[
            'max-w-[80%] px-3 py-2 rounded-lg text-sm',
            message.type === 'me'
              ? 'bg-blue-600 text-white'
              : message.type === 'system'
              ? 'bg-gray-700 text-gray-300 text-center'
              : 'bg-gray-700 text-white',
          ]"
        >
          <div
            v-if="message.type !== 'system'"
            class="text-xs text-gray-300 mb-1"
          >
            {{ message.user }} {{ message.time }}
          </div>
          <div>{{ message.message }}</div>
        </div>
      </div>
    </div>

    <!-- 聊天输入 -->
    <div class="p-4 border-t border-gray-700">
      <div class="flex space-x-2">
        <input
          v-model="chatMessage"
          type="text"
          placeholder="输入消息..."
          class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          @keyup.enter="handleSendMessage"
        />
        <button
          class="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
          @click="handleSendMessage"
        >
          <PaperAirplaneIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </aside>
</template>
