<script setup>
import {
  provide,
  ref,
  onMounted,
  watchEffect,
  nextTick,
  watch,
  computed,
} from "vue";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from "@floating-ui/vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: "top",
    validator: (value) => {
      return [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
      ].includes(value);
    },
  },
  offset: {
    type: Number,
    default: 8,
  },
  /** Con Teleport a body conviene fixed (posición respecto al viewport) */
  strategy: {
    type: String,
    default: "fixed",
    validator: (value) => ["absolute", "fixed"].includes(value),
  },
  delay: {
    type: Number,
    default: 700,
  },
});

const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open || false);
const openTimeout = ref(null);

const triggerRef = ref(null);
const contentRef = ref(null);
const containerRef = ref(null);
const arrowRef = ref(null);

const placement = ref(props.placement);
const sideOffset = ref(props.offset);

watch(
  () => props.placement,
  (value) => {
    placement.value = value;
  }
);

watch(
  () => props.offset,
  (value) => {
    sideOffset.value = value;
  }
);

const { floatingStyles, middlewareData, placement: resolvedPlacement } =
  useFloating(triggerRef, contentRef, {
    placement,
    strategy: computed(() =>
      props.strategy === "fixed" ? "fixed" : "absolute"
    ),
    middleware: [
      offset(() => sideOffset.value),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

const staticSide = computed(() => {
  const currentPlacement = resolvedPlacement.value || placement.value;
  const side = currentPlacement.split("-")[0];
  return {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[side];
});

const updateWidth = () => {
  if (containerRef.value) {
    const width = containerRef.value.offsetWidth;
    containerRef.value.style.setProperty("--popover-width", `${width}px`);
  }
};

watchEffect(() => {
  if (isOpen.value) {
    nextTick(() => {
      updateWidth();
    });
  }
});

watch(isOpen, (value) => {
  emit("update:open", value);
});

watch(
  () => props.open,
  (value) => {
    isOpen.value = value;
  },
  { immediate: true }
);

onMounted(() => {
  updateWidth();

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (containerRef.value) {
      resizeObserver.observe(containerRef.value);
    }
  }
});

const openWithDelay = () => {
  if (openTimeout.value) {
    clearTimeout(openTimeout.value);
  }
  openTimeout.value = setTimeout(() => {
    isOpen.value = true;
  }, props.delay);
};

const openImmediate = () => {
  if (openTimeout.value) {
    clearTimeout(openTimeout.value);
  }
  isOpen.value = true;
};

const close = () => {
  if (openTimeout.value) {
    clearTimeout(openTimeout.value);
  }
  isOpen.value = false;
};

const setPlacement = (value) => {
  if (placement.value !== value) {
    placement.value = value;
  }
};

const setSideOffset = (value) => {
  sideOffset.value = value;
};

provide("tooltip", {
  isOpen,
  triggerRef,
  contentRef,
  arrowRef,
  staticSide,
  floatingStyles,
  middlewareData,
  open: openImmediate,
  openWithDelay,
  close,
  toggle: () => (isOpen.value = !isOpen.value),
  setPlacement,
  setSideOffset,
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div ref="containerRef" class="inline-flex">
    <slot />
  </div>
</template>
