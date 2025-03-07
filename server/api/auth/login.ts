import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event)

  const { data, error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });
  
  return { data, error };
});
