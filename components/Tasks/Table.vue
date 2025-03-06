<script setup lang="ts">
import { type Column, type Task } from "~/types";

type BadgeColor = "red" | "yellow" | "green";

const props = defineProps({
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
  searchable: {
    type: Boolean,
    default: false,
  },
  paginable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["row-duplicate", "row-delete", "task-complete"]);
const q = ref("");
const page = ref(1);
const pageCount = 5;
const sort = ref<{ column: string; direction: "desc" | "asc" }>({
  column: "created_at",
  direction: "desc",
});

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

const filteredRows = computed(() => {
  if (!q.value) {
    return props.rows;
  }

  return props.rows.filter((row) => {
    return Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const Priority: { [key: number]: string } = { 1: "Low", 2: "Medium", 3: "High" };
const PriorityColor: { [key: number]: BadgeColor } = { 1: "green", 2: "yellow", 3: "red" };

const items = (row: Task) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo(`/tasks/${row.id}`),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      click: () => emit("row-duplicate", row),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if (confirm) {
          emit("row-delete", row.id);
        }
      },
    },
  ],
];

const paginatedRows = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});
</script>

<template>
  <div class="space-y-4">
    <UInput v-model="q" placeholder="Filter task..." class="max-w-48 w-full" v-if="searchable" />

    <UCard>
      <UTable
        :loading
        :rows="paginable ? paginatedRows : filteredRows"
        :columns
        v-model:sort="sort"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
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

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>

        <template #complete-task-data="{ row }">
          <UButton
            :color="`${row.completed ? 'gray' : 'green'}`"
            variant="outline"
            :icon="`i-heroicons-${row.completed ? 'minus' : 'check'}-circle-20-solid`"
            @click="emit('task-complete', row)"
            :title="`${row.completed ? 'Mark as incomplete' : 'Mark as complete'}`"
          />
        </template>
      </UTable>

      <div
        class="flex justify-end px-3 pt-3.5 border-t border-gray-200 dark:border-gray-700"
        v-if="paginable"
      >
        <UPagination v-model="page" :page-count="pageCount" :total="rows.length" />
      </div>
    </UCard>
  </div>
</template>
