"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";

import { fetchRandomPhotoFromAlbum } from "./photoActions";

export const fetchAlbumsByUserID = async (userID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("user_id", userID);

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return null;
  }

  const albumsWithCoverPhotos = await Promise.all(
    data.map(async (album) => {
      const randomPhotoFromAlbum = await fetchRandomPhotoFromAlbum(album.id);

      if (!randomPhotoFromAlbum) return album;

      return {
        ...album,
        coverPhoto: randomPhotoFromAlbum.file_path,
        base64: randomPhotoFromAlbum.base64,
      };
    }),
  );

  return albumsWithCoverPhotos;
};

export const createAlbum = async (name: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  const { error: insertError } = await supabase
    .from("albums")
    .insert({
      user_id: data.user.id,
      name,
    })
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  revalidatePath("/", "layout");
};

export const fetchAlbumByID = async (albumID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", albumID)
    .single();

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return null;
  }

  return data;
};

export const deleteAlbumAndPhotos = async (
  albumID: string,
  photos: Tables<"photos">[] | null,
) => {
  const supabase = createClient();

  const { error: databaseError } = await supabase
    .from("albums")
    .delete()
    .eq("id", albumID);

  if (databaseError) {
    // eslint-disable-next-line no-console
    console.error(databaseError);
    return databaseError;
  }

  if (photos && photos.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("photos")
      .remove(photos.map((photo) => photo.file_path));

    if (storageError) {
      // eslint-disable-next-line no-console
      console.error(storageError);
      return storageError;
    }
  }

  revalidatePath("/", "layout");
  redirect("/profile");
};
