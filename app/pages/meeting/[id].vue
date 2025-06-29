<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
    <!-- Header -->
    <header class="bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div class="flex items-center space-x-4">
        <button
          class="h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors inline-flex items-center space-x-2"
          @click="navigateTo('/')"
        >
          <span>←</span>
          <span>返回大厅</span>
        </button>
        <div class="text-slate-900">
          <h1 class="text-lg font-semibold">
            {{ roomInfo.name }}
          </h1>
          <p class="text-sm text-slate-600">
            {{ participants.length }} 位参与者 • 会议 ID: {{ roomId }}
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <!-- Meeting Time -->
        <div class="text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-xl font-medium">
          {{ formatMeetingTime(meetingStartTime) }}
        </div>

        <!-- Settings -->
        <button
          class="h-10 w-10 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center"
        >
          <span class="text-slate-600">⚙️</span>
        </button>
      </div>
    </header>

    <div class="flex-1 flex">
      <!-- Main Video Area -->
      <div class="flex-1 p-6">
        <!-- Speaker View -->
        <div class="h-full flex flex-col">
          <div class="flex-1 bg-white rounded-2xl relative overflow-hidden mb-4 shadow-sm border border-slate-200">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span class="text-3xl text-white">👤</span>
                </div>
                <h3 class="text-xl font-semibold text-slate-900 mb-2">
                  {{ currentSpeaker?.name || '无发言者' }}
                </h3>
                <p class="text-slate-600">
                  {{ currentSpeaker?.isHost ? '主持人' : '参与者' }}
                </p>
              </div>
            </div>
            <!-- Video Controls Overlay -->
            <div class="absolute bottom-4 left-4 right-4 flex justify-center">
              <div class="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center space-x-4 shadow-lg border border-slate-200">
                <button
                  class="w-12 h-12 rounded-xl transition-colors flex items-center justify-center font-medium"
                  :class="isAudioEnabled ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-red-100 hover:bg-red-200 text-red-600'"
                  @click="toggleAudio"
                >
                  <span class="text-lg">{{ isAudioEnabled ? '🎤' : '🔇' }}</span>
                </button>
                <button
                  class="w-12 h-12 rounded-xl transition-colors flex items-center justify-center font-medium"
                  :class="isVideoEnabled ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-red-100 hover:bg-red-200 text-red-600'"
                  @click="toggleVideo"
                >
                  <span class="text-lg">{{ isVideoEnabled ? '📹' : '📵' }}</span>
                </button>
                <button
                  class="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-xl transition-colors flex items-center justify-center"
                  @click="leaveMeeting"
                >
                  <span class="text-lg text-white">📞</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Participant Grid -->
          <div class="h-32">
            <div class="flex space-x-3 h-full overflow-x-auto scrollbar-hide">
              <div
                v-for="participant in participants"
                :key="participant.id"
                class="flex-shrink-0 w-24 h-full bg-white rounded-xl relative overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all border border-slate-200 shadow-sm"
                :class="{ 'ring-2 ring-blue-500': participant.id === currentSpeaker?.id }"
                @click="setCurrentSpeaker(participant)"
              >
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg">
                      <span class="text-sm text-white">👤</span>
                    </div>
                    <p class="text-xs text-slate-700 font-medium truncate px-1">
                      {{ participant.name }}
                    </p>
                  </div>
                </div>
                <!-- Audio Indicator -->
                <div
                  v-if="!participant.isAudioEnabled"
                  class="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm"
                >
                  <span class="text-xs text-white">🔇</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Chat Panel -->
      <div class="w-80 bg-white border-l border-slate-200 flex flex-col shadow-sm">
        <!-- Chat Header -->
        <div class="p-4 border-b border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-slate-900">
              会议聊天
            </h3>
            <button
              class="h-8 w-8 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center"
              @click="showParticipants = !showParticipants"
            >
              <span class="text-slate-600">👥</span>
            </button>
          </div>
          <!-- Tab Navigation -->
          <div class="flex bg-slate-100 rounded-lg p-1">
            <button
              class="flex-1 py-2 px-2 text-sm font-medium rounded-md transition-colors"
              :class="activeTab === 'chat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
              @click="activeTab = 'chat'"
            >
              聊天
            </button>
            <button
              class="flex-1 py-2 px-2 text-sm font-medium rounded-md transition-colors"
              :class="activeTab === 'participants' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
              @click="activeTab = 'participants'"
            >
              成员 ({{ participants.length }})
            </button>
          </div>
        </div>

        <!-- Chat Content -->
        <div
          v-show="activeTab === 'chat'"
          class="flex-1 flex flex-col"
        >
          <!-- Messages -->
          <div class="flex-1 p-4 space-y-4 overflow-y-auto">
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex space-x-3"
            >
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-sm text-white">👤</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <p class="text-sm font-medium text-slate-900">
                    {{ message.sender }}
                  </p>
                  <p class="text-xs text-slate-500">
                    {{ formatMessageTime(message.timestamp) }}
                  </p>
                </div>
                <p class="text-sm text-slate-700">
                  {{ message.content }}
                </p>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="p-4 border-t border-slate-200">
            <div class="flex space-x-2">
              <input
                v-model="newMessage"
                placeholder="输入消息..."
                class="flex-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-500 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                @keyup.enter="sendMessage"
              >
              <button
                class="h-12 w-12 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center"
                :disabled="!newMessage.trim()"
                :class="{ 'opacity-50 cursor-not-allowed': !newMessage.trim() }"
                @click="sendMessage"
              >
                <span class="text-white text-lg">📤</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Participants List -->
        <div
          v-show="activeTab === 'participants'"
          class="flex-1 p-4 overflow-y-auto"
        >
          <div class="space-y-3">
            <div
              v-for="participant in participants"
              :key="participant.id"
              class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white">👤</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <p class="font-medium text-slate-900 truncate">
                    {{ participant.name }}
                  </p>
                  <span
                    v-if="participant.isHost"
                    class="px-2 py-1 bg-blue-100 text-xs font-medium text-blue-700 rounded-full"
                  >
                    主持人
                  </span>
                </div>
                <p class="text-sm text-slate-600 leading-relaxed">
                  {{ participant.isAudioEnabled ? '🎤 音频' : '🔇 静音' }} •
                  {{ participant.isVideoEnabled ? '📹 视频' : '📵 关闭' }}
                </p>
              </div>
              <div class="flex space-x-1">
                <div
                  v-if="!participant.isAudioEnabled"
                  class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs text-red-600">🔇</span>
                </div>
                <div
                  v-if="!participant.isVideoEnabled"
                  class="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs text-red-600">📵</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const roomId = route.params.id as string

