<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <AppHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <section class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
          欢迎来到会议室
        </h1>
        <p class="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          与您的团队即时连接。加入现有房间或创建您自己的会议空间。
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center space-x-2"
            @click="showCreateRoom = true"
          >
            <Icon name="lucide:plus" class="w-5 h-5" />
            <span>创建新房间</span>
          </button>
          <button
            class="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer inline-flex items-center space-x-2"
            @click="showJoinRoom = true"
          >
            <Icon name="lucide:log-in" class="w-5 h-5" />
            <span>通过ID加入</span>
          </button>
        </div>
      </section>

      <!-- Room Statistics -->
      <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">房间总数</p>
              <p class="text-2xl font-bold text-slate-900">{{ totalRooms }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon name="lucide:home" class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">活跃会议</p>
              <p class="text-2xl font-bold text-slate-900">{{ activeMeetings }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Icon name="lucide:video" class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">参与人数</p>
              <p class="text-2xl font-bold text-slate-900">{{ totalParticipants }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Icon name="lucide:users" class="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600">可用席位</p>
              <p class="text-2xl font-bold text-slate-900">{{ availableSlots }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Icon name="lucide:users-round" class="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </section>

      <!-- Filters and Search -->
      <section class="mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索房间..."
                class="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full md:w-80"
              >
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="relative">
              <select
                v-model="statusFilter"
                class="appearance-none px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all">全部状态</option>
                <option value="active">进行中</option>
                <option value="waiting">等待中</option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Icon name="lucide:chevron-down" class="h-4 w-4 opacity-50" />
              </div>
            </div>

            <div class="relative">
              <select
                v-model="sortBy"
                class="appearance-none px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="recent">最新</option>
                <option value="participants">参与人数</option>
                <option value="name">按名称</option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Icon name="lucide:chevron-down" class="h-4 w-4 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Room Grid -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900">可用房间</h2>
          <p class="text-slate-600">找到 {{ filteredRooms.length }} 个房间</p>
        </div>

        <div
          v-if="filteredRooms.length === 0"
          class="text-center py-12"
        >
          <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="lucide:search-x" class="w-12 h-12 text-slate-400" />
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">未找到房间</h3>
          <p class="text-slate-600 mb-6">请尝试调整搜索条件或创建新房间。</p>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            @click="showCreateRoom = true"
          >
            创建您的第一个房间
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <RoomCard
            v-for="room in filteredRooms"
            :key="room.id"
            :room="room"
            @join="joinRoom"
            @preview="previewRoom"
          />
        </div>
      </section>
    </main>

    <!-- Create Room Modal -->
    <Teleport to="body">
      <div
        v-if="showCreateRoom"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="showCreateRoom = false"
      >
        <div class="bg-white rounded-2xl p-8 w-full max-w-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900">创建新房间</h3>
            <button
              class="text-slate-400 hover:text-slate-600 transition-colors"
              @click="showCreateRoom = false"
            >
              <Icon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="createRoom">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">房间名称</label>
                <input
                  v-model="newRoom.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="输入房间名称"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">描述（可选）</label>
                <textarea
                  v-model="newRoom.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="会议的简要描述"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">最大参与人数</label>
                <div class="relative">
                  <select
                    v-model="newRoom.maxParticipants"
                    class="appearance-none w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option :value="5">5 人</option>
                    <option :value="10">10 人</option>
                    <option :value="25">25 人</option>
                    <option :value="50">50 人</option>
                  </select>
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Icon name="lucide:chevron-down" class="h-4 w-4 opacity-50" />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 mt-8">
              <button
                type="button"
                class="flex-1 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
                @click="showCreateRoom = false"
              >
                取消
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                创建房间
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Join Room Modal -->
    <Teleport to="body">
      <div
        v-if="showJoinRoom"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="showJoinRoom = false"
      >
        <div class="bg-white rounded-2xl p-8 w-full max-w-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900">加入房间</h3>
            <button
              class="text-slate-400 hover:text-slate-600 transition-colors"
              @click="showJoinRoom = false"
            >
              <Icon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="joinRoomById">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">房间 ID</label>
                <input
                  v-model="joinRoomId"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                  placeholder="输入6位房间ID"
                  maxlength="6"
                >
              </div>
            </div>

            <div class="flex items-center gap-3 mt-8">
              <button
                type="button"
                class="flex-1 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
                @click="showJoinRoom = false"
              >
                取消
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                加入房间
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref
} from "vue"

// Sample data - in real app this would come from API
const mockRooms = [
  {
    id: "room-1",
    name: "每日站会",
    description: "与开发团队快速同步，讨论进展和阻碍问题。",
    participants: 8,
    maxParticipants: 10,
    startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    status: "waiting" as "active" | "waiting" | "ended",
    avatars: ["张三", "李四", "王五", "赵六"],
    host: "张三"
  },
  {
    id: "room-2",
    name: "产品评审",
    description: "与利益相关者和设计团队的每周产品评审会议。",
    participants: 5,
    maxParticipants: 25,
    startTime: new Date().toISOString(),
    status: "active" as "active" | "waiting" | "ended",
    avatars: ["马小明", "陈晓红", "刘小华", "田小康", "孙小美"],
    host: "马小明"
  },
  {
    id: "room-3",
    name: "客户汇报",
    description: "向我们最重要客户汇报第四季度成果，最终准备阶段。",
    participants: 15,
    maxParticipants: 50,
    startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: "active" as "active" | "waiting" | "ended",
    avatars: ["戴小康", "冯小丽", "高小博", "何小敏", "江小鹏", "金小琦"],
    host: "戴小康"
  }
]
console.log("Mock rooms data:", mockRooms)

// Reactive state
const searchQuery = ref("")
const statusFilter = ref("all")
const sortBy = ref("recent")
const showCreateRoom = ref(false)
const showJoinRoom = ref(false)
const joinRoomId = ref("")

const newRoom = ref({
  name: "",
  description: "",
  maxParticipants: 10
})

// Computed properties
const totalRooms = computed(() => mockRooms.length)
const activeMeetings = computed(() => mockRooms.filter(room => room.status === "active").length)
const totalParticipants = computed(() => mockRooms.reduce((sum, room) => sum + room.participants, 0))
const availableSlots = computed(() => mockRooms.reduce((sum, room) => sum + (room.maxParticipants - room.participants), 0))

const filteredRooms = computed(() => {
  let rooms = [...mockRooms]

  // Filter by search query
  if (searchQuery.value) {
    rooms = rooms.filter(room =>
      room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      room.host.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by status
  if (statusFilter.value !== "all") {
    rooms = rooms.filter(room => room.status === statusFilter.value)
  }

  // Sort rooms
  if (sortBy.value === "recent") {
    rooms.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  } else if (sortBy.value === "participants") {
    rooms.sort((a, b) => b.participants - a.participants)
  } else if (sortBy.value === "name") {
    rooms.sort((a, b) => a.name.localeCompare(b.name))
  }

  return rooms
})

// Methods
const joinRoom = (room: typeof mockRooms[0]) => {
  navigateTo(`/meeting/${room.id}`)
}

const previewRoom = (room: typeof mockRooms[0]) => {
  console.log("Preview room:", room)
}

const createRoom = () => {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
  console.log("Creating room:", newRoom.value)

  // Reset form and close modal
  newRoom.value = {
    name: "",
    description: "",
    maxParticipants: 10
  }
  showCreateRoom.value = false

  // Navigate to new room
  navigateTo(`/meeting/${roomId}`)
}

const joinRoomById = () => {
  if (joinRoomId.value.length === 6) {
    navigateTo(`/meeting/${joinRoomId.value}`)
  }
}
</script>
