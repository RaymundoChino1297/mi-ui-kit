<script setup>
import { inject, ref, onMounted, onUnmounted } from "vue";

defineProps({
  asChild: {
    type: Boolean,
    default: false,
  },
});

const { triggerRef, openWithDelay, close } = inject("tooltip");
const triggerElement = ref(null);

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
    class="inline-flex"
    @mouseenter="openWithDelay"
    @mouseleave="close"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
