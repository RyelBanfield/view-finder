"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";

export const deleteAlbumAction = async (
  userID: string,
  albumID: string,
  photos: Tables<"photos">[] | null,
) => {
  const supabase = createClient();

  const { error: databaseError } = await supabase
    .from("albums")
    .delete()
    .eq("id", albumID);

  if (databaseError) {
    console.error(databaseError);
    return databaseError;
  }

  if (photos && photos.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("photos")
      .remove(photos.map((photo) => photo.file_path));

    if (storageError) {
      console.error(storageError);
      return storageError;
    }
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
