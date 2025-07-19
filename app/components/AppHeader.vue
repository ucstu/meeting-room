<template>
  <header
    class="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <span class="text-white text-sm">📹</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-900">
              {{ currentLanguage === "zh" ? "会议室" : "Meeting Room" }}
            </h1>
            <p class="text-sm text-slate-500">
              {{
                currentLanguage === "zh"
                  ? "与您的团队连接"
                  : "Connect with your team"
              }}
            </p>
          </div>
        </div>
      </div>

      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink
          to="/"
          class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          active-class="text-blue-600"
        >
          {{ currentLanguage === "zh" ? "首页" : "Home" }}
        </NuxtLink>
        <NuxtLink
          to="/rooms"
          class="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          active-class="text-blue-600"
        >
          {{ currentLanguage === "zh" ? "房间列表" : "Rooms" }}
        </NuxtLink>
      </nav>

      <div class="flex items-center space-x-3">
        <!-- Language Switcher -->
        <div class="relative">
          <Select v-model="currentLanguage">
            <SelectTrigger class="w-[120px]">
              <SelectValue placeholder="选择语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
          @click="showCreateRoom = true"
        >
          <span class="mr-2">➕</span>
          {{ currentLanguage === "zh" ? "新建会议" : "New Meeting" }}
        </Button>

        <CreateRoomModal v-model="showCreateRoom" @create="handleCreateRoom" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentLanguage = ref("zh");
const showCreateRoom = ref(false);

function handleCreateRoom(roomData: {
  name: string;
  description: string;
  maxParticipants: number;
}) {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log("Creating room:", roomData);

  navigateTo(`/meeting/${roomId}`);
}
</script>

<style scoped>
/* 添加任何额外的样式 */
</style>
