import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const { file } = await readBody(event)

  const timestamp = new Date().getTime();
  const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');
  const mimeType = file.match(/^data:(image\/\w+);base64,/)[1];
  const extension = mimeType.split('/')[1];
  const filename = `public/avatar_${timestamp}.${extension}`;

  const { data, error } = await client
    .storage
    .from('avatars')
    .upload(filename, buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: mimeType,
    });

  const avatar_url = `https://roxyhadlmvxjtxluxvuo.supabase.co/storage/v1/object/public/avatars/${filename}`;

  return { avatar_url };
});
