<script setup>
import { TabGroup } from "@headlessui/vue";
import { ref, watch } from "vue";

const props = defineProps({
  /** Si no usas v-model, el índice se maneja dentro del componente */
  modelValue: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedIndex = ref(props.modelValue ?? 0);

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined && value !== selectedIndex.value) {
      selectedIndex.value = value;
    }
  }
);

const onChange = (index) => {
  selectedIndex.value = index;
  emit("update:modelValue", index);
};
</script>

<template>
  <TabGroup as="div" :selected-index="selectedIndex" @change="onChange">
    <slot />
  </TabGroup>
</template>
