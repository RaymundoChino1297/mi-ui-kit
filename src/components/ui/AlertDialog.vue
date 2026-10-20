<script setup>
import { computed } from "vue";
import { cn } from "@/lib/utils.js";
import Button from "./Button.vue";
import {
  X,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirmar acción",
  },
  description: {
    type: String,
    default: "¿Estás seguro de que quieres continuar?",
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "destructive", "success", "warning", "info"].includes(value),
  },
  confirmText: {
    type: String,
    default: "Confirmar",
  },
  cancelText: {
    type: String,
    default: "Cancelar",
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel", "close"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const getIcon = (variant) => {
  const icons = {
    default: Info,
    destructive: AlertTriangle,
    success: CheckCircle,
    warning: AlertCircle,
    info: Info,
  };
  return icons[variant] || Info;
};

const getIconColor = (variant) => {
  const colors = {
    default: "text-primary",
    destructive: "text-destructive",
    success: "text-green-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };
  return colors[variant] || "text-primary";
};

const handleConfirm = () => {
  emit("confirm");
  isOpen.value = false;
};

const handleCancel = () => {
  emit("cancel");
  isOpen.value = false;
};

const handleClose = () => {
  emit("close");
  isOpen.value = false;
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    handleClose();
  }
};

defineExpose({
  show: () => {
    isOpen.value = true;
  },
  hide: () => {
    isOpen.value = false;
  },
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
    @click="handleClose"
    @keydown="handleKeydown"
    tabindex="0"
  >
    <div
      class="w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg slide-in"
      @click.stop
    >
      <div class="flex flex-col space-y-4">
        <div class="flex items-center gap-3">
          <component
            :is="getIcon(variant)"
            :class="cn('size-6', getIconColor(variant))"
          />
          <h2 class="text-lg font-semibold leading-none flex-1">
            {{ title }}
          </h2>
          <Button variant="ghost" size="icon" @click="handleClose">
            <X class="h-4 w-4" />
            <span class="sr-only">Cerrar</span>
          </Button>
        </div>

        <p class="text-sm text-muted-foreground" v-html="description"></p>

        <div
          class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
        >
          <Button v-if="showCancel" variant="outline" @click="handleCancel">
            {{ cancelText }}
          </Button>
          <Button
            :variant="variant === 'destructive' ? 'destructive' : 'default'"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.1s ease-out;
}

.slide-in {
  animation: slideIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
