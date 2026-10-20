<script setup>
import { Moon, Sun } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import { useTheme } from "@/composables/useTheme";

const { isDark, toggle } = useTheme();
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="size-9"
    :aria-label="isDark ? 'Modo claro' : 'Modo oscuro'"
    @click="toggle"
  >
    <Sun v-if="isDark" class="size-4" />
    <Moon v-else class="size-4" />
  </Button>
</template>
