<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

// SEO 和元数据
useHead({
  title: "首页",
  meta: [{ name: "description", content: "在线会议管理系统 - 与您的团队连接" }],
});

// 响应式状态
const showCreateRoom = ref(false);
const showJoinRoom = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
const sortBy = ref("recent");

// 创建房间表单
const createRoomSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "房间名称不能为空"),
    description: z.string().optional(),
    maxParticipants: z.number().min(1).max(100),
  }),
);

const createRoomForm = useForm({
  validationSchema: createRoomSchema,
  initialValues: {
    name: "",
    description: "",
    maxParticipants: 10,
  },
});

// 加入房间表单
const joinRoomSchema = toTypedSchema(
  z.object({
    roomId: z.string().min(6, "房间ID必须是6位").max(6, "房间ID必须是6位"),
  }),
);

const joinRoomForm = useForm({
  validationSchema: joinRoomSchema,
  initialValues: {
    roomId: "",
  },
});

// 模拟房间数据
const mockRooms = [
  {
    id: "room-1",
    name: "每日站会",
    description: "与开发团队快速同步，讨论进展和阻碍问题。",
    participants: 8,
    maxParticipants: 10,
    startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    status: "waiting" as "active" | "waiting" | "ended",
    avatars: ["张三", "李四", "王五", "赵六"],
    host: "张三",
    category: "scheduled",
  },
  {
    id: "room-2",
    name: "产品评审",
    description: "与利益相关者和设计团队的每周产品评审会议。",
    participants: 5,
    maxParticipants: 25,
    startTime: new Date().toISOString(),
    status: "active" as "active" | "waiting" | "ended",
    avatars: ["马小明", "陈晓红", "刘小华", "田小康", "孙小美"],
    host: "马小明",
    category: "active",
  },
  {
    id: "room-3",
    name: "客户汇报",
    description: "向我们最重要客户汇报第四季度成果。",
    participants: 15,
    maxParticipants: 50,
    startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: "active" as "active" | "waiting" | "ended",
    avatars: ["戴小康", "冯小丽", "高小博", "何小敏"],
    host: "戴小康",
    category: "active",
  },
];

// 计算属性
const totalRooms = computed(() => mockRooms.length);
const activeMeetings = computed(
  () => mockRooms.filter((room) => room.status === "active").length,
);
const totalParticipants = computed(() =>
  mockRooms.reduce((sum, room) => sum + room.participants, 0),
);
const availableSlots = computed(() =>
  mockRooms.reduce(
    (sum, room) => sum + (room.maxParticipants - room.participants),
    0,
  ),
);

const filteredRooms = computed(() => {
  let rooms = [...mockRooms];

  // 搜索过滤
  if (searchQuery.value) {
    rooms = rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        room.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        room.host.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  // 状态过滤
  if (statusFilter.value !== "all") {
    rooms = rooms.filter((room) => room.status === statusFilter.value);
  }

  // 排序
  if (sortBy.value === "recent") {
    rooms.sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
    );
  } else if (sortBy.value === "participants") {
    rooms.sort((a, b) => b.participants - a.participants);
  } else if (sortBy.value === "name") {
    rooms.sort((a, b) => a.name.localeCompare(b.name));
  }

  return rooms;
});

// 方法
const handleCreateRoom = createRoomForm.handleSubmit(async (values) => {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log("Creating room:", values);
  showCreateRoom.value = false;
  navigateTo(`/meeting/${roomId}`);
});

const handleJoinRoom = joinRoomForm.handleSubmit(async (values) => {
  navigateTo(`/meeting/${values.roomId}`);
});

function joinRoom(room: (typeof mockRooms)[0]) {
  navigateTo(`/meeting/${room.id}`);
}

