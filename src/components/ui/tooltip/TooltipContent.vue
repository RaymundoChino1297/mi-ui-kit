<script setup>
import { inject, computed, watch, onMounted } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  /** Lado respecto al trigger (API tipo shadcn/Radix) */
  side: {
    type: String,
    default: "top",
    validator: (value) =>
      ["top", "right", "bottom", "left"].includes(value),
  },
  /** Alineación en ese lado */
  align: {
    type: String,
    default: "center",
    validator: (value) => ["start", "center", "end"].includes(value),
  },
  sideOffset: {
    type: Number,
    default: 8,
  },
});

const {
  isOpen,
  contentRef,
  floatingStyles,
  middlewareData,
  staticSide,
  arrowRef,
  setPlacement,
  setSideOffset,
  open,
  close,
} = inject("tooltip");

const placementFromSide = computed(() => {
  if (props.align === "center") {
    return props.side;
  }
  const alignKey = props.align === "start" ? "start" : "end";
  return `${props.side}-${alignKey}`;
});

const syncPlacement = () => {
  setPlacement?.(placementFromSide.value);
  setSideOffset?.(props.sideOffset);
};

onMounted(syncPlacement);

watch(
  () => [props.side, props.align, props.sideOffset],
  syncPlacement
);

const arrowBackgroundClasses = computed(() => {
  if (!props.class) return "";

  const classes = props.class.split(/\s+/);
  const bgClasses = classes.filter(
    (cls) =>
      cls.startsWith("bg-") ||
      cls.startsWith("background-") ||
      cls.includes("bg-") ||
      cls.includes("background-")
  );

  return bgClasses.join(" ");
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-[scale,opacity] duration-150 ease-out"
      enter-from-class="opacity-50 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-[transform,opacity] duration-150 ease-out"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isOpen"
        ref="contentRef"
        role="tooltip"
        :style="floatingStyles"
        :class="
          cn(
            'bg-tooltip text-tooltip-foreground relative z-50 rounded-md px-3 py-2 text-sm shadow-md outline-none',
            props.class
          )
        "
        v-bind="$attrs"
        @mouseenter="open"
        @mouseleave="close"
      >
        <slot />
        <div
          ref="arrowRef"
          :class="
            cn('bg-tooltip absolute size-2.5 rotate-45', arrowBackgroundClasses)
          "
          :style="{
            left:
              middlewareData.arrow?.x != null
                ? `${middlewareData.arrow.x}px`
                : '',
            top:
              middlewareData.arrow?.y != null
                ? `${middlewareData.arrow.y}px`
                : '',
            [staticSide]: arrowRef ? `${-arrowRef.offsetWidth / 2}px` : '',
          }"
        />
      </div>
    </Transition>
  </Teleport>
</template>
