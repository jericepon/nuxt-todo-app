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
  <div class="w-full grid grid-cols-3 gap-4">
    <USkeleton class="min-h-[200px]" :ui="{}" v-for="i in Array(10)" />
  </div>
</template>

<style></style>
