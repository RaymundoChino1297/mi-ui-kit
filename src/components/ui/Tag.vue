<script setup>
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
  class: {
    type: String,
    default: "",
  },
});

const tagVariants = cva(
  "rounded-full px-2 py-1.5 text-xs text-center font-semibold flex w-fit items-center gap-1.5 select-none tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-muted/20  border-muted-foreground text-muted-foreground",
        destructive: "bg-destructive/20  border-destructive text-destructive",
        success: "bg-green-500/20  border-green-500 text-green-500",
        warning: "bg-yellow-500/20  border-yellow-500 text-yellow-500",
        info: "bg-blue-500/20  border-blue-500 text-blue-500",
        error: "bg-red-500/20  border-red-500 text-red-500",
      },
    },
  }
);
</script>

<template>
  <div :class="cn(tagVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
