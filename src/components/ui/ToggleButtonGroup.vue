<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { cn } from "@/lib/utils.js";
import Button from "@/components/ui/Button.vue";

defineOptions({ inheritAttrs: false });

const emit = defineEmits(["update:modelValue", "change"]);

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonRefs = ref([]);
const indicatorStyle = ref({});

const selectedIndex = computed(() => {
  return props.options.findIndex((option) => option.value === props.modelValue);
});

const updateIndicatorStyle = () => {
  if (selectedIndex.value === -1 || !buttonRefs.value[selectedIndex.value]) {
    indicatorStyle.value = {};
    return;
  }

  const selectedButton = buttonRefs.value[selectedIndex.value];
  const buttonWidth = selectedButton?.offsetWidth || 0;
  const buttonLeft = selectedButton?.offsetLeft || 0;

  indicatorStyle.value = {
    width: `${buttonWidth}px`,
    left: `${buttonLeft}px`,
  };
};

const handleOptionClick = (option) => {
  if (props.disabled) return;

  emit("update:modelValue", option.value);
  emit("change", option.value);
};

watch(selectedIndex, updateIndicatorStyle, { immediate: true });

onMounted(updateIndicatorStyle);
</script>

<template>
  <div
    :class="
      cn(
        'relative inline-flex rounded-lg bg-input  border border-border p-1',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <div
      class="absolute top-1 bottom-1 bg-primary/20 rounded-md transition-all duration-300 ease-in-out shadow-sm"
      :style="indicatorStyle"
    />

    <div
      v-for="(option, index) in options"
      :key="option.value"
      ref="buttonRefs"
      class="relative"
    >
      <Button
        @click="handleOptionClick(option)"
        variant="ghost"
        size="sm"
        :class="
          cn(
            ' rounded text-sm py-2 leading-none h-fit text-muted-foreground',
            selectedIndex === index ? 'text-primary pointer-events-none' : ''
          )
        "
        :disabled="disabled"
      >
        <component v-if="option.icon" :is="option.icon" class="w-4 h-4" />
        <span>{{ option.label }}</span>
      </Button>
    </div>
  </div>
</template>
