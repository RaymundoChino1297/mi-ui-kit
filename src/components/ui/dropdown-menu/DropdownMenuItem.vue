<script setup>
import { cn } from "@/lib/utils";
import { inject } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const popover = inject("popover", null);

const handleClick = (e) => {
  if (props.disabled) return;
  popover?.close?.();
  emit("click", e);
};
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    :data-variant="variant"
    @click="handleClick"
    :class="
      cn(
        'hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none disabled:pointer-events-none disabled:opacity-50',
        variant === 'destructive' &&
          'text-destructive hover:bg-destructive/10 focus:bg-destructive/10',
        props.class
      )
    "
  >
    <slot />
  </button>
</template>
