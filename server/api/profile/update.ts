import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const profile = await readBody(event)

  const { data, error } = await client
    .from("profiles")
    .update(profile)
    .eq("user_id", user?.id)
    .select();

  return { data, error };
});
