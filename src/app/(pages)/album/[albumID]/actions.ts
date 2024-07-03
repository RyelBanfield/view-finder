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

export const insertPhotosAction = async (
  uploadedPhotos: {
    user_id: string;
    album_id: string;
    file_path: string;
  }[],
) => {
  const supabase = createClient();

  const { error } = await supabase.from("photos").insert(uploadedPhotos);

  if (error) {
    console.error(error);
    return error;
  }
};

export const fetchPhotosAction = async (albumID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", albumID);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
