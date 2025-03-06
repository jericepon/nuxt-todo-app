import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const task = await readBody(event)
  
  const { data, error } = await client
    .from("tasks")
    .insert([
      {
        ...task,
        user_id: user?.id,
      },
    ])
    .select();

  return { data, error };
});
