
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { id } = await getQuery(event)

  const { data, error } = await client.from("tasks").select("*").eq("id", id).single();

  return {
    data
  };
});
