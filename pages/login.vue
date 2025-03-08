<script lang="ts" setup>
import { z } from "zod";
import { useAuthStore } from "~/store/auth";

useHead({
  title: `Todo`,
});
definePageMeta({
  name: "login",
  middleware: "guest",
  layout: "auth",
});

const client = useSupabaseClient();
const { login } = useAuthStore();
const { notify } = useNotifications();
const { origin } = useRequestURL();
const isSignUp = ref(false);
const redirectTo = `${origin}/confirm-login`;
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive<z.infer<typeof schema>>({
  email: "",
  password: "",
});

const oAuthLogin = async () => {
  client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
};

const handleSignUp = async () => {
  const { data, error } = await client.auth.signUp({
    email: state.email,
    password: state.password,
  });

  error && notify({ type: "error", description: error.message });
};

const handleSignInWithPassword = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  });

  error && notify({ type: "error", description: error.message });
};

const onSubmit = async () => {
  isSignUp.value ? handleSignUp() : handleSignInWithPassword();
};

client.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    if (session?.user) {
      login(session.user);
      navigateTo("/");
    }
  }
});
</script>
<template>
  <UCard class="min-w-80">
    <div class="space-y-6">
      <div class="flex flex-col text-center space-y-4">
        <div class="text-xl text-pretty font-semibold">{{ !isSignUp ? "Login" : "Sign up" }}</div>
        <div class="mt-1 text-sm text-pretty">
          {{ !isSignUp ? "Login to your account" : "Create an account" }}
        </div>
        <UButton class="w-full justify-center" icon="i-uim-google" color="gray" @click="oAuthLogin">
          Google
        </UButton>
      </div>
      <UDivider label="or" />
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" class="w-full justify-center">
          {{ !isSignUp ? "Login" : "Sign up" }}
        </UButton>

        <div class="mt-1 text-sm text-pretty">
          {{ !isSignUp ? "Don't have an account?" : "Already have an account?" }}
          <UButton variant="link" @click="isSignUp = !isSignUp">{{
            !isSignUp ? "Login" : "Sign up"
          }}</UButton>
        </div>
      </UForm>
    </div>
  </UCard>
  <div class="fixed z-10 top-auto right-4 bottom-4 left-auto">
    <ColorModeBtn />
  </div>
</template>
<style></style>
