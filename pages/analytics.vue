<script lang="ts" setup>
useHead({
  title: "Todo • Analytics",
});
definePageMeta({
  name: "analytics",
  middleware: "auth",
  layout: "dashboard",
});
</script>

<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(4)" />
  </div>
</template>

<style></style>
