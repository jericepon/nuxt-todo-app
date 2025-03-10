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

const { notify } = useNotifications();

const columns = [
  { key: "title", label: "Title", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "completed", label: "Completed", sortable: true },
  { key: "priority", label: "Priority", sortable: true },
  { key: "created_at", label: "Created At", sortable: true },
  { key: "actions", label: "" },
  { key: "complete-task", label: "" },
] as Column[];

const { data: tasks, refresh } = useAsyncData(
  "tasks",
  async () => {
    const {
      data: { value },
    } = await useFetch("/api/task/getTasks");

    return value;
  },
  {
    lazy: true,
    server: true,
  }
);

const handleDuplicate = async (task: Task) => {
  const { title, description, priority, completed } = task;
  const body = { description, priority, completed, title: `(Copy) of ${title}` };
  loading.value = true;
  const { data, error } = await $fetch("/api/task/create", { method: "POST", body });
  if (error) {
    notify({ type: "error", description: error.message });
    return;
  }
  await refresh().then(() => {
    loading.value = false;
    notify({ type: "success", description: "Task duplicated successfully" });
  });
};

const handleDelete = async (id: Task) => {
  const { data, error } = await $fetch("/api/task/delete", { method: "POST", body: { id } });
  loading.value = true;

  if (error) {
    notify({ type: "error", description: error.message });
    return;
  }

  await refresh().then(() => {
    loading.value = false;
    notify({ type: "success", description: "Task deleted successfully" });
  });
};

const handleTaskComplete = async (task: Task) => {
  const { data, error } = await $fetch("/api/task/update", {
    method: "POST",
    body: { ...task, completed: !task.completed },
  });

  if (error) {
    notify({ type: "error", description: error.message });
    return;
  }

  await refresh().then(() => notify({ type: "success", description: "Task updated successfully" }));
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-end">
      <UButton class="col-span-1" color="primary" to="/tasks/new-task" icon="i-heroicons-plus" />
    </div>
    <TasksTable
      class="col-span-3"
      searchable
      paginable
      :loading
      :columns
      :rows="tasks?.data || []"
      :selected="[]"
      @row-duplicate="handleDuplicate"
      @row-delete="handleDelete"
      @task-complete="handleTaskComplete"
    />
  </div>
</template>

<style></style>
