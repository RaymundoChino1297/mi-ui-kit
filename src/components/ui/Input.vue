<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "../../lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  errors?: string;
  label?: string;
  type?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="props.label" :for="$attrs.id" class="text-sm">
      {{ props.label }}
    </label>
    <input
      v-bind="$attrs"
      v-model="modelValue"
      data-slot="input"
      :type="props.type"
      :class="
        cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input border-border flex  w-full min-w-0 rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          props.errors &&
            'ring-destructive/20 dark:ring-destructive/40 border-destructive',
          props.class
        )
      "
    />
    <p v-if="errors" class="text-destructive text-sm leading-none">
      {{ props.errors }}
    </p>
  </div>
</template>
