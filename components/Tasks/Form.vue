<script lang="ts" setup>
import { z } from "zod";

const emit = defineEmits(["submit"]);
defineProps({
  submitting: {
    type: Boolean,
    default: false,
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
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="emit('submit', state)">
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
    <div class="flex w-full justify-end">
      <UButton type="submit" :loading="submitting"> Create </UButton>
    </div>
  </UForm>
</template>
<style></style>
