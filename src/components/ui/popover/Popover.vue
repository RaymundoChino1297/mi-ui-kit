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
  size,
  autoUpdate,
} from "@floating-ui/vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  enableFlip: {
    type: Boolean,
    default: true,
  },
  placement: {
    type: String,
    default: "bottom-start",
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
  strategy: {
    type: String,
    default: "fixed",
  },
  syncWidth: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open || false);

const triggerRef = ref(null);
const contentRef = ref(null);
const containerRef = ref(null);

const middleware = computed(() => {
  const chain = [offset(props.offset)];
  if (props.enableFlip) {
    chain.push(flip({ padding: 8 }));
  }
  chain.push(shift({ padding: 8 }));
  if (props.strategy === "fixed") {
    chain.push(
      size({
        padding: 8,
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(160, availableHeight)}px`,
            overflow: "hidden",
          });
        },
      })
    );
  }
  return chain;
});

const { floatingStyles } = useFloating(triggerRef, contentRef, {
  placement: computed(() => props.placement),
  strategy: computed(() =>
    props.strategy === "fixed" ? "fixed" : "absolute"
  ),
  middleware,
  whileElementsMounted: autoUpdate,
});

const POPOVER_MIN_WIDTH_PX = 288;

const clearContentWidth = () => {
  const floating = contentRef.value;
  if (!floating) return;
  floating.style.removeProperty("width");
  floating.style.removeProperty("min-width");
  floating.style.removeProperty("max-width");
  floating.style.removeProperty("--popover-width");
};

const updateWidth = () => {
  if (!props.syncWidth) return;
  const wrap = containerRef.value;
  if (!wrap) return;
  const triggerW = triggerRef.value?.offsetWidth ?? 0;
  const measured = Math.max(wrap.offsetWidth, triggerW);
  const w = Math.max(measured, POPOVER_MIN_WIDTH_PX);
  const px = `${w}px`;
  wrap.style.setProperty("--popover-width", px);
  const floating = contentRef.value;
  if (floating) {
    floating.style.setProperty("--popover-width", px);
    floating.style.width = px;
    floating.style.minWidth = px;
    floating.style.maxWidth = px;
  }
};

watchEffect(() => {
  if (!isOpen.value) return;
  nextTick(() => {
    if (props.syncWidth) {
      updateWidth();
      requestAnimationFrame(() => updateWidth());
    } else {
      clearContentWidth();
    }
  });
});

watch([isOpen, contentRef], () => {
  if (!isOpen.value || !contentRef.value) return;
  nextTick(() => {
    if (props.syncWidth) {
      updateWidth();
      requestAnimationFrame(() => updateWidth());
    } else {
      clearContentWidth();
    }
  });
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
  if (props.syncWidth) {
    updateWidth();
  }

  if (typeof ResizeObserver !== "undefined" && props.syncWidth) {
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (containerRef.value) {
      resizeObserver.observe(containerRef.value);
    }
  }
});

provide("popover", {
  isOpen,
  triggerRef,
  contentRef,
  floatingStyles,
  open: () => {
    isOpen.value = true;
  },
  close: () => {
    isOpen.value = false;
  },
  toggle: () => {
    isOpen.value = !isOpen.value;
  },
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div ref="containerRef">
    <slot />
  </div>
</template>
