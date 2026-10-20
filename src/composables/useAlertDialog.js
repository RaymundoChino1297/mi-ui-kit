import { ref, createApp, h } from "vue";
import AlertDialog from "@/components/ui/AlertDialog.vue";

const fire = async (options) => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const tempApp = createApp({
      setup() {
        const isOpen = ref(true);

        const handleConfirm = () => {
          isOpen.value = false;
          setTimeout(() => {
            resolve(true);
            tempApp.unmount();
            document.body.removeChild(container);
          }, 200);
        };

        const handleCancel = () => {
          isOpen.value = false;
          setTimeout(() => {
            resolve(false);
            tempApp.unmount();
            document.body.removeChild(container);
          }, 200);
        };

        const handleClose = () => {
          isOpen.value = false;
          setTimeout(() => {
            resolve(false);
            tempApp.unmount();
            document.body.removeChild(container);
          }, 200);
        };

        return () =>
          h(AlertDialog, {
            modelValue: isOpen.value,
            "onUpdate:modelValue": (value) => (isOpen.value = value),
            ...options,
            onConfirm: handleConfirm,
            onCancel: handleCancel,
            onClose: handleClose,
          });
      },
    });

    tempApp.mount(container);
  });
};

const confirm = (title, description, options = {}) => {
  return fire({
    title,
    description,
    variant: "default",
    ...options,
  });
};

const alert = (title, description, options = {}) => {
  return fire({
    title,
    description,
    variant: "info",
    showCancel: false,
    confirmText: "Aceptar",
    ...options,
  });
};

const warning = (title, description, options = {}) => {
  return fire({
    title,
    description,
    variant: "warning",
    ...options,
  });
};

const danger = (title, description, options = {}) => {
  return fire({
    title,
    description,
    variant: "destructive",
    confirmText: "Eliminar",
    ...options,
  });
};

const success = (title, description, options = {}) => {
  return fire({
    title,
    description,
    variant: "success",
    ...options,
  });
};

export const useAlertDialog = () => {
  return {
    fire,
    confirm,
    alert,
    warning,
    danger,
    success,
  };
};

export default useAlertDialog;
