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
          <Button
            class="text-slate-400 hover:text-slate-600 transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            <span class="text-xl">✕</span>
          </Button>
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
              <div class="relative">
                <select
                  v-model="formData.maxParticipants"
                  class="appearance-none w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="5">
                    {{ currentLang === "zh" ? "5 人" : "5 People" }}
                  </option>
                  <option value="10">
                    {{ currentLang === "zh" ? "10 人" : "10 People" }}
                  </option>
                  <option value="25">
                    {{ currentLang === "zh" ? "25 人" : "25 People" }}
                  </option>
                  <option value="50">
                    {{ currentLang === "zh" ? "50 人" : "50 People" }}
                  </option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <Icon name="lucide:chevron-down" class="h-4 w-4 opacity-50" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-8">
            <Button
              type="Button"
              class="flex-1 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
              @click="$emit('update:modelValue', false)"
            >
              {{ currentLang === "zh" ? "取消" : "Cancel" }}
            </Button>
            <Button
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {{ currentLang === "zh" ? "创建房间" : "Create Room" }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
  (
    e: "create",
    data: { name: string; description: string; maxParticipants: number },
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
