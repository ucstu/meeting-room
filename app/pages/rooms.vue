<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <AppHeader />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <section class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-slate-900 mb-2">房间列表</h1>
            <p class="text-lg text-slate-600">
              浏览所有可用的会议房间，加入或创建新的会议。
            </p>
          </div>
          <Button
            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            @click="showCreateRoom = true"
          >
            <span>➕</span>
            <span>创建新房间</span>
          </Button>
        </div>
      </section>

      <!-- Filters and Search -->
      <section class="mb-8">
        <div
          class="flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div class="flex items-center space-x-4">
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                >🔍</span
              >
              <Input
                v-model="searchQuery"
                type="text"
                placeholder="搜索房间..."
                class="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full md:w-80"
              />
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="relative inline-block text-left">
              <div>
                <Button
                  type="Button"
                  class="inline-flex justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full"
                  @click="toggleStatusMenu"
                >
                  <span class="block truncate">
                    {{
                      statusFilter === "all"
                        ? "全部状态"
                        : statusFilter === "active"
                          ? "进行中"
                          : "等待中"
                    }}
                  </span>
                  <svg
                    class="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Button>
              </div>

              <div
                v-if="isStatusMenuOpen"
                class="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-Button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <div
                    role="menuitem"
                    class="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    @click="
                      statusFilter = 'all';
                      isStatusMenuOpen = false;
                    "
                  >
                    全部状态
                  </div>
                  <div
                    role="menuitem"
                    class="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    @click="
                      statusFilter = 'active';
                      isStatusMenuOpen = false;
                    "
                  >
                    进行中
                  </div>
                  <div
                    role="menuitem"
                    class="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    @click="
                      statusFilter = 'waiting';
                      isStatusMenuOpen = false;
                    "
                  >
                    等待中
                  </div>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left">
              <div>
                <Button
                  type="Button"
                  class="inline-flex justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full"
                  @click="toggleSortMenu"
                >
                  <span class="block truncate">
                    {{
                      sortBy === "recent"
                        ? "最新"
                        : sortBy === "participants"
                          ? "参与人数"
                          : "按名称"
                    }}
                  </span>
                  <svg
                    class="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Button>
              </div>

              <div
                v-if="isSortMenuOpen"
                class="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-Button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <div
                    role="menuitem"
                    class="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    @click="
                      sortBy = 'recent';
                      isSortMenuOpen = false;
                    "
                  >
                    最新
                  </div>
                  <div
                    role="menuitem"
                    class="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    @click="
                      sortBy = 'participants';
                      isSortMenuOpen = false;
                    "
                  >
                    参与人数
                  </div>
                  <div
                    role="menuitem"
                    class="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    @click="
                      sortBy = 'name';
                      isSortMenuOpen = false;
                    "
                  >
                    按名称
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Room Categories -->
      <section class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-slate-900">进行中</h3>
              <span
                class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {{ activeRooms.length }}
              </span>
            </div>
            <p class="text-slate-600">当前正在进行的会议</p>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-slate-900">已安排</h3>
              <span
                class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {{ scheduledRooms.length }}
              </span>
            </div>
            <p class="text-slate-600">即将开始的预定会议</p>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-slate-900">最近结束</h3>
              <span
                class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {{ recentRooms.length }}
              </span>
            </div>
            <p class="text-slate-600">最近完成的会议记录</p>
          </div>
        </div>
      </section>

      <!-- Room List -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900">可用房间</h2>
          <p class="text-slate-600">找到 {{ filteredRooms.length }} 个房间</p>
        </div>

        <div v-if="filteredRooms.length === 0" class="text-center py-12">
          <div
            class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="text-4xl">🔍</span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">未找到房间</h3>
          <p class="text-slate-600 mb-6">请尝试调整搜索条件或创建新房间。</p>
          <Button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            @click="showCreateRoom = true"
          >
            创建您的第一个房间
          </Button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <RoomCard
            v-for="room in filteredRooms"
            :key="room.id"
            :room="room"
            @join="joinRoom"
            @preview="previewRoom"
          />
        </div>
      </section>
    </main>

    <!-- Create Room Modal -->
    <CreateRoomModal v-model="showCreateRoom" @create="handleCreateRoom" />
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
const isStatusMenuOpen = ref(false);
const isSortMenuOpen = ref(false);

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
const joinRoom = (room: (typeof mockRooms)[0]) => {
  navigateTo(`/meeting/${room.id}`);
};

const previewRoom = (room: (typeof mockRooms)[0]) => {
  console.log("Preview room:", room);
};

const handleCreateRoom = (roomData: {
  name: string;
  description: string;
  maxParticipants: number;
}) => {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log("Creating room:", roomData);
  navigateTo(`/meeting/${roomId}`);
};

// 页面元数据
definePageMeta({
  title: "房间列表",
});
</script>
