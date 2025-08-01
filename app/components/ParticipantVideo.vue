<template>
  <div class="relative group">
    <div
      class="relative bg-muted rounded-lg overflow-hidden aspect-video cursor-pointer hover:ring-2 hover:ring-ring transition-all"
      :class="{ 'ring-2 ring-ring': isActive }"
      @click="$emit('click')"
    >
      <!-- Video Stream -->
      <video
        v-if="participant.videoEnabled"
        ref="videoRef"
        class="w-full h-full object-cover"
        :muted="participant.id === currentUserId"
        autoplay
        playsinline
      />

      <!-- Avatar when video is disabled -->
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-muted"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-background border-2 border-border rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <Icon name="lucide:user" class="w-8 h-8 text-muted-foreground" />
          </div>
          <p class="text-foreground text-sm font-medium">
            {{ participant.name }}
          </p>
        </div>
      </div>

      <!-- Participant Info Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div
        class="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div class="flex items-center space-x-2">
          <span
            class="text-foreground text-sm font-medium bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md"
          >
            {{ participant.name }}
          </span>
          <span
            v-if="participant.isHost"
            class="px-2 py-1 bg-primary text-xs font-medium text-primary-foreground rounded-md"
          >
            Host
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Audio Status -->
          <div
            class="w-8 h-8 rounded-md flex items-center justify-center backdrop-blur-sm"
            :class="
              participant.audioEnabled ? 'bg-green-600/80' : 'bg-red-600/80'
            "
          >
            <Icon
              :name="participant.audioEnabled ? 'lucide:mic' : 'lucide:mic-off'"
              class="w-4 h-4 text-white"
            />
          </div>

          <!-- Video Status -->
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
            :class="
              participant.videoEnabled ? 'bg-green-600/80' : 'bg-red-600/80'
            "
          >
            <Icon
              :name="
                participant.videoEnabled ? 'lucide:video' : 'lucide:video-off'
              "
              class="w-4 h-4 text-white"
            />
          </div>
        </div>
      </div>

      <!-- Speaking Indicator -->
      <div
        v-if="participant.isSpeaking"
        class="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"
      />

      <!-- Pin Button -->
      <Button
        v-if="!isMainView"
        class="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all"
        @click.stop="$emit('pin')"
      >
        <Icon name="lucide:pin" class="w-4 h-4 text-white" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  isSpeaking?: boolean;
}

const props = defineProps<{
  participant: Participant;
  isActive?: boolean;
  isMainView?: boolean;
  currentUserId?: string;
}>();

const _emit = defineEmits<{
  click: [];
  pin: [];
}>();

const videoRef = ref<HTMLVideoElement>();

// Simulate video stream for demo purposes
onMounted(() => {
  if (props.participant.videoEnabled && videoRef.value) {
    // In a real app, you would set the video source here
    // videoRef.value.srcObject = mediaStream
  }
});
</script>
