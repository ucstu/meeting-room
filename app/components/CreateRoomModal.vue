<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="bg-white rounded-2xl p-8 w-full max-w-md">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-slate-900">
            {{ currentLang === "zh" ? "创建新房间" : "Create New Room" }}
          </h3>
          <button
            class="text-slate-400 hover:text-slate-600 transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            <span class="text-xl">✕</span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                {{ currentLang === "zh" ? "房间名称" : "Room Name" }}
              </label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                :placeholder="
                  currentLang === 'zh' ? '输入房间名称' : 'Enter room name'
                "
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                {{
                  currentLang === "zh"
                    ? "描述（可选）"
                    : "Description (Optional)"
                }}
              </label>
              <textarea
                v-model="formData.description"
                rows="3"
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                :placeholder="
                  currentLang === 'zh'
                    ? '会议的简要描述'
                    : 'Brief description of the meeting'
                "
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                {{
                  currentLang === "zh" ? "最大参与人数" : "Maximum Participants"
                }}
              </label>
              <SelectRoot v-model="formData.maxParticipants">
                <SelectTrigger
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <SelectValue />
                  <SelectIcon as-child>
                    <Icon
                      name="lucide:chevron-down"
                      class="h-4 w-4 opacity-50"
                    />
                  </SelectIcon>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem :value="5">
                    <SelectItemText>{{
                      currentLang === "zh" ? "5 人" : "5 People"
                    }}</SelectItemText>
                  </SelectItem>
                  <SelectItem :value="10">
                    <SelectItemText>{{
                      currentLang === "zh" ? "10 人" : "10 People"
                    }}</SelectItemText>
                  </SelectItem>
                  <SelectItem :value="25">
                    <SelectItemText>{{
                      currentLang === "zh" ? "25 人" : "25 People"
                    }}</SelectItemText>
                  </SelectItem>
                  <SelectItem :value="50">
                    <SelectItemText>{{
                      currentLang === "zh" ? "50 人" : "50 People"
                    }}</SelectItemText>
                  </SelectItem>
                </SelectContent>
              </SelectRoot>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-8">
            <button
              type="button"
              class="flex-1 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
              @click="$emit('update:modelValue', false)"
            >
              {{ currentLang === "zh" ? "取消" : "Cancel" }}
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {{ currentLang === "zh" ? "创建房间" : "Create Room" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "reka-ui";

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (
    e: "create",
    data: { name: string; description: string; maxParticipants: number }
  ): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

// 临时的语言状态，实际应该使用 useI18n
const currentLang = ref("zh");

const formData = ref({
  name: "",
  description: "",
  maxParticipants: 10,
});

const handleSubmit = () => {
  if (formData.value.name.trim()) {
    emit("create", { ...formData.value });

    // 重置表单
    formData.value = {
      name: "",
      description: "",
      maxParticipants: 10,
    };

    // 关闭模态框
    emit("update:modelValue", false);
  }
};
</script>
