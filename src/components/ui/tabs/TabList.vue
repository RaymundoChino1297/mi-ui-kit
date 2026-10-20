<script setup>
import { TabList } from "@headlessui/vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { ref, nextTick, onUnmounted } from "vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  template: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);

const tabListRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const isScrollingLeft = ref(false);
const isScrollingRight = ref(false);
let scrollInterval = null;

const handleSelectChange = (event) => {
  const value = event.target.value;
  emit("update:modelValue", value);
};

const checkScrollPosition = () => {
  if (!tabListRef.value) return;

  const { scrollLeft, scrollWidth, clientWidth } = tabListRef.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1;
};

const startScrollLeft = () => {
  isScrollingLeft.value = true;

  scrollInterval = setInterval(() => {
    if (isScrollingLeft.value && canScrollLeft.value) {
      tabListRef.value.scrollBy({ left: -15, behavior: "auto" });
      checkScrollPosition();
    } else {
      stopScroll();
    }
  }, 20);
};

const startScrollRight = () => {
  isScrollingRight.value = true;

  scrollInterval = setInterval(() => {
    if (isScrollingRight.value && canScrollRight.value) {
      tabListRef.value.scrollBy({ left: 15, behavior: "auto" });
      checkScrollPosition();
    } else {
      stopScroll();
    }
  }, 20);
};

const stopScroll = () => {
  isScrollingLeft.value = false;
  isScrollingRight.value = false;
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
};

const onScroll = () => {
  checkScrollPosition();
};

// Verificar posición inicial después del montaje
nextTick(() => {
  checkScrollPosition();
});

// Limpiar intervalo al desmontar el componente
onUnmounted(() => {
  stopScroll();
});
</script>

<template>
  <!-- Select para dispositivos móviles (hasta md) -->
  <div class="md:hidden mx-3 mt-2">
    <select
      :value="modelValue"
      @change="handleSelectChange"
      class="w-full px-3 py-2 text-sm border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>

  <!-- TabList para dispositivos medianos y grandes (md y superiores) -->
  <div class="hidden md:flex relative">
    <Button
      v-show="canScrollLeft"
      @mousedown="startScrollLeft"
      @mouseup="stopScroll"
      @mouseleave="stopScroll"
      @touchstart="startScrollLeft"
      @touchend="stopScroll"
      variant="outline"
      size="icon"
      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 dark:bg-input shadow-sm dark:hover:bg-input dark:active:border-primary"
      :disabled="!canScrollLeft"
    >
      <ChevronLeft class="w-4 h-4" />
    </Button>
    <div
      ref="tabListRef"
      @scroll="onScroll"
      class="hidden md:flex items-center bg-card/60 border-b border-border overflow-x-auto relative scrollbar-hide w-full backdrop-blur-xs"
    >
      <TabList
        class="flex-1 p-1.5 gap-1 flex pb-0 space-x-0.5 uppercase"
        :template="props.template"
      >
        <slot />
      </TabList>
    </div>
    <Button
      v-show="canScrollRight"
      @mousedown="startScrollRight"
      @mouseup="stopScroll"
      @mouseleave="stopScroll"
      @touchstart="startScrollRight"
      @touchend="stopScroll"
      variant="outline"
      size="icon"
      class="absolute right-2 top-1/2 -translate-y-1/2 z-10 dark:bg-input shadow-sm dark:hover:bg-input dark:active:border-primary"
      :disabled="!canScrollRight"
    >
      <ChevronRight class="w-4 h-4" />
    </Button>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
