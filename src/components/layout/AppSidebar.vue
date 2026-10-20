<script setup>
import { useRoute, useRouter } from "vue-router";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Layers, X } from "lucide-vue-next";

defineProps({
  mobileOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-mobile"]);

const route = useRoute();
const router = useRouter();

const items = [
  { to: "/demo", label: "Demo", icon: LayoutDashboard },
  { to: "/ui-kit", label: "UI Kit", icon: Layers },
];

const isActive = (path) =>
  route.path === path || route.path.startsWith(`${path}/`);

const navigate = (path) => {
  router.push(path);
  emit("close-mobile");
};
</script>

<template>
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 bg-black/40 md:hidden"
    aria-hidden="true"
    @click="emit('close-mobile')"
  />

  <aside
    :class="
      cn(
        'border-border bg-card fixed top-0 left-0 z-50 flex h-full w-[min(280px,88vw)] flex-col border-r shadow-lg transition-transform duration-300 md:w-[72px] md:translate-x-0 md:shadow-none',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )
    "
  >
    <div
      class="border-border flex min-h-[56px] items-center justify-between border-b px-3 md:justify-center"
    >
      <div
        class="bg-primary flex size-9 shrink-0 items-center justify-center rounded-lg shadow-sm"
      >
        <span class="text-primary-foreground text-xs font-bold">UI</span>
      </div>
      <button
        type="button"
        class="text-muted-foreground hover:bg-accent rounded-lg p-2 md:hidden"
        aria-label="Cerrar menú"
        @click="emit('close-mobile')"
      >
        <X class="size-5" />
      </button>
    </div>

    <nav class="flex flex-1 flex-col items-stretch py-2 md:items-center">
      <button
        v-for="item in items"
        :key="item.to"
        type="button"
        :title="item.label"
        :class="
          cn(
            'mx-2 mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:w-14 md:flex-col md:gap-1 md:px-1 md:py-2 md:text-[9px]',
            isActive(item.to)
              ? 'bg-primary/15 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          )
        "
        @click="navigate(item.to)"
      >
        <component :is="item.icon" class="size-5 shrink-0 md:size-[19px]" />
        <span class="truncate md:max-w-full">{{ item.label }}</span>
      </button>
    </nav>

    <div
      class="text-muted-foreground border-border hidden border-t p-2 text-center text-[10px] md:block"
    >
      kit
    </div>
  </aside>
</template>
