<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
const user = useSupabaseUser();

const { login } = useAuthStore();

watch(
  user,
  () => {
    if (user.value) {
      login(user.value);
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <p>Redirecting...</p>
  </div>
</template>
