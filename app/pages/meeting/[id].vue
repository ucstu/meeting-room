<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header
      class="bg-background/95 backdrop-blur-sm border-b px-6 py-4 flex items-center justify-between"
    >
      <div class="flex items-center space-x-4">
        <Button variant="ghost" @click="navigateTo('/')">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          返回大厅
        </Button>
        <div>
          <h1 class="text-lg font-semibold">
            {{ roomInfo.name }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ participants.length }} 位参与者 • 会议 ID: {{ roomId }}
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <!-- Meeting Time -->
        <Badge variant="secondary" class="px-4 py-2">
          {{ formatMeetingTime(meetingStartTime) }}
        </Badge>

        <!-- Settings -->
        <Button variant="ghost" size="sm">
          <Icon name="lucide:settings" class="w-4 h-4" />
        </Button>
      </div>
    </header>

    <div class="flex-1 flex">
      <!-- Main Video Area -->
      <div class="flex-1 p-6">
        <!-- Speaker View -->
        <div class="h-full flex flex-col">
          <Card class="flex-1 relative overflow-hidden mb-4">
            <CardContent
              class="absolute inset-0 flex items-center justify-center p-0"
            >
              <div class="text-center">
                <Avatar class="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback class="text-2xl">
                    {{ currentSpeaker?.name?.charAt(0) || "?" }}
                  </AvatarFallback>
                </Avatar>
                <h3 class="text-xl font-semibold mb-2">
                  {{ currentSpeaker?.name || "无发言者" }}
                </h3>
                <p class="text-muted-foreground">
                  {{ currentSpeaker?.isHost ? "主持人" : "参与者" }}
                </p>
              </div>
            </CardContent>
            <!-- Video Controls Overlay -->
            <div class="absolute bottom-4 left-4 right-4 flex justify-center">
              <Card class="px-6 py-3">
                <CardContent class="flex items-center space-x-4 p-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    :class="!isAudioEnabled && 'text-destructive'"
                    @click="toggleAudio"
                  >
                    <Icon
                      :name="isAudioEnabled ? 'lucide:mic' : 'lucide:mic-off'"
                      class="w-4 h-4"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    :class="!isVideoEnabled && 'text-destructive'"
                    @click="toggleVideo"
                  >
                    <Icon
                      :name="
                        isVideoEnabled ? 'lucide:video' : 'lucide:video-off'
                      "
                      class="w-4 h-4"
                    />
                  </Button>
                  <Button variant="destructive" size="sm" @click="leaveMeeting">
                    <Icon name="lucide:phone-off" class="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Card>

          <!-- Participants Grid -->
          <div class="grid grid-cols-4 gap-2">
            <Card
              v-for="participant in participants"
              :key="participant.id"
              class="aspect-video relative cursor-pointer transition-all hover:ring-2 hover:ring-primary"
              :class="
                currentSpeaker?.id === participant.id && 'ring-2 ring-primary'
              "
              @click="setCurrentSpeaker(participant)"
            >
              <CardContent
                class="absolute inset-0 flex items-center justify-center p-0"
              >
                <div class="text-center">
                  <Avatar class="w-8 h-8 mx-auto mb-1">
                    <AvatarFallback class="text-sm">
                      {{ participant.name.charAt(0) }}
                    </AvatarFallback>
                  </Avatar>
                  <p class="text-xs font-medium truncate px-1">
                    {{ participant.name }}
                  </p>
                </div>
              </CardContent>
              <!-- Audio Indicator -->
              <div
                v-if="!participant.isAudioEnabled"
                class="absolute top-1 right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
              >
                <Icon
                  name="lucide:mic-off"
                  class="w-3 h-3 text-destructive-foreground"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Chat Panel -->
      <div class="w-80 border-l">
        <ChatPanel :participants="participants" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "full",
});

interface Participant {
  id: string;
  name: string;
  initials: string;
  isHost: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
}

// Get room ID from route
const route = useRoute();
const roomId = route.params.id as string;

// Reactive state
const isAudioEnabled = ref(true);
const isVideoEnabled = ref(true);

// Mock data
const roomInfo = reactive({
  name: "技术讨论会议",
  id: roomId,
});

const participants = ref<Participant[]>([
  {
    id: "user-1",
    name: "张三",
    initials: "张",
    isHost: true,
    isAudioEnabled: true,
    isVideoEnabled: true,
  },
  {
    id: "user-2",
    name: "李四",
    initials: "李",
    isHost: false,
    isAudioEnabled: false,
    isVideoEnabled: true,
  },
  {
    id: "user-3",
    name: "王五",
    initials: "王",
    isHost: false,
    isAudioEnabled: true,
    isVideoEnabled: false,
  },
  {
    id: "user-4",
    name: "赵六",
    initials: "赵",
    isHost: false,
    isAudioEnabled: true,
    isVideoEnabled: true,
  },
]);

const currentSpeaker = ref<Participant | null>(participants.value[0] || null);
const meetingStartTime = ref(new Date());

// Methods
const formatMeetingTime = (time: Date) => {
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, "0")}:${Math.floor(
      (diff % 60000) / 1000,
    )
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${Math.floor((diff % 60000) / 1000)
    .toString()
    .padStart(2, "0")}`;
};

const toggleAudio = () => {
  isAudioEnabled.value = !isAudioEnabled.value;
};

const toggleVideo = () => {
  isVideoEnabled.value = !isVideoEnabled.value;
};

const leaveMeeting = () => {
  if (confirm("确定要离开会议吗？")) {
    navigateTo("/");
  }
};

const setCurrentSpeaker = (participant: Participant) => {
  currentSpeaker.value = participant;
};

// SEO
useHead({
  title: `${roomInfo.name} - 会议室`,
  meta: [{ name: "description", content: "在线会议正在进行中" }],
});
</script>
