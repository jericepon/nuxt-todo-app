<script lang="ts" setup>
import "~/assets/css/main.css";
</script>

<template>
  <UContainer class="flex w-full pt-4 pb-4 sm:pt-6 lg:pt-8 justify-center items-center flex-grow flex-1 ">
    <slot />
  </UContainer>
  <UNotifications />
</template>

<style></style>