// Room info
const roomInfo = ref({
  name: "产品讨论会议",
  description: "讨论新产品功能特性",
  isPrivate: false
})

// Meeting state
const meetingStartTime = ref(new Date())
const activeTab = ref("chat")
const isAudioEnabled = ref(true)
const isVideoEnabled = ref(true)
const _isScreenSharing = ref(false)
const showParticipants = ref(false)
const newMessage = ref("")

// Participants
const participants = ref([
  {
    id: "1",
    name: "张三",
    isHost: true,
    isAudioEnabled: true,
    isVideoEnabled: true,
    avatar: null
  },
  {
    id: "2",
    name: "李四",
    isHost: false,
    isAudioEnabled: true,
    isVideoEnabled: false,
    avatar: null
  },
  {
    id: "3",
    name: "王五",
    isHost: false,
    isAudioEnabled: false,
    isVideoEnabled: true,
    avatar: null
  }
])

const currentSpeaker = ref(participants.value[0])

// Messages
const messages = ref([
  {
    id: "1",
    sender: "张三",
    content: "欢迎大家参加今天的会议！",
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: "2",
    sender: "李四",
    content: "感谢组织这次讨论会。",
    timestamp: new Date(Date.now() - 3 * 60 * 1000)
  },
  {
    id: "3",
    sender: "王五",
    content: "期待今天的讨论内容。",
    timestamp: new Date(Date.now() - 1 * 60 * 1000)
  }
])

function formatMeetingTime(startTime: Date) {
  const now = new Date()
  const diff = now.getTime() - startTime.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  }
  return `${minutes}m`
}

function formatMessageTime(timestamp: Date) {
  return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function toggleAudio() {
  isAudioEnabled.value = !isAudioEnabled.value
}

function toggleVideo() {
  isVideoEnabled.value = !isVideoEnabled.value
}

function setCurrentSpeaker(participant: typeof participants.value[0]) {
  currentSpeaker.value = participant
}

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: Date.now().toString(),
      sender: "我",
      content: newMessage.value.trim(),
      timestamp: new Date()
    })
    newMessage.value = ""
  }
}

function leaveMeeting() {
  navigateTo("/")
}

// Page metadata
definePageMeta({
  layout: false
})
</script>
