<script setup>
import { Popover } from "@/components/ui/popover";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <Popover
    :sync-width="false"
    placement="bottom-end"
    strategy="fixed"
    :offset="4"
    :class="props.class"
  >
    <slot />
  </Popover>
</template>
