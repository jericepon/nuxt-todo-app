<script lang="ts" setup>
import { useProfileStore } from "~/store/profile";

type FormData = {
  name: string;
  avatar_url?: string;
  image?: File;
};

useHead({
  title: "TodoSettings",
});
definePageMeta({
  name: "settings",
  middleware: "auth",
  layout: "dashboard",
});

const { notify } = useNotifications();
const { setProfile, user_profile } = useProfileStore();

const handleUploadAvatar = (file: File) =>
  $fetch("/api/profile/updload", {
    method: "POST",
    body: { file },
  });

const handleUpdateProfile = ({ name, avatar_url }: FormData) =>
  $fetch("/api/profile/update", {
    method: "POST",
    body: { name, avatar_url },
  }).then(({ data, error }) => {
    reloadNuxtApp();
    return { data, error };
  });

const handleSubmit = ({ name, avatar_url, image }: FormData) => {
  if (image) {
    return handleUploadAvatar(image).then(({ avatar_url }) => {
      handleUpdateProfile({ name, avatar_url }).then(({ data, error }) => {
        error && notify({ type: "error", description: error.message });
        if (data?.length) {
          setProfile(data[0]);
          notify({ type: "success", description: "Profile updated" });
        }
      });
    });
  } else {
    handleUpdateProfile({ name }).then(({ data, error }) => {
      error && notify({ type: "error", description: error.message });
      if (data?.length) {
        setProfile(data[0]);
        notify({ type: "success", description: "Profile updated" });
      }
    });
  }
};
</script>

<template>
  <div>
    <img
      src="https://roxyhadlmvxjtxluxvuo.supabase.co/storage/v1/object/public/avatars/avatar1.png"
      alt=""
      srcset=""
    />
    <SettingsForm v-if="user_profile" @submit="handleSubmit" :profile="user_profile" />
  </div>
</template>

<style></style>
