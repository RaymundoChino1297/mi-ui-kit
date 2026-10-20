<script setup>
import { Tab } from "@headlessui/vue";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
});
const tabVariants = cva(
  "py-2 px-3 text-sm font-medium text-muted-foreground flex items-center whitespace-nowrap transition-colors duration-200 ease-in-out gap-2 [&_svg]:size-4 capitalize hover:bg-muted hover:text-primary/70 focus:outline-none data-[headlessui-state=selected]:pointer-events-none data-[headlessui-state=selected]:text-primary",
  {
    variants: {
      variant: {
        default:
          "w-min relative overflow-hidden py-2 px-3 pb-3 rounded-t-lg leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400  after:opacity-0 after:scale-y-85 after:transition-[scale,opacity] after:duration-300 after:ease-in-out after:bg-primary after:h-0.5 after:rounded-full after:absolute after:bottom-0 after:inset-x-1 data-[headlessui-state=selected]:after:opacity-100 data-[headlessui-state=selected]:after:scale-y-100 data-[headlessui-state=selected]:after:translate-y-0",
        subTab:
          "text-muted-foreground rounded-full data-[headlessui-state=selected]:bg-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
</script>

<template>
  <Tab :class="cn(tabVariants({ variant }), props.class)">
    <slot />
  </Tab>
</template>
