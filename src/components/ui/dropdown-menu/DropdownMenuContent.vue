<script setup>
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <PopoverContent
    use-teleport
    :class="
      cn(
        'w-fit min-w-[8rem] p-1',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </PopoverContent>
</template>
