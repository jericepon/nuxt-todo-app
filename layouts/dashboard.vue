<script lang="ts" setup>
import "~/assets/css/main.css";
import { useProfileStore } from "~/store/profile";

const client = useSupabaseClient();
const user = useSupabaseUser();
const { user_profile } = storeToRefs(useProfileStore());

let isOpen = ref(true);
let baseWidth = ref("100%");

let sideBarOptions = {
  onToggleSidebar: () => {
    isOpen.value = !isOpen.value;

    baseWidth.value = `${isOpen.value ? 240 : 72}px`;

    updateScreenWidth();
  },
};

const {
  data: profile,
  pending,
  refresh,
} = await useAsyncData("profile", async () => {
  const { data } = await client
    .from("profiles")
    .select("*")
    .eq("user_id", user?.value?.id || "")
    .single();
  return data;
});

const updateScreenWidth = () => {
  window.innerWidth < 1024
    ? (baseWidth.value = "100%")
    : (baseWidth.value = `calc(100% - ${isOpen.value ? 240 : 72}px)`);
  document.documentElement.style.setProperty("--base-layout-width", baseWidth.value);
};

watchEffect(() => {
  user_profile.value = profile.value;
});

onMounted(() => {
  window.innerWidth < 1024 && (isOpen.value = false);

  window.addEventListener("resize", () => {
    isOpen.value = window.innerWidth >= 1024;

    updateScreenWidth();
  });
});
</script>

<template>
  <LayoutSideBar
    class="fixed z-20 transition-[width] bg-white transition-all"
    :class="{
      'w-60': isOpen,
      'w-60 lg:w-[72px]': !isOpen,
      '-translate-x-full lg:-translate-x-0': !isOpen,
    }"
    v-bind="sideBarOptions"
    :is-open
  />
  <LayoutNavBar
    class="fixed top-0 z-10 left-auto right-0 w-full max-w-[var(--base-layout-width)] transition-all"
    @toggle-sidebar="sideBarOptions.onToggleSidebar"
  />
  <main
    class="flex flex-grow flex-col mt-[48px] ml-auto w-full max-w-[var(--base-layout-width)] dark:bg-gray-900 transition-all"
  >
    <UContainer class="w-full py-4 sm:pt-6 lg:pt-8">
      <slot />
    </UContainer>
  </main>
  <UNotifications />
</template>
