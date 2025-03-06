<script setup lang="ts">
import type { Task } from "~/types";

const props = defineProps({
  rows: {
    type: Array as PropType<Task[]>,
    default: [],
  },
  selected: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits(["select"]);

function select(row: Task) {
  emit("select");
}

const selected = ref<Task[]>([]);
</script>

<template>
  <UCard>
    <UTable v-model="selected" :rows @select="select" />
  </UCard>
</template>
