import { createClient } from '@supabase/supabase-js';

export function useSupabase() {
  const config = useRuntimeConfig();
  // const supabase = useSupabaseClient();
  const supabase = createClient(config.public.SUPABASE_URL as string, config.public.SUPABASE_KEY as string)
  return supabase;
}