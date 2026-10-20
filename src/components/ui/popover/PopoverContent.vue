<script setup>
import { inject, watch, onUnmounted } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  sideOffset: {
    type: Number,
    default: 8,
  },
  align: {
    type: String,
    default: "center",
  },
  useTeleport: {
    type: Boolean,
    default: false,
  },
});

const { isOpen, contentRef, floatingStyles, close, triggerRef } =
  inject("popover");

const handleClickOutside = (event) => {
  if (!isOpen.value) return;

  if (contentRef.value && contentRef.value.contains(event.target)) {
    return;
  }

  if (triggerRef.value && triggerRef.value.contains(event.target)) {
    return;
  }

  close();
};

const handleEscape = (event) => {
  if (event.key === "Escape" && isOpen.value) {
    close();
  }
};

watch(
  () => isOpen.value,
  (newIsOpen) => {
    if (newIsOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscape);
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Teleport v-if="props.useTeleport" to="body" :disabled="!isOpen">
    <Transition
      leave-active-class="transition-[transform,opacity] duration-150 ease-out"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        ref="contentRef"
        :style="floatingStyles"
        v-show="isOpen"
        role="dialog"
        aria-modal="true"
        :class="
          cn(
            'bg-popover text-popover-foreground z-[9999] w-72 rounded-md border border-border p-4 shadow-md outline-none',
            props.class
          )
        "
        v-bind="$attrs"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
  <Transition
    v-else
    leave-active-class="transition-[transform,opacity] duration-150 ease-out"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-95 translate-y-1"
  >
    <div
      ref="contentRef"
      :style="floatingStyles"
      v-show="isOpen"
      role="dialog"
      aria-modal="true"
      :class="
        cn(
          'bg-popover text-popover-foreground z-50 w-72 rounded-md border border-border p-4 shadow-md outline-none',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Transition>
</template>
