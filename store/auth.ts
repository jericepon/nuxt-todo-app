import type { Session, User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { useProfileStore } from './profile';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(user: User | null) {
      const { addProfile } = useProfileStore();
      this.user = user ? { ...user } : null;
      this.isAuthenticated = true;
      addProfile({
        user_id: user?.id,
        name: user?.user_metadata.name,
        email: user?.user_metadata.email,
        avatar_url: user?.user_metadata.avatar_url,
      });
    },
    clearAuth() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  persist: true,
});