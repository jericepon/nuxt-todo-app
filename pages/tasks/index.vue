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

const loading = ref(false);

const columns = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "completed", label: "Completed" },
  { key: "priority", label: "Priority" },
  { key: "created_at", label: "Created At" },
] as Column[];

const { data: tasks } = useAsyncData(
  "tasks",
  async () => {
    loading.value = true;

    const {
      data: { value },
    } = await useFetch("/api/getAllTasks");
    const result = value?.data as Task[];
    if (tasks.value) {
      loading.value = false;
    }
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
    <TasksTable class="col-span-3" :columns :loading :rows="tasks || []" :selected="[]" />
  </div>
</template>

<style></style>
