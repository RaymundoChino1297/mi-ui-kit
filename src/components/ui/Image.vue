<script setup>
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: false,
  },
  alt: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
});

const imageError = ref(false);
</script>

<template>
  <img
    v-if="!imageError"
    :src="src"
    :alt="alt"
    v-bind="$attrs"
    :class="
      cn(
        'size-10 rounded-md border border-border dark:border-transparent  bg-white p-0.5 object-contain',
        props.class
      )
    "
    @error="imageError = true"
  />
  <div
    v-else
    :class="
      cn(
        'size-10 rounded-md object-contain bg-white border border-border dark:border-transparent pointer-events-none flex items-center justify-center',
        props.class
      )
    "
  >
    <ImageIcon class="size-5 text-muted-foreground" />
  </div>
</template>
