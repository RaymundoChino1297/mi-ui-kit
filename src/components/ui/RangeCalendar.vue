<template>
  <div class="relative">
    <!-- Input trigger -->
    <div
      @click="toggleCalendar"
      class="flex items-center justify-between w-full px-3 py-2 border border-border rounded-md shadow-sm bg-input cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
    >
      <div class="flex items-center space-x-2 text-sm">
        <LucideIcon name="Calendar" class="text-muted-foreground size-4" />
        <span v-if="startDate && endDate">
          {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
        </span>
        <span v-else class="text-gray-500"> Seleccionar rango de fechas </span>
      </div>
      <div class="flex items-center space-x-2">
        <LucideIcon
          :name="isOpen ? 'ChevronUp' : 'ChevronDown'"
          class="text-gray-400 transition-transform size-4"
        />
      </div>
    </div>

    <!-- Calendar dropdown -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[320px]"
    >
      <!-- Header -->

      <div
        class="flex items-center justify-between p-4 py-2 border-b border-border"
      >
        <Button
          @click="previousYear"
          variant="outline"
          size="icon"
          class="h-6 w-6"
        >
          <LucideIcon name="ChevronLeft" class="text-muted-foreground size-3" />
        </Button>
        <span
          class="text-sm font-semibold text-foreground min-w-[60px] text-center"
        >
          {{ currentYear }}
        </span>
        <Button @click="nextYear" variant="outline" size="icon" class="h-6 w-6">
          <LucideIcon
            name="ChevronRight"
            class="text-muted-foreground size-3"
          />
        </Button>
      </div>

      <div
        class="flex items-center justify-between p-4 py-2 border-b border-border"
      >
        <Button
          @click="previousMonth"
          variant="outline"
          size="icon"
          class="h-6 w-6"
        >
          <LucideIcon name="ChevronLeft" class="text-muted-foreground size-3" />
        </Button>
        <span
          class="text-sm font-semibold text-foreground min-w-[80px] text-center"
        >
          {{ currentMonthName }}
        </span>
        <Button
          @click="nextMonth"
          variant="outline"
          size="icon"
          class="h-6 w-6"
        >
          <LucideIcon
            name="ChevronRight"
            class="text-muted-foreground size-3"
          />
        </Button>
      </div>

      <!-- Quick range buttons -->
      <div class="flex items-center justify-between p-3 border-b border-border">
        <div class="flex space-x-2">
          <Button @click="setToday" variant="outline" size="sm" class="text-xs">
            Hoy
          </Button>
          <Button
            @click="setLastWeek"
            variant="outline"
            size="sm"
            class="text-xs"
          >
            Última semana
          </Button>
          <Button
            @click="setLastMonth"
            variant="outline"
            size="sm"
            class="text-xs"
          >
            Último mes
          </Button>
          <Button
            @click="setLastThreeMonths"
            variant="outline"
            size="sm"
            class="text-xs"
          >
            Últimos 3 meses
          </Button>
        </div>
      </div>

      <!-- Week days header -->
      <div class="grid grid-cols-7 px-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="text-xs font-medium text-muted-foreground text-center py-2"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar grid -->
      <div class="grid grid-cols-7 gap-y-1 p-2">
        <div
          v-for="(date, index) in calendarDays"
          :key="date.key"
          @click="selectDate(date)"
          :class="
            cn(
              'relative h-10 flex items-center justify-center text-sm cursor-pointer rounded-md hover:bg-accent',
              date.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground',
              isInRange(date) && ' text-primary hover:bg-primary/15',
              (isStartDate(date) || isEndDate(date)) &&
                'bg-primary text-white hover:bg-primary/90'
            )
          "
        >
          {{ date.day }}

          <!-- Range indicator -->
          <div
            v-if="isInRange(date) && !isStartDate(date) && !isEndDate(date)"
            :class="
              cn(
                'absolute inset-0 bg-primary/10 -z-10',
                getRangeIndicatorClasses(date, index)
              )
            "
          ></div>
        </div>
      </div>
      <div
        class="flex items-center justify-between p-3 py-2 border-t border-border"
      >
        <Button @click="clearSelection" variant="link" size="sm">
          Limpiar
        </Button>
        <Button @click="applySelectionButton" variant="link" size="sm">
          Aplicar
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import LucideIcon from "@/components/ui/LucideIcon.vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ startDate: null, endDate: null }),
  },
  placeholder: {
    type: String,
    default: "Seleccionar rango de fechas",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

// Reactive data
const isOpen = ref(false);
const currentDate = ref(new Date());
const startDate = ref(
  props.modelValue?.startDate ? new Date(props.modelValue.startDate) : null
);
const endDate = ref(
  props.modelValue?.endDate ? new Date(props.modelValue.endDate) : null
);
const tempStartDate = ref(null);
const tempEndDate = ref(null);

// Constants
const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Computed properties
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());

