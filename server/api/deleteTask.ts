import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { id } = await readBody(event)
  
  const { data, error } = await client
    .from('tasks')
    .delete()
    .eq('id', id).select();

  return { data, error };
});
