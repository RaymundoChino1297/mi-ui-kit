<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { X } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);
</script>

<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-50" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" aria-hidden="true" />
      </TransitionChild>

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-150"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            :class="
              cn(
                'bg-card text-card-foreground w-full max-w-md rounded-lg border border-border p-6 shadow-lg',
                props.class
              )
            "
          >
            <div class="mb-4 flex items-start justify-between gap-4">
              <div class="space-y-1">
                <DialogTitle
                  v-if="title"
                  class="text-lg font-semibold leading-none"
                >
                  {{ title }}
                </DialogTitle>
                <p
                  v-if="description"
                  class="text-muted-foreground text-sm"
                >
                  {{ description }}
                </p>
              </div>
              <Button variant="ghost" size="icon" class="size-8 shrink-0" @click="close">
                <X class="size-4" />
                <span class="sr-only">Cerrar</span>
              </Button>
            </div>

            <slot />

            <div v-if="$slots.footer" class="mt-6 flex justify-end gap-2">
              <slot name="footer" />
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
