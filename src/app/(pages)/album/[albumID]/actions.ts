"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const fetchAlbumAction = async (albumID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", albumID)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const deleteAlbumAction = async (albumID: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("albums").delete().eq("id", albumID);

  if (error) {
    console.error(error);
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/profile");
};
