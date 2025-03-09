<script lang="ts" setup>
import { useProfileStore } from "~/store/profile";

const { user_profile } = storeToRefs(useProfileStore());
const currentTimeOfDay = computed(() => {
  const hours = new Date().getHours();
  if (hours < 12) return "morning";
  if (hours < 18) return "afternoon";
  return "evening";
});

const currentTime = computed(() => {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});
</script>

<template>
  <UCard class="min-h-[100px]">
    <template #default>
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-grow">
          <h2 class="text-lg font-semibold">
            Good {{ currentTimeOfDay }}, {{ user_profile?.name }}
          </h2>
          <p class="text-sm text-(--ui-text-muted)">
            Here's what's happening with your tasks today
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UIcon
            :name="currentTimeOfDay === 'evening' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            size="24"
          />
          <span class="text-(--ui-text-muted) text-2xl">{{ currentTime }}</span>
        </div>
      </div>
    </template>
  </UCard>
</template>

<style></style>
