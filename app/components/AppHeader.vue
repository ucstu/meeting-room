<template>
  <header class="bg-background/80 backdrop-blur-sm border-b">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4"
    >
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
          >
            <Icon name="lucide:video" class="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-xl font-semibold leading-none tracking-tight">
              会议室
            </h1>
            <p class="text-muted-foreground">与您的团队连接</p>
          </div>
        </div>
      </div>

      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink
          to="/"
          class="text-muted-foreground hover:text-foreground font-medium transition-colors"
          active-class="text-primary"
        >
          首页
        </NuxtLink>
        <NuxtLink
          to="/rooms"
          class="text-muted-foreground hover:text-foreground font-medium transition-colors"
          active-class="text-primary"
        >
          房间列表
        </NuxtLink>
      </nav>

      <div class="flex items-center space-x-2">
        <Button @click="showCreateRoom = true">
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          新建会议
        </Button>

        <CreateRoomModal v-model="showCreateRoom" @create="handleCreateRoom" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
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
