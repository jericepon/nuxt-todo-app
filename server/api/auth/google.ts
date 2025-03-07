import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = await getQuery(event);

  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: query,
  });

  return { data, error };
});
