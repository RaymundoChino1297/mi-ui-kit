<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { cn } from "@/lib/utils";
import { ExternalLink, User } from "lucide-vue-next";
import Tag from "@/components/ui/Tag.vue";
import ThemeToggle from "@/components/layout/ThemeToggle.vue";

const props = defineProps({
  title: { type: String, default: "mi-ui-kit" },
  subtitle: { type: String, default: "Portafolio UI · Vue 3" },
  githubUrl: { type: String, default: "" },
  class: { type: String, default: "" },
});

const route = useRoute();

const sectionLabel = computed(() => route.meta?.title ?? "");
</script>

<template>
  <header
    :class="
      cn(
        'bg-card/95 border-border sticky top-0 z-40 w-full border-b backdrop-blur-sm',
        props.class
      )
    "
  >
    <div
      class="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 md:px-6"
    >
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <slot name="leading" />

        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-base font-semibold tracking-tight">
              {{ props.title }}
            </h1>
            <Tag v-if="sectionLabel" variant="info" class="hidden sm:inline-flex">
              {{ sectionLabel }}
            </Tag>
          </div>
          <p v-if="props.subtitle" class="text-muted-foreground truncate text-xs">
            {{ props.subtitle }}
          </p>
        </div>
      </div>

      <div class="flex shrink-0 flex-wrap items-center justify-end gap-2">
        <slot name="actions" />

        <Tag variant="default" class="hidden md:inline-flex">Datos demo</Tag>

        <a
          v-if="props.githubUrl"
          :href="props.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hidden h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium sm:inline-flex"
        >
          <ExternalLink class="size-3.5" />
          GitHub
        </a>

        <ThemeToggle />

        <div
          class="border-border bg-muted/30 hidden items-center gap-2 rounded-full border py-1 pr-3 pl-1 sm:flex"
          title="Usuario de demostración (sin login real)"
        >
          <div
            class="bg-primary/15 text-primary flex size-7 items-center justify-center rounded-full"
          >
            <User class="size-3.5" />
          </div>
          <span class="text-foreground max-w-[7rem] truncate text-xs font-medium">
            Portafolio
          </span>
        </div>
      </div>
    </div>

    <div v-if="$slots.nav" class="border-border border-t px-4 md:px-6">
      <div class="py-2">
        <slot name="nav" />
      </div>
    </div>
  </header>
</template>
