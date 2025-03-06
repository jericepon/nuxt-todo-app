import { useAuthStore } from "~/store/auth";
import { useProfileStore } from "~/store/profile";

export function useClearOnLogout() {

  const { clearProfile } = useProfileStore();
  const { clearAuth } = useAuthStore();

  const clear = () => {
    console.log('Clearing profile and auth data');
    
    clearProfile();
    clearAuth();
  }

  return {
    clear
  }
}