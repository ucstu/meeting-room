<template>
  <div
    :class="
      cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        triggerClass
      )
    "
  >
    <div v-if="model" class="flex-1 truncate">
      {{ model }}
    </div>
    <div v-else class="text-muted-foreground">
      {{ placeholder }}
    </div>
    <ChevronDownIcon class="h-4 w-4 opacity-50" />
  </div>
  <div v-if="model" class="mt-2">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

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
