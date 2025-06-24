<script setup lang="ts">
import { useMeeting } from "~/composables/useMeeting";

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
          @leave-meeting="leaveMeeting"
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
