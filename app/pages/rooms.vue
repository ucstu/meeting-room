<script lang="ts" setup>
// SEO 和元数据
useHead({
  title: "房间列表",
  meta: [
    {
      name: "description",
      content: "浏览所有可用的会议房间，加入或创建新的会议",
    },
  ],
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
  {
    id: "room-4",
    name: "技术分享",
    description: "分享最新的前端技术趋势和最佳实践。",
    participants: 0,
    maxParticipants: 20,
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "ended" as "active" | "waiting" | "ended",
    avatars: ["林小技", "程小码"],
    host: "林小技",
    category: "recent",
  },
];

// 响应式状态
const searchQuery = ref("");
const statusFilter = ref("all");
const sortBy = ref("recent");
const showCreateRoom = ref(false);

// 计算属性
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

const activeRooms = computed(() =>
  mockRooms.filter((room) => room.status === "active"),
);
const scheduledRooms = computed(() =>
  mockRooms.filter((room) => room.status === "waiting"),
);
const recentRooms = computed(() =>
  mockRooms.filter((room) => room.status === "ended"),
);

// 方法
function joinRoom(room: (typeof mockRooms)[0]) {
  navigateTo(`/meeting/${room.id}`);
}

function previewRoom(room: (typeof mockRooms)[0]) {
  console.log("Preview room:", room);
}

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

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <section class="mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold mb-2">房间列表</h1>
          <p class="text-lg text-muted-foreground">
            浏览所有可用的会议房间，加入或创建新的会议。
          </p>
        </div>
        <Button size="lg" @click="showCreateRoom = true">
          <Icon name="lucide:plus" class="w-5 h-5 mr-2" />
          创建新房间
        </Button>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
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

        <div class="flex items-center gap-3">
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

    <!-- Room Categories -->
    <section class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="hover:shadow-lg transition-all">
          <CardContent class="p-6">
            <div class="flex items-center justify-between mb-4">
              <CardTitle class="text-lg">进行中</CardTitle>
              <Badge variant="default">
                {{ activeRooms.length }}
              </Badge>
            </div>
            <p class="text-muted-foreground">当前正在进行的会议</p>
          </CardContent>
        </Card>

        <Card class="hover:shadow-lg transition-all">
          <CardContent class="p-6">
            <div class="flex items-center justify-between mb-4">
              <CardTitle class="text-lg">已安排</CardTitle>
              <Badge variant="secondary">
                {{ scheduledRooms.length }}
              </Badge>
            </div>
            <p class="text-muted-foreground">即将开始的预定会议</p>
          </CardContent>
        </Card>

        <Card class="hover:shadow-lg transition-all">
          <CardContent class="p-6">
            <div class="flex items-center justify-between mb-4">
              <CardTitle class="text-lg">最近结束</CardTitle>
              <Badge variant="outline">
                {{ recentRooms.length }}
              </Badge>
            </div>
            <p class="text-muted-foreground">最近完成的会议记录</p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Room List -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">可用房间</h2>
        <p class="text-muted-foreground">
          找到 {{ filteredRooms.length }} 个房间
        </p>
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
    <CreateRoomModal v-model="showCreateRoom" @create="handleCreateRoom" />
  </div>
</template>
