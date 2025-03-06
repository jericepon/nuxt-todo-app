import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const task = await readBody(event)

  const { data, error } = await client
    .from("tasks")
    .update(task)
    .eq("id", task.id)
    .select();

  return { data, error };
});
