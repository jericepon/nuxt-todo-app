import { useAuthStore } from '~/store/auth';

export default function () {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated)
  {
    return navigateTo('/login');
  }
}