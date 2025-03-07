<script lang="ts" setup>
import type { Task } from "~/types";

useHead({
  title: "Todo • New Task",
});
definePageMeta({
  name: "new-task",
  middleware: "auth",
  layout: "dashboard",
});

const { notify } = useNotifications();

const onSubmit = async (task: Task) => {
  const { data, error } = await $fetch("/api/task/create", { method: "POST", body: task });
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
