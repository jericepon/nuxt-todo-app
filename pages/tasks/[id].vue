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

const onSubmit = async (task: Task) => {
  const { data, error } = await $fetch("/api/createTask", { method: "POST", body: task });
  if (error) {
    notify({ type: "error", description: error.message });
    return;
  }
  navigateTo("/tasks");
  notify({ type: "success", description: "Task created successfully" });
};
</script>

<template>
  <div>
    <UCard>
      <TasksForm @submit="onSubmit" />
    </UCard>
  </div>
</template>

<style></style>
