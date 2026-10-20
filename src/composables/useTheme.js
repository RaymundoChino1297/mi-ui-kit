import { onMounted, ref, watch } from "vue";

const isDark = ref(false);

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("mi-ui-kit-theme", dark ? "dark" : "light");
}

export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem("mi-ui-kit-theme");
    if (saved === "dark" || saved === "light") {
      isDark.value = saved === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme(isDark.value);
  });

  watch(isDark, (value) => {
    applyTheme(value);
  });

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  return { isDark, toggle };
}
