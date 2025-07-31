<script lang="ts" setup>
interface Room {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  status: "active" | "waiting" | "ended";
  avatars: string[];
  host: string;
  category: string;
}

interface Props {
  room: Room;
}

interface Emits {
  join: [room: Room];
  preview: [room: Room];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 计算属性
const statusConfig = computed(() => {
  switch (props.room.status) {
    case "active":
      return {
        text: "进行中",
        variant: "default" as const,
        icon: "lucide:play",
      };
    case "waiting":
      return {
        text: "等待中",
        variant: "secondary" as const,
        icon: "lucide:clock",
      };
    case "ended":
      return {
        text: "已结束",
        variant: "outline" as const,
        icon: "lucide:square",
      };
    default:
      return {
        text: "未知",
        variant: "outline" as const,
        icon: "lucide:help-circle",
      };
  }
});

const participantsPercentage = computed(() => {
  return (props.room.participants / props.room.maxParticipants) * 100;
});

const formattedStartTime = computed(() => {
  const date = new Date(props.room.startTime);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (date.getTime() - now.getTime()) / (1000 * 60),
  );

  if (props.room.status === "active") {
    return "正在进行";
  } else if (props.room.status === "ended") {
    return "已结束";
  } else if (diffInMinutes > 0) {
    if (diffInMinutes < 60) {
      return `${diffInMinutes} 分钟后开始`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} 小时后开始`;
    } else {
      return date.toLocaleDateString("zh-CN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } else {
    return "即将开始";
  }
});

// 方法
function handleJoin() {
  if (props.room.status !== "ended") {
    emit("join", props.room);
  }
}

function handlePreview() {
  emit("preview", props.room);
}
</script>

<template>
  <Card class="hover:shadow-lg transition-all duration-300">
    <CardContent class="p-6">
      <!-- 房间头部信息 -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1 min-w-0">
          <CardTitle
            class="text-xl font-semibold leading-none tracking-tight mb-1 truncate"
          >
            {{ room.name }}
          </CardTitle>
          <p class="text-muted-foreground line-clamp-2 mb-2">
            {{ room.description }}
          </p>
        </div>
        <Badge :variant="statusConfig.variant" class="flex items-center gap-1">
          <Icon :name="statusConfig.icon" class="w-3 h-3" />
          {{ statusConfig.text }}
        </Badge>
      </div>

      <!-- 主持人信息 -->
      <div class="flex items-center mb-3">
        <Avatar class="w-8 h-8 mr-3">
          <AvatarFallback class="bg-primary text-primary-foreground text-sm">
            {{ room.host.charAt(0) }}
          </AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium">{{ room.host }}</p>
          <p class="text-xs text-muted-foreground">主持人</p>
        </div>
      </div>

      <!-- 参与者头像 -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <div class="flex -space-x-2">
            <Avatar
              v-for="(avatar, index) in room.avatars.slice(0, 4)"
              :key="index"
              class="w-8 h-8 border-2 border-background"
            >
              <AvatarFallback class="bg-muted text-muted-foreground text-xs">
                {{ avatar.charAt(0) }}
              </AvatarFallback>
            </Avatar>
            <Avatar
              v-if="room.avatars.length > 4"
              class="w-8 h-8 border-2 border-background"
            >
              <AvatarFallback class="bg-muted text-muted-foreground text-xs">
                +{{ room.avatars.length - 4 }}
              </AvatarFallback>
            </Avatar>
          </div>
          <span class="ml-3 text-sm text-muted-foreground">
            {{ room.participants }}/{{ room.maxParticipants }} 人
          </span>
        </div>
      </div>

      <!-- 参与度进度条 -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <small class="text-muted-foreground">参与度</small>
          <small class="text-muted-foreground"
            >{{ Math.round(participantsPercentage) }}%</small
          >
        </div>
        <Progress :value="participantsPercentage" class="h-2" />
      </div>

      <!-- 时间信息 -->
      <div class="flex items-center mb-3 text-muted-foreground">
        <Icon name="lucide:clock" class="w-4 h-4 mr-2" />
        <small>{{ formattedStartTime }}</small>
      </div>

      <Separator class="mb-3" />

      <!-- 操作按钮 -->
      <div class="flex gap-2">
        <Button
          v-if="room.status !== 'ended'"
          class="flex-1"
          :variant="room.status === 'active' ? 'default' : 'secondary'"
          @click="handleJoin"
        >
          <Icon
            :name="room.status === 'active' ? 'lucide:play' : 'lucide:calendar'"
            class="w-4 h-4 mr-2"
          />
          {{ room.status === "active" ? "立即加入" : "预约参加" }}
        </Button>

        <Button
          v-if="room.status === 'ended'"
          class="flex-1"
          variant="secondary"
          @click="handlePreview"
        >
          <Icon name="lucide:file-text" class="w-4 h-4 mr-2" />
          查看记录
        </Button>

        <Button variant="outline" size="sm" class="px-3" @click="handlePreview">
          <Icon name="lucide:eye" class="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