function previewRoom(room: (typeof mockRooms)[0]) {
  console.log("Preview room:", room);
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="text-center mb-10">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        欢迎来到会议室
      </h1>
      <p
        class="text-xl text-muted-foreground leading-7 mt-6 mb-6 max-w-2xl mx-auto"
      >
        与您的团队即时连接。加入现有房间或创建您自己的会议空间。
      </p>

      <div
        class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
      >
        <Button size="lg" @click="showCreateRoom = true">
          <Icon name="lucide:plus" class="w-5 h-5 mr-2" />
          创建新房间
        </Button>
        <Button variant="outline" size="lg" @click="showJoinRoom = true">
          <Icon name="lucide:log-in" class="w-5 h-5 mr-2" />
          通过ID加入
        </Button>
      </div>
    </section>

    <!-- Room Statistics -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card class="hover:shadow-lg transition-all duration-300">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <small class="text-muted-foreground font-medium">房间总数</small>
              <p class="text-2xl font-bold">{{ totalRooms }}</p>
            </div>
            <div
              class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center"
            >
              <Icon name="lucide:home" class="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <small class="text-muted-foreground font-medium">活跃会议</small>
              <p class="text-2xl font-bold">{{ activeMeetings }}</p>
            </div>
            <div
              class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center"
            >
              <Icon name="lucide:video" class="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <small class="text-muted-foreground font-medium">参与人数</small>
              <p class="text-2xl font-bold">{{ totalParticipants }}</p>
            </div>
            <div
              class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center"
            >
              <Icon name="lucide:users" class="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="hover:shadow-lg transition-all duration-300">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <small class="text-muted-foreground font-medium">可用席位</small>
              <p class="text-2xl font-bold">{{ availableSlots }}</p>
            </div>
            <div
              class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center"
            >
              <Icon
                name="lucide:users-round"
                class="w-6 h-6 text-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <!-- Filters and Search -->
    <section class="mb-6">
      <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div class="relative w-full md:w-80">
          <Icon
            name="lucide:search"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="搜索房间..."
            class="pl-10"
          />
        </div>

        <div class="flex items-center space-x-3">
          <Select v-model="statusFilter">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">进行中</SelectItem>
                <SelectItem value="waiting">等待中</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select v-model="sortBy">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="recent">最新</SelectItem>
                <SelectItem value="participants">参与人数</SelectItem>
                <SelectItem value="name">按名称</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>

    <!-- Room Grid -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-900">可用房间</h2>
        <p class="text-slate-600">找到 {{ filteredRooms.length }} 个房间</p>
      </div>

      <div v-if="filteredRooms.length === 0" class="text-center py-12">
        <div
          class="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon
            name="lucide:search-x"
            class="w-12 h-12 text-muted-foreground"
          />
        </div>
        <h3 class="text-lg font-semibold mb-2">未找到房间</h3>
        <p class="text-muted-foreground mb-6">
          请尝试调整搜索条件或创建新房间。
        </p>
        <Button @click="showCreateRoom = true"> 创建您的第一个房间 </Button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoomCard
          v-for="room in filteredRooms"
          :key="room.id"
          :room="room"
          @join="joinRoom"
          @preview="previewRoom"
        />
      </div>
    </section>

    <!-- Create Room Modal -->
    <Dialog v-model:open="showCreateRoom">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>创建新房间</DialogTitle>
        </DialogHeader>

        <form class="space-y-3" @submit="handleCreateRoom">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>房间名称</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="输入房间名称"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>描述（可选）</FormLabel>
              <FormControl>
                <Textarea
                  rows="3"
                  placeholder="会议的简要描述"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="maxParticipants">
            <FormItem>
              <FormLabel>最大参与人数</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择人数" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem :value="5">5 人</SelectItem>
                    <SelectItem :value="10">10 人</SelectItem>
                    <SelectItem :value="25">25 人</SelectItem>
                    <SelectItem :value="50">50 人</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <DialogFooter class="flex gap-3">
            <Button
              type="button"
              variant="outline"
              @click="showCreateRoom = false"
            >
              取消
            </Button>
            <Button type="submit"> 创建房间 </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Join Room Modal -->
    <Dialog v-model:open="showJoinRoom">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>加入房间</DialogTitle>
        </DialogHeader>

        <form class="space-y-3" @submit="handleJoinRoom">
          <FormField v-slot="{ componentField }" name="roomId">
            <FormItem>
              <FormLabel>房间 ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  class="font-mono"
                  placeholder="输入6位房间ID"
                  maxlength="6"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <DialogFooter class="flex gap-3">
            <Button
              type="button"
              variant="outline"
              @click="showJoinRoom = false"
            >
              取消
            </Button>
            <Button type="submit"> 加入房间 </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