const currentMonthName = computed(() => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[currentMonth.value];
});

const calendarDays = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const totalDays = 42; // 6 weeks * 7 days

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    days.push({
      date,
      day: date.getDate(),
      key: date.toISOString(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isToday(date),
    });
  }

  return days;
});

// Methods
const toggleCalendar = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    tempStartDate.value = startDate.value ? new Date(startDate.value) : null;
    tempEndDate.value = endDate.value ? new Date(endDate.value) : null;
  }
};

const closeCalendar = () => {
  isOpen.value = false;
};

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const previousYear = () => {
  currentDate.value = new Date(currentYear.value - 1, currentMonth.value, 1);
};

const nextYear = () => {
  currentDate.value = new Date(currentYear.value + 1, currentMonth.value, 1);
};

const selectDate = (date) => {
  if (!tempStartDate.value) {
    // Start new selection
    tempStartDate.value = new Date(date.date);
    tempEndDate.value = null;
  } else {
    // Complete selection
    if (date.date < tempStartDate.value) {
      tempStartDate.value = new Date(date.date);
    } else {
      tempEndDate.value = new Date(date.date);
    }
  }
};

const isStartDate = (date) => {
  return tempStartDate.value && isSameDay(date.date, tempStartDate.value);
};

const isEndDate = (date) => {
  return tempEndDate.value && isSameDay(date.date, tempEndDate.value);
};

const isInRange = (date) => {
  if (!tempStartDate.value || !tempEndDate.value) return false;
  return date.date >= tempStartDate.value && date.date <= tempEndDate.value;
};

const getRangeIndicatorClasses = (date, index) => {
  if (!isInRange(date)) return "";

  const col = index % 7;
  const isFirstInRow = col === 0;
  const isLastInRow = col === 6;

  // Check if previous day in range
  const prevIndex = index - 1;
  const prevDate = prevIndex >= 0 ? calendarDays.value[prevIndex] : null;
  const hasPrevInRange = prevDate && isInRange(prevDate);

  // Check if next day in range
  const nextIndex = index + 1;
  const nextDate =
    nextIndex < calendarDays.value.length
      ? calendarDays.value[nextIndex]
      : null;
  const hasNextInRange = nextDate && isInRange(nextDate);

  let classes = "";

  // Round left side if first in row or no previous day in range
  if (isFirstInRow || !hasPrevInRange) {
    classes += " rounded-l-md";
  }

  // Round right side if last in row or no next day in range
  if (isLastInRow || !hasNextInRange) {
    classes += " rounded-r-md";
  }

  return classes;
};

const isToday = (date) => {
  const today = new Date();
  return isSameDay(date, today);
};

const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const formatDate = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

watch(tempStartDate, () => {
  applySelection();
});
watch(tempEndDate, () => {
  applySelection();
});

const applySelectionButton = () => {
  applySelection();
  closeCalendar();
};

const applySelection = () => {
  if (!tempStartDate.value) {
    return;
  }
  startDate.value = new Date(tempStartDate.value);
  endDate.value = tempEndDate.value
    ? new Date(tempEndDate.value)
    : startDate.value;

  const value = {
    startDate: startDate.value
      ? startDate.value.toISOString().split("T")[0]
      : null,
    endDate: endDate.value ? endDate.value.toISOString().split("T")[0] : null,
  };

  emit("update:modelValue", value);
};

// Quick range functions
const setLastWeek = () => {
  const today = new Date();
  const endDate = new Date(today);
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7);

  tempStartDate.value = startDate;
  tempEndDate.value = endDate;

  // Update current view to show the range
  currentDate.value = new Date(startDate);
};

const setLastMonth = () => {
  const today = new Date();
  const endDate = new Date(today);
  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - 1);

  tempStartDate.value = startDate;
  tempEndDate.value = endDate;

  // Update current view to show the range
  currentDate.value = new Date(startDate);
};

const setLastThreeMonths = () => {
  const today = new Date();
  const endDate = new Date(today);
  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - 3);

  tempStartDate.value = startDate;
  tempEndDate.value = endDate;

  // Update current view to show the range
  currentDate.value = new Date(startDate);
};

// Click outside to close
const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest(".relative")) {
    closeCalendar();
  }
};

const setToday = () => {
  currentDate.value = new Date();
  tempStartDate.value = currentDate.value;
  tempEndDate.value = currentDate.value;
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const clearSelection = () => {
  startDate.value = null;
  endDate.value = null;
  tempStartDate.value = null;
  tempEndDate.value = null;
  currentDate.value = new Date();
};
</script>
