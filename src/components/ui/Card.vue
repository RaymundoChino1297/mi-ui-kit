<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col rounded-lg border border-border p-4',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
