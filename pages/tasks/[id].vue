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

const submitting = ref(false);

const taskToEdit = ref<Task | null>(null);

const onSubmit = async (task: Task) => {
  submitting.value = true;
  $fetch("/api/task/update", { method: "POST", body: task }).then(({ data, error }) => {
    if (error) {
      notify({ type: "error", description: error.message });
      return;
    }
    submitting.value = true;
    notify({ type: "success", description: "Task updated successfully" });
    navigateTo("/tasks");
  });
};

onMounted(async () => {
  const { data } = await $fetch(`/api/task/edit?id=${route.params.id}`);
  taskToEdit.value = data;
});
</script>

<template>
  <div>
    <UCard>
      <TasksForm @submit="onSubmit" :task="taskToEdit" :submitting />
    </UCard>
  </div>
</template>

<style></style>
