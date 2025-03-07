<script lang="ts" setup>
import { z } from "zod";
import type { Task } from "~/types";

const emit = defineEmits(["submit"]);

const props = defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: Object as () => z.infer<typeof schema>,
  },
});

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  avatar_url: z.string().optional(),
  image: z.string().optional(),
});

const state = reactive<z.infer<typeof schema>>({
  name: "",
  avatar_url: "",
});

const setImage = (event: FileList) => {
  const file = event[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    state.image = e?.target?.result as string;
  };

  reader.readAsDataURL(file);
};

watch(
  () => props.profile,
  (profile) => {
    if (profile) {
      state.name = profile.name;
      state.avatar_url = "";
    }
  },
  { immediate: true }
);
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="emit('submit', { ...state })">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Avatar URL" name="avatar_url">
      <UInput type="file" size="sm" icon="i-heroicons-folder" @change="setImage" />
    </UFormGroup>
    <div class="flex w-full justify-end space-x-4">
      <UButton color="gray" variant="solid" to="/"> Cancel </UButton>
      <UButton type="submit" :loading="submitting">Update</UButton>
    </div>
  </UForm>
</template>
<style></style>
