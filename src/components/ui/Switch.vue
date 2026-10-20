<script setup>
import { cn } from "@/lib/utils.js";
import { cva } from "class-variance-authority";
import { useVModel } from "@vueuse/core";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "default",
        "primary",
        "destructive",
        "success",
        "warning",
        "grape",
      ].includes(value),
  },
  size: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String,
    default: "square",
    validator: (value) => ["square", "circular"].includes(value),
  },
});

const switchVariants = cva(
  "relative bg-muted dark:bg-input ring-1 ring-border transition-colors ease-in-out duration-200 peer-focus-visible:ring-2 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:border after:border-border after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-card peer-checked:after:border-card after:transition-all ",
  {
    variants: {
      variant: {
        default:
          "peer-focus-visible:ring-primary/50 peer-checked:bg-primary",
        primary:
          "peer-focus-visible:ring-primary/50 peer-checked:bg-primary",
        destructive:
          "peer-focus-visible:ring-destructive/50 peer-checked:bg-destructive",
        success:
          "peer-focus-visible:ring-green-500/50 peer-checked:bg-green-500",
        warning:
          "peer-focus-visible:ring-yellow-500/50 peer-checked:bg-yellow-500",
        grape:
          "peer-focus-visible:ring-purple-500/50 peer-checked:bg-purple-500",
      },
      size: {
        default: "h-6 w-11 after:size-5",
        sm: "h-5 w-9 after:size-4",
        lg: "h-7 w-14 after:size-6 after:start-1",
      },
      shape: {
        square: "rounded-sm after:rounded",
        circular: "rounded-full after:rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "square",
    },
  }
);

const emits = defineEmits(["update:modelValue", "change"]);

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
});
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" v-model="modelValue" class="sr-only peer" />
    <div
      :class="
        cn(
          switchVariants({
            variant: props.variant,
            size: props.size,
            shape: props.shape,
          }),
          props.class
        )
      "
    />
  </label>
</template>
