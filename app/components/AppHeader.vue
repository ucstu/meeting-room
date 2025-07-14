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
          <button
            class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border-0 flex items-center space-x-2"
            @click="isOpen = !isOpen"
          >
            <span>{{ currentLanguage === "zh" ? "中文" : "English" }}</span>
            <Icon
              name="lucide:chevron-down"
              class="h-4 w-4 opacity-50"
              aria-hidden="true"
            />
          </button>

          <div
            v-if="isOpen"
            class="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <button
              class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              @click="switchLanguage('zh')"
            >
              中文
            </button>
            <button
              class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              @click="switchLanguage('en')"
            >
              English
            </button>
          </div>
        </div>

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
          @click="createNewMeeting"
        >
          <span class="mr-2">➕</span>
          {{ currentLanguage === "zh" ? "新建会议" : "New Meeting" }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentLanguage = ref("zh");
const isOpen = ref(false);

const switchLanguage = (lang: string) => {
  currentLanguage.value = lang;
  isOpen.value = false;
  console.log("切换语言到:", currentLanguage.value);
};

const createNewMeeting = () => {
  navigateTo("/rooms");
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
