<script lang="ts" setup>
import type { ButtonVariant } from "#ui/types";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "i-heroicons-chevron-right",
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: "solid",
  },
});

const emit = defineEmits(["toggle-sidebar"]);
</script>
<template>
  <UButton
    :icon
    :variant
    :ui="{
      rounded: 'p-0 flex justify-center items-center',
    }"
    color="gray"
    size="sm"
    @click="emit('toggle-sidebar')"
  />
</template>

<style></style>
