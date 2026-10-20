<script setup>
import { ref } from "vue";
import { Menu } from "lucide-vue-next";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import Button from "@/components/ui/Button.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

const mobileOpen = ref(false);

const githubUrl = import.meta.env.VITE_GITHUB_URL ?? "";
</script>

<template>
  <div class="bg-background flex min-h-screen">
    <AppSidebar
      :mobile-open="mobileOpen"
      @close-mobile="mobileOpen = false"
    />

    <div class="flex min-h-screen min-w-0 flex-1 flex-col md:ml-[72px]">
      <AppHeader :github-url="githubUrl">
        <template #actions>
          <Button
            variant="ghost"
            size="icon"
            class="md:hidden"
            aria-label="Abrir menú"
            @click="mobileOpen = true"
          >
            <Menu class="size-5" />
          </Button>
        </template>
      </AppHeader>

      <main class="flex-1 overflow-auto p-4 md:p-8">
        <RouterView />
      </main>
    </div>

    <Toaster />
  </div>
</template>
