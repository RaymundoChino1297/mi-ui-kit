<template>
  <div class="w-full inline-flex items-center gap-1">
    <div class="w-full bg-muted rounded-full h-2.5 flex-1">
      <div
        class="h-2.5 rounded-full transition-all duration-300 ease-in-out"
        :class="progressBarColor"
        :style="{ width: `${(progress / max) * 100}%` }"
      ></div>
    </div>
    <span class="text-xs text-muted-foreground">
      {{ progress }} / {{ max }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  max: {
    type: Number,
    required: true,
    default: 100,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  color: {
    type: String,
    default: "default",
    validator: (value) => {
      return [
        "default",
        "blue",
        "green",
        "red",
        "yellow",
        "purple",
        "pink",
        "indigo",
        "gray",
      ].includes(value);
    },
  },
});

const progressBarColor = computed(() => {
  const colorClasses = {
    default: "bg-primary",
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
    purple: "bg-purple-600",
    pink: "bg-pink-600",
    indigo: "bg-indigo-600",
    gray: "bg-gray-600",
  };
  return colorClasses[props.color] || colorClasses.default;
});
</script>
