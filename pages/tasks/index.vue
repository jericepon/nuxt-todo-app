<script lang="ts" setup>
import { useTaskStore } from "~/store/task";
import type { Column, Task } from "~/types";

useHead({
  title: "Todo • Tasks",
});
definePageMeta({
  name: "tasks",
  middleware: "auth",
  layout: "dashboard",
});

const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "completed", label: "Completed", sortable: true },
  { key: "priority", label: "Priority", sortable: true },
  { key: "created_at", label: "Created At", sortable: true },
  { key: "actions", label: "" },
] as Column[];

const { data: tasks } = useAsyncData(
  "tasks",
  async () => {
    const {
      data: { value },
    } = await useFetch("/api/getAllTasks");
    const result = value?.data as Task[];

    return result;
  },
  {
    lazy: true,
    server: true,
  }
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-end">
      <UButton
        class="col-span-1"
        color="primary"
        @click="navigateTo('/tasks/new-task')"
        icon="i-heroicons-plus"
      />
    </div>
    <TasksTable class="col-span-3" :columns :rows="tasks || []" :selected="[]" />
  </div>
</template>

<style></style>
