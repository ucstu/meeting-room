<script setup lang="ts">
interface Participant {
  id: number;
  name: string;
  isMicOn: boolean;
  isCameraOn: boolean;
  avatar: string;
}

interface Props {
  participants: Participant[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
    <ParticipantVideo
      v-for="participant in participants"
      :key="participant.id"
      :participant="participant"
    />
  </div>
</template>
