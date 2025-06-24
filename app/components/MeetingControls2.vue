<script setup lang="ts">
import { MicrophoneIcon as MicrophoneSlashIcon } from "@heroicons/vue/24/outline";
import {
  MicrophoneIcon,
  PhoneIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/vue/24/solid";

interface Props {
  isMicOn: boolean;
  isCameraOn: boolean;
  isSpeakerOn: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  toggleMic: [];
  toggleCamera: [];
  toggleSpeaker: [];
  leaveMeeting: [];
}>();
</script>

<template>
  <div
    class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full px-6 py-3 flex items-center space-x-4 shadow-lg"
  >
    <!-- 麦克风控制 -->
    <button
      :class="[
        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
        isMicOn
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-red-600 hover:bg-red-700',
      ]"
      :title="isMicOn ? '关闭麦克风' : '打开麦克风'"
      @click="emit('toggleMic')"
    >
      <MicrophoneIcon v-if="isMicOn" class="w-5 h-5" />
      <MicrophoneSlashIcon v-else class="w-5 h-5" />
    </button>

    <!-- 视频控制 -->
    <button
      :class="[
        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
        isCameraOn
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-red-600 hover:bg-red-700',
      ]"
      :title="isCameraOn ? '关闭摄像头' : '打开摄像头'"
      @click="emit('toggleCamera')"
    >
      <VideoCameraIcon v-if="isCameraOn" class="w-5 h-5" />
      <VideoCameraSlashIcon v-else class="w-5 h-5" />
    </button>

    <!-- 扬声器控制 -->
    <button
      :class="[
        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
        isSpeakerOn
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-red-600 hover:bg-red-700',
      ]"
      :title="isSpeakerOn ? '关闭扬声器' : '打开扬声器'"
      @click="emit('toggleSpeaker')"
    >
      <SpeakerWaveIcon class="w-5 h-5" />
    </button>

    <!-- 挂断 -->
    <button
      class="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
      title="离开会议"
      @click="emit('leaveMeeting')"
    >
      <PhoneIcon class="w-5 h-5 transform rotate-[135deg]" />
    </button>
  </div>
</template>
