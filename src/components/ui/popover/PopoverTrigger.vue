<script setup>
import { inject, ref, onMounted, onUnmounted } from "vue";

defineProps({
  asChild: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click", "update:open"]);

const { triggerRef, toggle, isOpen } = inject("popover");
const triggerElement = ref(null);

const handleClick = (event) => {
  toggle();
  emit("update:open", isOpen?.value);
  emit("click", event);
};

const handleKeyDown = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggle();
  }
};

onMounted(() => {
  if (triggerElement.value) {
    triggerRef.value = triggerElement.value;
  }
});

onUnmounted(() => {
  if (triggerRef) {
    triggerRef.value = null;
  }
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div
    ref="triggerElement"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeyDown"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
