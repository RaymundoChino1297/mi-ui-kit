<script setup>
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

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
    <textarea
      v-bind="$attrs"
      v-model="modelValue"
      data-slot="textarea"
      :class="
        cn(
          'border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          props.class
        )
      "
    />
    <p v-if="errors" class="text-destructive text-sm leading-none">
      {{ props.errors }}
    </p>
  </div>
</template>
