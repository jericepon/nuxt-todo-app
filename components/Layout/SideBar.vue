<script setup lang="ts">
import logo from "~/assets/img/logo.svg";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggle-sidebar"]);

const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-home",
    to: "/",
    click: () => window.innerWidth < 1024 && emit("toggle-sidebar"),
  },
  {
    label: "Tasks",
    icon: "i-heroicons-clipboard-document-list",
    to: "/tasks",
    click: () => window.innerWidth < 1024 && emit("toggle-sidebar"),
  },
  {
    label: "Analytics",
    icon: "i-heroicons-chart-bar",
    to: "/analytics",
    click: () => window.innerWidth < 1024 && emit("toggle-sidebar"),
  },
];

const toggleSideBar = () => {
  emit("toggle-sidebar");
};
</script>

<template>
  <aside
    class="border-r border-(--ui-border) dark:bg-gray-900 dark:border-gray-800 px-4 pb-4 h-full"
  >
    <div class="h-12 items-center flex mb-8 cursor-pointer" @click="navigateTo('/')">
      <UAvatar size="md" :src="logo" class="mr-2" />
      <span
        class="text-gray-900 dark:text-white text-lg font-medium animate-[fade-in_500ms_ease-in_1]"
        :class="{ 'lg:hidden': !isOpen }"
        >Todo App</span
      >
      <DashboardSidebarToggle
        :is-open="isOpen"
        @toggle-sidebar="toggleSideBar"
        icon="i-heroicons-x-mark"
        variant="link"
        class="w-8 h-8 lg:hidden ml-auto"
      />
    </div>
    <UVerticalNavigation
      :ui="{
        wrapper: `flex-grow justify-between h-full flex flex-col`,
        divider: {
          wrapper: {
            base: 'hidden',
          },
        },
        base: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 focus-visible:before:ring-(--ui-primary) flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0 text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors',
      }"
      :links
    >
      <template #default="{ link }">
        <span :class="{ 'lg:hidden': !isOpen }" class="animate-[fade-in_500ms_ease-in_1]">{{
          link.label
        }}</span>
      </template>
      <template #icon="{ link }">
        <UTooltip :text="link.label" :popper="{ placement: 'right' }" v-if="!isOpen">
          <UIcon :name="link.icon" size="20" />
        </UTooltip>
        <UIcon :name="link.icon" size="20" v-else />
      </template>
    </UVerticalNavigation>
    <!-- SideBar Toggle -->
    <DashboardSidebarToggle
      :is-open="isOpen"
      @toggle-sidebar="toggleSideBar"
      :icon="`i-heroicons-chevron-${isOpen ? 'left' : 'right'}`"
      class="absolute top-0 bottom-0 m-auto left-auto -right-[15px] scale-[0.7] w-8 h-8 hidden lg:block"
    />
  </aside>
</template>
