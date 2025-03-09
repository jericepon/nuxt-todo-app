<script lang="ts" setup>
useHead({
  title: "Todo • Dashboard",
  meta: [
    {
      name: "description",
      content: "Home page description",
    },
  ],
});
definePageMeta({
  name: "dashboard",
  middleware: "auth",
  layout: "dashboard",
});
</script>

<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <DashboardWelcomeCard class="md:col-span-2 lg:col-span-3" />
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(10)" />
  </div>
</template>

<style></style>
