<script setup>
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-vue-next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
  label: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "w-full",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const selectOption = (value, option = null) => {
  emit("update:modelValue", value);
  emit("change", option || { value });
  isOpen.value = false;
};

const isOpen = ref(false);
</script>

<template>
  <div class="flex flex-col gap-1" :class="props.width">
    <label v-if="props.label" class="text-sm font-medium text-foreground">
      {{ props.label }}
    </label>

    <Popover :open="isOpen" @update:open="isOpen = $event">
      <PopoverTrigger
        :class="
          props.disabled
            ? 'pointer-events-none cursor-not-allowed'
            : 'cursor-pointer'
        "
      >
        <div
          :class="
            cn(
              'file:text-foreground select-none relative inline-flex items-center gap-2 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input dark:bg-input/30 border-border w-full min-w-0 rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none  md:text-sm appearance-none cursor-pointer',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              props.errors && 'border-destructive ring-destructive/20',
              props.disabled &&
                'pointer-events-none cursor-not-allowed opacity-50',
              props.class
            )
          "
          :aria-disabled="props.disabled"
        >
          <slot name="select" />
          <ChevronsUpDown
            class="absolute right-2 top-1/2 -translate-y-1/2 size-5 text-muted-foreground transition-transform duration-200"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent :class="cn('w-[--popover-width] p-0 py-0 origin-top')">
        <div class="max-h-60 overflow-auto">
          <slot
            name="options"
            :select-option="selectOption"
            :model-value="props.modelValue"
          />
        </div>
      </PopoverContent>
    </Popover>

    <!-- Mensaje de error -->
    <p v-if="props.errors" class="text-destructive text-sm leading-none">
      {{ props.errors }}
    </p>
  </div>
</template>
