<script setup>
import { cn } from "@/lib/utils";
import { useToast, dismiss } from "@/composables/useToast";
import { X } from "lucide-vue-next";

const { toasts } = useToast();
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
  >
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="item in toasts"
        :key="item.id"
        role="status"
        :class="
          cn(
            'bg-card text-card-foreground pointer-events-auto rounded-lg border border-border p-4 shadow-lg',
            item.variant === 'destructive' &&
              'border-destructive/50 text-destructive'
          )
        "
      >
        <div class="flex items-start gap-3">
          <div class="flex-1 space-y-1">
            <p v-if="item.title" class="text-sm font-medium">{{ item.title }}</p>
            <p
              v-if="item.description"
              class="text-muted-foreground text-sm"
            >
              {{ item.description }}
            </p>
          </div>
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground rounded p-0.5"
            @click="dismiss(item.id)"
          >
            <X class="size-4" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
