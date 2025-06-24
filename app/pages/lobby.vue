<script setup lang="ts">
import { ClockIcon, UserIcon } from "@heroicons/vue/24/outline";

// 会议室列表
const meetingRooms = ref([
  {
    id: 1,
    name: "产品讨论会",
    participants: 5,
    maxParticipants: 10,
    startTime: "14:30",
    status: "active" as const,
    description: "产品功能规划讨论",
  },
  {
    id: 2,
    name: "技术分享会",
    participants: 8,
    maxParticipants: 15,
    startTime: "15:00",
    status: "waiting" as const,
    description: "前端技术分享",
  },
  {
    id: 3,
    name: "周例会",
    participants: 0,
    maxParticipants: 20,
    startTime: "16:00",
    status: "scheduled" as const,
    description: "团队周会",
  },
]);

const getStatusClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-600 text-white";
    case "waiting":
      return "bg-yellow-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "进行中";
    case "waiting":
      return "等待中";
    default:
      return "已安排";
  }
};

const getButtonClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-600 hover:bg-green-700 text-white";
    case "waiting":
      return "bg-blue-600 hover:bg-blue-700 text-white";
    default:
      return "bg-gray-600 hover:bg-gray-500 text-white";
  }
};

const getButtonText = (status: string) => {
  switch (status) {
    case "active":
      return "立即加入";
    case "waiting":
      return "加入等待";
    default:
      return "预约加入";
  }
};

const joinRoom = (roomId: number) => {
  navigateTo(`/meeting/${roomId}`);
};

const createRoom = () => {
  // 创建新会议室逻辑
  alert("创建新会议室功能待实现");
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 头部 -->
    <header class="bg-gray-800 px-6 py-4 border-b border-gray-700">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-semibold">会议大厅</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
          @click="createRoom"
        >
          创建会议室
        </button>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="max-w-6xl mx-auto p-6">
      <!-- 快速加入 -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">快速加入</h2>
        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex space-x-4">
            <input
              type="text"
              placeholder="输入会议ID或链接"
              class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              加入会议
            </button>
          </div>
        </div>
      </section>

      <!-- 会议室列表 -->
      <section>
        <h2 class="text-xl font-semibold mb-4">进行中的会议</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="room in meetingRooms"
            :key="room.id"
            class="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer"
            @click="joinRoom(room.id)"
          >
            <!-- 会议状态指示 -->
            <div class="flex items-center justify-between mb-3">
              <div
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getStatusClass(room.status),
                ]"
              >
                {{ getStatusText(room.status) }}
              </div>
              <div class="flex items-center text-gray-400 text-sm">
                <ClockIcon class="w-4 h-4 mr-1" />
                {{ room.startTime }}
              </div>
            </div>

            <!-- 会议信息 -->
            <h3 class="text-lg font-semibold mb-2">
              {{ room.name }}
            </h3>
            <p class="text-gray-400 text-sm mb-4">
              {{ room.description }}
            </p>

            <!-- 参会者信息 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center text-gray-400 text-sm">
                <UserIcon class="w-4 h-4 mr-1" />
                {{ room.participants }}/{{ room.maxParticipants }} 人
              </div>
              <button
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  getButtonClass(room.status),
                ]"
                @click.stop="joinRoom(room.id)"
              >
                {{ getButtonText(room.status) }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
