<template>
  <Card class="h-full flex flex-col">
    <!-- Chat Header -->
    <CardHeader class="pb-4">
      <div class="flex items-center justify-between">
        <CardTitle class="text-xl font-semibold">聊天</CardTitle>
        <div class="flex items-center space-x-2">
          <p class="text-sm text-muted-foreground">
            {{ participants.length }} 位参与者
          </p>
          <Button variant="ghost" size="sm">
            <Icon name="lucide:more-horizontal" class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardHeader>

    <!-- Messages Area -->
    <CardContent class="flex-1 overflow-y-auto space-y-3 p-4">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex items-start space-x-2"
        :class="{ 'flex-row-reverse space-x-reverse': message.isOwnMessage }"
      >
        <Avatar class="w-8 h-8">
          <AvatarFallback class="bg-muted text-muted-foreground text-xs">
            {{ message.user.initials }}
          </AvatarFallback>
        </Avatar>
        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2 mb-1">
            <p class="text-sm font-medium">{{ message.user.name }}</p>
            <small class="text-muted-foreground">
              {{ formatTime(message.timestamp) }}
            </small>
          </div>
          <div
            class="inline-block px-3 py-2 rounded-lg text-sm leading-relaxed"
            :class="
              message.isOwnMessage
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            "
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div
        v-if="typingUsers.length > 0"
        class="flex items-center space-x-2 text-sm text-muted-foreground"
      >
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
          <div
            class="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
            style="animation-delay: 0.2s"
          />
          <div
            class="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
            style="animation-delay: 0.4s"
          />
        </div>
        <p class="text-muted-foreground">
          {{ formatTypingUsers(typingUsers) }} 正在输入...
        </p>
      </div>
    </CardContent>

    <!-- Message Input -->
    <CardContent class="p-4 border-t">
      <form class="flex items-center space-x-2" @submit="sendMessage">
        <FormField v-slot="{ componentField }" name="message">
          <FormItem class="flex-1">
            <div class="relative">
              <FormControl>
                <Input
                  type="text"
                  placeholder="输入消息..."
                  class="pr-12"
                  v-bind="componentField"
                  @input="handleTyping"
                  @keydown.enter.prevent="sendMessage"
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                @click="toggleEmojiPicker"
              >
                <Icon name="lucide:smile" class="w-4 h-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" size="sm">
          <Icon name="lucide:send" class="w-4 h-4" />
        </Button>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

interface User {
  id: string;
  name: string;
  initials: string;
}

interface Message {
  id: string;
  text: string;
  user: User;
  timestamp: string;
  isOwnMessage: boolean;
}

interface Props {
  participants: User[];
}

defineProps<Props>();

// 消息表单验证
const messageSchema = toTypedSchema(
  z.object({
    message: z
      .string()
      .min(1, "消息不能为空")
      .max(500, "消息长度不能超过500个字符"),
  }),
);

const messageForm = useForm({
  validationSchema: messageSchema,
  initialValues: {
    message: "",
  },
});

// Sample data
const currentUser: User = {
  id: "user-1",
  name: "You",
  initials: "YU",
};

const messages = ref<Message[]>([
  {
    id: "msg-1",
    text: "大家好！准备开始会议了吗？",
    user: { id: "user-2", name: "张三", initials: "张" },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isOwnMessage: false,
  },
  {
    id: "msg-2",
    text: "好的，让我分享一下屏幕",
    user: currentUser,
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    isOwnMessage: true,
  },
  {
    id: "msg-3",
    text: "完美！我能清楚地看到。",
    user: { id: "user-3", name: "李四", initials: "李" },
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    isOwnMessage: false,
  },
  {
    id: "msg-4",
    text: "太棒了！让我们继续议程吧。",
    user: { id: "user-4", name: "王五", initials: "王" },
    timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    isOwnMessage: false,
  },
]);

const typingUsers = ref<User[]>([]);
const showEmojiPicker = ref(false);

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatTypingUsers = (users: User[]) => {
  if (users.length === 1) return users[0]?.name || "";
  if (users.length === 2)
    return `${users[0]?.name || ""} 和 ${users[1]?.name || ""}`;
  return `${users[0]?.name || ""} 和其他 ${users.length - 1} 人`;
};

const sendMessage = messageForm.handleSubmit(async (values) => {
  const message: Message = {
    id: `msg-${Date.now()}`,
    text: values.message.trim(),
    user: currentUser,
    timestamp: new Date().toISOString(),
    isOwnMessage: true,
  };

  messages.value.push(message);
  messageForm.resetForm();

  // Scroll to bottom
  nextTick(() => {
    const messagesContainer = document.querySelector(".overflow-y-auto");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
});

const handleTyping = () => {
  // Handle typing indicator logic
  // In a real app, this would emit typing events to other users
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// Auto-scroll to bottom when new messages arrive
watch(
  messages,
  () => {
    nextTick(() => {
      const messagesContainer = document.querySelector(".overflow-y-auto");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  },
  { deep: true },
);
</script>
