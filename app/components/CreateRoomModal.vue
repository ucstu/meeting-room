<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

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

// Form schema
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "房间名称不能为空"),
    description: z.string().optional(),
    maxParticipants: z.number().min(1).max(100),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
    description: "",
    maxParticipants: 10,
  },
});

const onSubmit = form.handleSubmit((values) => {
  emit("create", {
    name: values.name,
    description: values.description || "",
    maxParticipants: values.maxParticipants,
  });
  form.resetForm();
  emit("update:modelValue", false);
});
</script>

<template>
  <Dialog :open="modelValue" @update:open="$emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {{ currentLang === "zh" ? "创建新房间" : "Create New Room" }}
        </DialogTitle>
      </DialogHeader>

      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>
              {{ currentLang === "zh" ? "房间名称" : "Room Name" }}
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="
                  currentLang === 'zh' ? '输入房间名称' : 'Enter room name'
                "
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>
              {{
                currentLang === "zh" ? "描述（可选）" : "Description (Optional)"
              }}
            </FormLabel>
            <FormControl>
              <Textarea
                rows="3"
                :placeholder="
                  currentLang === 'zh'
                    ? '会议的简要描述'
                    : 'Brief description of the meeting'
                "
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="maxParticipants">
          <FormItem>
            <FormLabel>
              {{
                currentLang === "zh" ? "最大参与人数" : "Maximum Participants"
              }}
            </FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="选择人数" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="5">
                    {{ currentLang === "zh" ? "5 人" : "5 People" }}
                  </SelectItem>
                  <SelectItem :value="10">
                    {{ currentLang === "zh" ? "10 人" : "10 People" }}
                  </SelectItem>
                  <SelectItem :value="25">
                    {{ currentLang === "zh" ? "25 人" : "25 People" }}
                  </SelectItem>
                  <SelectItem :value="50">
                    {{ currentLang === "zh" ? "50 人" : "50 People" }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter class="flex gap-2">
          <Button
            type="button"
            variant="outline"
            @click="$emit('update:modelValue', false)"
          >
            {{ currentLang === "zh" ? "取消" : "Cancel" }}
          </Button>
          <Button type="submit">
            {{ currentLang === "zh" ? "创建房间" : "Create Room" }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
