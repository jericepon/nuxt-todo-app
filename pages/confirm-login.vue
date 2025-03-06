<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

definePageMeta({
  name: "confirm-login",
});

const user = useSupabaseUser();

const { login } = useAuthStore();

watch(user, () => {
  console.log(user.value);
  if (user.value) {
    login(user.value);
    return navigateTo("/");
  }
});
</script>

<template>
  <div>
    <p>Redirecting...</p>
  </div>
</template>
