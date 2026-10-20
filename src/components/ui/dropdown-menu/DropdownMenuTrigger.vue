<script setup>
import { PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <PopoverTrigger :class="cn('inline-flex', props.class)" v-bind="$attrs">
    <slot />
  </PopoverTrigger>
</template>
