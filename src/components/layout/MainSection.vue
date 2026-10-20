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
  <section
    :class="
      cn(
        'bg-background flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6',
        props.class
      )
    "
  >
    <slot />
  </section>
</template>
