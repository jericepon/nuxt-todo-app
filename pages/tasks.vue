<script lang="ts" setup>
import { useTaskStore } from "~/store/task";

const { setTasksList } = useTaskStore();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

useHead({
  title: "Todo • Tasks",
});
definePageMeta({
  name: "tasks",
  middleware: "auth",
  layout: "dashboard",
});

const { data: tasks, error } = useAsyncData("tasks", async () => {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.value?.id ?? "");

  if (data && data.length) setTasksList(data);

  return data;
});

// supabase
//   .from("tasks")
//   .select("*")
//   .eq("user_id", user.value?.id ?? "")
//   .then(({ data }) => {
//     if (data && data.length) setTasksList(data);
//   });

// const getAllTasks = async (user_id: string) => {

// };

// onMounted(() => getAllTasks(user.value?.id ?? ""));
</script>

<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <!-- <TasksTable class="col-span-3" :rows="[]" :selected="[]" /> -->
    <!-- <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(2)" /> -->
  </div>
</template>

<style></style>
