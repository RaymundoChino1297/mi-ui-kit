import { computed, ref, watch } from "vue";

export default function usePagination(initialData, initialItemsPerPage = 10) {
  const data = ref(Array.isArray(initialData) ? initialData : []);
  const itemsPerPage = ref(initialItemsPerPage);
  const currentPage = ref(1);

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(data.value.length / itemsPerPage.value))
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return data.value.slice(start, start + itemsPerPage.value);
  });

  const paginationInfo = computed(() => {
    if (data.value.length === 0) {
      return { startItem: 0, endItem: 0 };
    }
    const startItem = (currentPage.value - 1) * itemsPerPage.value + 1;
    const endItem = Math.min(
      currentPage.value * itemsPerPage.value,
      data.value.length
    );
    return { startItem, endItem };
  });

  watch(totalPages, (pages) => {
    if (currentPage.value > pages) {
      currentPage.value = pages;
    }
  });

  const setData = (newData) => {
    data.value = Array.isArray(newData) ? newData : [];
    currentPage.value = 1;
  };

  const setItemsPerPage = (value) => {
    itemsPerPage.value = value;
    currentPage.value = 1;
  };

  const goToPage = (page) => {
    const parsed = Number(page);
    if (!Number.isFinite(parsed)) return;
    currentPage.value = Math.min(Math.max(1, parsed), totalPages.value);
  };

  const firstPage = () => {
    currentPage.value = 1;
  };

  const lastPage = () => {
    currentPage.value = totalPages.value;
  };

  const previousPage = () => {
    goToPage(currentPage.value - 1);
  };

  const nextPage = () => {
    goToPage(currentPage.value + 1);
  };

  return {
    data,
    currentPage,
    totalPages,
    paginatedItems,
    paginationInfo,
    setData,
    setItemsPerPage,
    goToPage,
    firstPage,
    lastPage,
    previousPage,
    nextPage,
  };
}
