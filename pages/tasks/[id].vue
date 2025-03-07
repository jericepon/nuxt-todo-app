<script lang="ts" setup>
import type { Task } from "~/types";

useHead({
  title: "Todo • Edit Task",
});
definePageMeta({
  name: "edit-task",
  middleware: "auth",
  layout: "dashboard",
});

const { notify } = useNotifications();
const route = useRoute();

const taskToEdit = ref<Task | null>(null);

const onSubmit = async (task: Task) => {
  const { data, error } = await $fetch("/api/task/update", { method: "POST", body: task });
  if (error) {
    notify({ type: "error", description: error.message });
    return;
  }
  navigateTo("/tasks");
  notify({ type: "success", description: "Task updated successfully" });
};

onMounted(async () => {
  const { data } = await $fetch(`/api/editTask?id=${route.params.id}`);
  taskToEdit.value = data;
});
</script>

<template>
  <div>
    <UCard>
      <TasksForm @submit="onSubmit" :task="taskToEdit" />
    </UCard>
  </div>
</template>

<style></style>
