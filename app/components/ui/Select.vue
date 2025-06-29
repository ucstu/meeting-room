<template>
  <SelectRoot v-model="model" :disabled="disabled">
    <SelectTrigger
      :class="
        cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          triggerClass
        )
      "
    >
      <SelectValue :placeholder="placeholder" />
      <SelectIcon as-child>
        <ChevronDownIcon class="h-4 w-4 opacity-50" />
      </SelectIcon>
    </SelectTrigger>
    <SelectContent>
      <slot />
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import {
  SelectContent,
  SelectIcon,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "reka-ui";

interface Props {
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  triggerClass?: string;
}

interface Emits {
  (e: "update:modelValue", value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Select...",
  triggerClass: "",
});

const emit = defineEmits<Emits>();

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
</script>
