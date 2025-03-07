import { defineStore } from 'pinia';

interface UserProfile {
  user_id?: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user_profile: null as UserProfile | null,
  }),
  actions: {
    async addProfile(profile: UserProfile) {
      const supabase = useSupabaseClient();

      if (!profile.name)
      {
        const emailName = profile.email.split('@')[0];
        profile.name = emailName;
      }

      // Check if the current exists in the profiles table
      this.checkUserExists(profile.email).then(({ data }) => {
        // If the user exists, do nothing
        if (data?.length) return;
        // Otherwise, add the user to the profiles table
        supabase
          .from('profiles')
          .insert([
            profile,
          ])
          .select()
          .then(({ data, error }) => {
            data && this.handleProfieNofication({ description: 'Profile created successfully', type: 'success' });
            error && this.handleProfieNofication({ description: error.message, type: 'error' })
          });
      });

      this.user_profile = profile;
    },
    async checkUserExists(email: string) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email);

      return { data, error };
    },
    setProfile(user_profile: UserProfile) {
      this.user_profile = user_profile;
    },
    handleProfieNofication(data: any) {
      const { notify } = useNotifications();
      notify(data);
    },
    clearProfile() {
      this.user_profile = null;
    },
  },
});