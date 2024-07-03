"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const fetchPhotoAction = async (photoID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("id", photoID)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const deletePhotoAction = async (
  photoID: string,
  albumID: string,
  filePath: string,
) => {
  const supabase = createClient();

  const { error: databaseError } = await supabase
    .from("photos")
    .delete()
    .eq("id", photoID);

  if (databaseError) {
    console.error(databaseError);
    return databaseError;
  }

  const { error: storageError } = await supabase.storage
    .from("photos")
    .remove([`${filePath}`]);

  if (storageError) {
    console.error(storageError);
    return storageError;
  }

  revalidatePath("/", "layout");
  redirect(`/album/${albumID}`);
};
