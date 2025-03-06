<script setup lang="ts">
import { type Column, type Task } from "~/types";

type BadgeColor = "red" | "yellow" | "green";

defineProps({
  rows: {
    type: Array as PropType<Task[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits(["select"]);
const selected = ref<Task[]>([]);

function select(row: Task) {
  emit("select");
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

const Priority: { [key: number]: string } = { 1: "Low", 2: "Medium", 3: "High" };
const PriorityColor: { [key: number]: BadgeColor } = { 1: "green", 2: "yellow", 3: "red" };
</script>

<template>
  <UCard>
    <UTable
      :loading
      :rows
      :columns
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
      v-model="selected"
      @select="select"
    >
      <template #description-data="{ row }: { row: Task }">
        <div class="truncate max-w-40">
          {{ row.description }}
        </div>
      </template>

      <template #completed-data="{ row }: { row: Task }">
        <UIcon
          size="23"
          :name="`${row.completed ? 'i-heroicons-check-circle' : 'i-heroicons-minus'}`"
          :class="{ 'text-green-500': row.completed, 'text-gray-500': !row.completed }"
        />
      </template>

      <template #priority-data="{ row }: { row: Task }">
        <UBadge variant="soft" :color="PriorityColor[row.priority]" class="capitalize">
          {{ Priority[row.priority] }}
        </UBadge>
      </template>

      <template #created_at-data="{ row }">
        {{ formatTimestamp(row.created_at) }}
      </template>
    </UTable>
  </UCard>
</template>
