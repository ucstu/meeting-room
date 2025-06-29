<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Icon
            name="lucide:video"
            class="w-8 h-8 text-white"
          />
        </div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">
          欢迎来到会议室
        </h1>
        <p class="text-slate-600 text-lg">
          与世界各地的人们连接
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div class="space-y-4">
          <!-- GitHub Login Button -->
          <Button
            class="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            @click="loginWithGitHub"
          >
            <Icon
              name="lucide:github"
              class="w-5 h-5 mr-3"
            />
            使用 GitHub 继续
          </Button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-slate-500 font-medium">或</span>
            </div>
          </div>

          <!-- Guest Login Section -->
          <div class="space-y-4">
            <div>
              <Label
                for="guestName"
                class="text-sm font-medium text-slate-700 mb-2 block"
              >
                访客姓名
              </Label>
              <Input
                id="guestName"
                v-model="guestName"
                placeholder="输入您的姓名"
                class="h-12 w-full px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button
              class="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl transition-all duration-200"
              :disabled="!guestName.trim()"
              @click="loginAsGuest"
            >
              <Icon
                name="lucide:user"
                class="w-5 h-5 mr-3"
              />
              以访客身份继续
            </Button>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="mt-8 grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Icon
              name="lucide:video"
              class="w-6 h-6 text-blue-600"
            />
          </div>
          <span class="text-sm text-slate-600 font-medium">高清视频</span>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Icon
              name="lucide:users"
              class="w-6 h-6 text-green-600"
            />
          </div>
          <span class="text-sm text-slate-600 font-medium">多人会议</span>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Icon
              name="lucide:message-circle"
              class="w-6 h-6 text-purple-600"
            />
          </div>
          <span class="text-sm text-slate-600 font-medium">实时聊天</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-slate-500">
        <p class="mb-3">继续即表示您同意我们的</p>
        <div class="flex justify-center items-center space-x-4">
          <a
            href="#"
            class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >服务条款</a>
          <span class="text-slate-300">•</span>
          <a
            href="#"
            class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >隐私政策</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const guestName = ref("")

function loginWithGitHub() {
  // 跳转到 GitHub OAuth
  navigateTo("/auth/github")
}

function loginAsGuest() {
  if (guestName.value.trim()) {
    // 将访客信息保存到本地存储或状态管理
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("guestUser", JSON.stringify({
        name: guestName.value.trim(),
        isGuest: true
      }))
    }
    // 跳转到主页
    navigateTo("/")
  }
}

// 页面元信息
definePageMeta({
  layout: false
})
</script>
