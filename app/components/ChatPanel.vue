<template>
  <div
    class="h-full bg-white rounded-2xl border border-slate-200 flex flex-col"
  >
    <!-- Chat Header -->
    <div class="p-4 border-b border-slate-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-slate-900">Chat</h3>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-slate-500"
            >{{ participants.length }} participants</span
          >
          <button class="text-slate-400 hover:text-slate-600 transition-colors">
            <Icon name="lucide:more-horizontal" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="flex-1 p-4 overflow-y-auto space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex items-start space-x-3"
        :class="{ 'flex-row-reverse space-x-reverse': message.isOwnMessage }"
      >
        <div class="flex-shrink-0">
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium"
          >
            {{ message.user.initials }}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <span class="text-sm font-medium text-slate-900">{{
              message.user.name
            }}</span>
            <span class="text-xs text-slate-500">{{
              formatTime(message.timestamp)
            }}</span>
          </div>
          <div
            class="inline-block px-3 py-2 rounded-2xl text-sm"
            :class="
              message.isOwnMessage
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-900'
            "
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div
        v-if="typingUsers.length > 0"
        class="flex items-center space-x-2 text-sm text-slate-500"
      >
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
          <div
            class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"
            style="animation-delay: 0.2s"
          />
          <div
            class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"
            style="animation-delay: 0.4s"
          />
        </div>
        <span>{{ formatTypingUsers(typingUsers) }} typing...</span>
      </div>
    </div>

    <!-- Message Input -->
    <div class="p-4 border-t border-slate-200">
      <form class="flex items-center space-x-3" @submit.prevent="sendMessage">
        <div class="flex-1 relative">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            class="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
            @input="handleTyping"
            @keydown.enter.prevent="sendMessage"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            @click="toggleEmojiPicker"
          >
            <Icon name="lucide:smile" class="w-4 h-4" />
          </button>
        </div>
        <button
          type="submit"
          :disabled="!newMessage.trim()"
          class="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl transition-colors flex items-center justify-center"
        >
          <Icon name="lucide:send" class="w-4 h-4" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string;
  name: string;
  initials: string;
}

interface Message {
  id: string;
  text: string;
  user: User;
  timestamp: string;
  isOwnMessage: boolean;
}

interface Props {
  participants: User[];
}

defineProps<Props>();

// Sample data
const currentUser: User = {
  id: "user-1",
  name: "You",
  initials: "YU",
};

const messages = ref<Message[]>([
  {
    id: "msg-1",
    text: "Hi everyone! Ready to start the meeting?",
    user: { id: "user-2", name: "John Doe", initials: "JD" },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isOwnMessage: false,
  },
  {
    id: "msg-2",
    text: "Yes, let me share my screen",
    user: currentUser,
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    isOwnMessage: true,
  },
  {
    id: "msg-3",
    text: "Perfect! I can see it clearly.",
    user: { id: "user-3", name: "Alice Smith", initials: "AS" },
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    isOwnMessage: false,
  },
  {
    id: "msg-4",
    text: "Great! Let's proceed with the agenda.",
    user: { id: "user-4", name: "Bob Johnson", initials: "BJ" },
    timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    isOwnMessage: false,
  },
]);

const newMessage = ref("");
const typingUsers = ref<User[]>([]);
const showEmojiPicker = ref(false);

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatTypingUsers = (users: User[]) => {
  if (users.length === 1) return users[0]?.name || "";
  if (users.length === 2)
    return `${users[0]?.name || ""} and ${users[1]?.name || ""}`;
  return `${users[0]?.name || ""} and ${users.length - 1} others`;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  const message: Message = {
    id: `msg-${Date.now()}`,
    text: newMessage.value.trim(),
    user: currentUser,
    timestamp: new Date().toISOString(),
    isOwnMessage: true,
  };

  messages.value.push(message);
  newMessage.value = "";

  // Scroll to bottom
  nextTick(() => {
    const messagesContainer = document.querySelector(".overflow-y-auto");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
};

const handleTyping = () => {
  // Handle typing indicator logic
  // In a real app, this would emit typing events to other users
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// Auto-scroll to bottom when new messages arrive
watch(
  messages,
  () => {
    nextTick(() => {
      const messagesContainer = document.querySelector(".overflow-y-auto");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  },
  { deep: true }
);
</script>
