<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useProfileStore } from "~/store/profile";

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { user_profile } = useProfileStore();
const colorMode = useColorMode();

const { clear } = useClearOnLogout();

const pageTitle = computed(() => {
  return (route.meta.name || "Task App").replace(/-/g, " ");
});
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const items = ref([
  [
    { label: "ben@example.com", slot: "account", disabled: true },
    { label: "Divider", icon: "i-heroicons-user", slot: "divider", class: "p-0", disabled: true },
    {
      label: "Divider",
      icon: "i-heroicons-user",
      slot: "divider",
      class: "p-0 md:hidden",
      disabled: true,
    },
    {
      label: "Tasks",
      icon: "i-heroicons-clipboard-document-list",
      class: "md:hidden",
      to: "/tasks",
    },
    { label: "Analytics", icon: "i-heroicons-chart-bar", class: "md:hidden", to: "/analytics" },
    { label: "Settings", icon: "i-heroicons-cog", to: "/settings" },
    { label: "", icon: "i-lucide-sun-moon", slot: "color-mode" },
    { label: "Divider", icon: "i-heroicons-user", slot: "divider", class: "p-0", disabled: true },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await supabase.auth.signOut().then(() => {
          clear();
          navigateTo("/login");
        });
      },
    },
  ],
]);
</script>

<template>
  <header
    class="bg-white dark:bg-gray-900 flex items-center justify-between max-h-12 h-full px-4 sm:px-6 lg:px-8 py-1 border-b border-(--ui-border) dark:border-gray-800"
  >
    <nav class="flex items-center justify-between flex-grow">
      <div class="flex justify-center items-center">
        <span class="capitalize">{{ pageTitle }}</span>
      </div>

      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar :src="user_profile?.avatar_url" :alt="user_profile?.name" />

        <template #account="{ item }">
          <div class="text-left">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ user_profile?.name }}
            </p>
          </div>
        </template>

        <template #divider="{ item }">
          <div class="border-t border-0.5 border-x-0 border-b-0 my-2 bg-gray-400 w-full" />
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>

        <template #color-mode="{ item }">
          <div class="w-full flex items-center justify-between" @click="isDark = !isDark">
            <span class="truncate">{{ isDark ? "Light" : "Dark" }}</span>
            <UIcon
              :name="`${isDark ? 'i-lucide-sun' : 'i-lucide-moon'}`"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </div>
        </template>
      </UDropdown>
    </nav>
  </header>
</template>
