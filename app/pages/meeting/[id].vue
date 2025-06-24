<script setup lang="ts">
import { useMeeting } from "~/composables/useMeeting";

// 获取路由参数
const route = useRoute();
const meetingId = route.params.id;

// 使用会议状态管理
const {
  isInMeeting,
  isMicOn,
  isCameraOn,
  isSpeakerOn,
  showChat,
  chatMessages,
  participants,
  joinMeeting,
  leaveMeeting,
  toggleMic,
  toggleCamera,
  toggleSpeaker,
  toggleChat,
  sendMessage,
  inviteParticipants,
} = useMeeting();

// 页面加载时自动加入会议
onMounted(() => {
  console.log(`加入会议室: ${meetingId}`);
  joinMeeting();
});

// 离开页面时退出会议
onBeforeUnmount(() => {
  if (isInMeeting.value) {
    leaveMeeting();
  }
});

// 重写离开会议函数，跳转回大厅
const handleLeaveMeeting = () => {
  leaveMeeting();
  navigateTo("/lobby");
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 头部工具栏 -->
    <MeetingHeader
      :participant-count="participants.length"
      :is-in-meeting="isInMeeting"
      :show-chat="showChat"
      @join-meeting="joinMeeting"
      @invite-participants="inviteParticipants"
      @toggle-chat="toggleChat"
    />

    <div class="flex h-[calc(100vh-80px)]">
      <!-- 主要视频区域 -->
      <main class="flex-1 relative">
        <!-- 视频网格 -->
        <div class="h-full p-6">
          <VideoGrid :participants="participants" />
        </div>

        <!-- 底部控制栏 -->
        <MeetingControls
          v-if="isInMeeting"
          :is-mic-on="isMicOn"
          :is-camera-on="isCameraOn"
          :is-speaker-on="isSpeakerOn"
          @toggle-mic="toggleMic"
          @toggle-camera="toggleCamera"
          @toggle-speaker="toggleSpeaker"
          @leave-meeting="handleLeaveMeeting"
        />
      </main>

      <!-- 右侧聊天面板 -->
      <ChatPanel
        :messages="chatMessages"
        :show-chat="showChat"
        @toggle-chat="toggleChat"
        @send-message="sendMessage"
      />
    </div>
  </div>
</template>
