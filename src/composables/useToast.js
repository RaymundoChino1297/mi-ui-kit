import { reactive } from "vue";

const state = reactive({
  toasts: [],
});

let nextId = 0;

export function toast(options) {
  const id = ++nextId;
  const entry = {
    id,
    title: options.title ?? "",
    description: options.description ?? "",
    variant: options.variant ?? "default",
    duration: options.duration ?? 4000,
  };

  state.toasts.push(entry);

  if (entry.duration > 0) {
    setTimeout(() => dismiss(id), entry.duration);
  }

  return id;
}

export function dismiss(id) {
  const index = state.toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
    state.toasts.splice(index, 1);
  }
}

export function useToast() {
  return {
    toasts: state.toasts,
    toast,
    dismiss,
  };
}
