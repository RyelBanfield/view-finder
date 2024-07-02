"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const updateUsername = async (
  id: string,
  first_name: string,
  last_name: string,
  username: string,
) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("users")
    .update({
      first_name,
      last_name,
      username,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/profile");
};

export const createAlbumAction = async (name: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  const { data: album, error: insertError } = await supabase
    .from("albums")
    .insert({
      user_id: data.user.id,
      name,
    })
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  revalidatePath("/", "layout");
  redirect(`/album/${album.id}`);
};
