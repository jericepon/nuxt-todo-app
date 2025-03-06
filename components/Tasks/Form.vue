<script lang="ts" setup>
import { z } from "zod";
import type { Task } from "~/types";

const emit = defineEmits(["submit"]);

const props = defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object as PropType<Task | null>,
    default: () => null,
  },
});
const schema = z.object({
  title: z.string().min(6, "Must be at least 3 characters"),
  description: z.string(),
  priority: z.number(),
  completed: z.boolean(),
});

const state = reactive<z.infer<typeof schema>>({
  title: "",
  description: "",
  priority: 1,
  completed: false,
});

const priority = [
  { name: "Low", value: 1 },
  { name: "Medium", value: 2 },
  { name: "High", value: 3 },
];

const setPriority = (value: number) => {
  state.priority = parseInt(value.toString());
};

watch(
  () => props.task,
  (task) => {
    if (task) {
      state.title = task.title;
      state.description = task.description;
      state.priority = task.priority;
      state.completed = task.completed;
    }
  },
  { immediate: true }
);
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="emit('submit', { ...state, id: task?.id })"
  >
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <UFormGroup label="Priority" name="priority">
      <USelect
        variant="outline"
        v-model="state.priority"
        :options="priority"
        option-attribute="name"
        @change="setPriority"
      />
    </UFormGroup>
    <UFormGroup name="completed">
      <UCheckbox v-model="state.completed" label="Completed" />
    </UFormGroup>
    <div class="flex w-full justify-end space-x-4">
      <UButton color="gray" variant="solid" to="/tasks">
        Cancel
      </UButton>
      <UButton type="submit" :loading="submitting"> {{ task ? "Update" : "Create" }} </UButton>
    </div>
  </UForm>
</template>
<style></style>
