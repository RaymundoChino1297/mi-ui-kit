<script setup>
import { ref, computed, watch } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import usePagination from "@/composables/utilerias/usePagination";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "small"].includes(value),
  },
});

const emit = defineEmits(["pageChange", "dataChange"]);

const pagination = usePagination(props.data, props.itemsPerPage);

const inputPage = ref(pagination.currentPage.value);

watch(
  () => props.data,
  (newData) => {
    pagination.setData(newData);
  }
);

watch(
  () => props.itemsPerPage,
  (newItemsPerPage) => {
    pagination.setItemsPerPage(newItemsPerPage);
  }
);

watch(
  () => pagination.currentPage.value,
  (newPage) => {
    inputPage.value = newPage;
    emit("pageChange", {
      currentPage: newPage,
      totalPages: pagination.totalPages.value,
      paginatedItems: pagination.paginatedItems.value,
    });
  }
);

watch(
  () => pagination.paginatedItems.value,
  (newPaginatedItems) => {
    emit("dataChange", newPaginatedItems);
  },
  { immediate: true }
);

const goToPage = () => {
  const page = parseInt(inputPage.value);

  pagination.goToPage(page);
};

const startIndex = computed(() => pagination.paginationInfo.value.startItem);
const endIndex = computed(() => pagination.paginationInfo.value.endItem);
const currentPage = computed(() => pagination.currentPage.value);
const totalPages = computed(() => pagination.totalPages.value);
const filteredData = computed(() => pagination.data.value);
</script>

<template>
  <!-- Default size variant -->
  <div
    v-if="size === 'default'"
    class="flex justify-between items-center mt-2 text-sm text-muted-foreground"
  >
    <div>
      Mostrando {{ startIndex }} - {{ endIndex }} de
      {{ filteredData.length }} registros
    </div>
    <div>
      <p>{{ currentPage }} de {{ totalPages }}</p>
    </div>
    <div class="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        @click="pagination.firstPage"
        :disabled="currentPage === 1"
        class="size-8 rounded"
      >
        1
      </Button>
      <Button
        size="icon"
        @click="pagination.previousPage"
        variant="outline"
        :disabled="currentPage === 1"
        class="size-8 rounded"
      >
        <ChevronLeft class="size-3" />
      </Button>
      <Input
        type="number"
        v-model.number="inputPage"
        min="1"
        :max="totalPages"
        @keyup.enter="goToPage"
        @change="goToPage"
        class="px-1 rounded text-center size-8 appearance-none [-moz-appearance:textfield]"
      />
      <Button
        variant="outline"
        size="icon"
        @click="pagination.nextPage"
        :disabled="currentPage >= totalPages"
        class="size-8 rounded"
      >
        <ChevronRight class="size-3" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        @click="pagination.lastPage"
        :disabled="currentPage === totalPages"
        class="size-8 rounded"
      >
        {{ totalPages }}
      </Button>
    </div>
  </div>

  <!-- Small size variant -->
  <div
    v-else-if="size === 'small'"
    class="flex justify-between items-center mt-2"
  >
    <div class="text-xs text-muted-foreground">
      {{ filteredData.length }} registros
    </div>
    <div class="flex items-center gap-1">
      <Button
        size="icon"
        @click="pagination.previousPage"
        variant="outline"
        :disabled="currentPage === 1"
        class="size-6 rounded"
      >
        <ChevronLeft class="size-3" />
      </Button>
      <span class="text-xs text-muted-foreground px-2">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <Button
        variant="outline"
        size="icon"
        @click="pagination.nextPage"
        :disabled="currentPage >= totalPages"
        class="size-6 rounded"
      >
        <ChevronRight class="size-3" />
      </Button>
    </div>
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
