import { defineStore } from 'pinia';
import type { Task } from '~/types';

export const useTaskStore = defineStore('task', {
  state: () => ({
    list: [] as Task[],
  }),
  actions: {
    setTasksList(list: Task[]) {
      this.list = list;
    },
    clearProfile() {
      this.list = [];
    },
  },
});