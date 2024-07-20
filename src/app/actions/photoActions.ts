"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const insertPhotos = async (
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

export const fetchPhotosByAlbumID = async (albumID: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", albumID);

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

  return data;
};

export const fetchPhotoByID = async (photoID: string) => {
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

export const deletePhotoAndRedirectToAlbum = async (
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

export const fetchRandomPhotoFromAlbum = async (albumID: string) => {
  const supabase = createClient();

  const { data: allPhotos, error: fetchError } = await supabase
    .from("photos")
    .select("id")
    .eq("album_id", albumID);

  if (fetchError) {
    // eslint-disable-next-line no-console
    console.error(fetchError);
    return null;
  }

  if (allPhotos.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * allPhotos.length);
  const randomPhotoID = allPhotos[randomIndex].id;

  const { data: randomPhoto, error: photoError } = await supabase
    .from("photos")
    .select("*")
    .eq("id", randomPhotoID)
    .single();

  if (photoError) {
    // eslint-disable-next-line no-console
    console.error(photoError);
    return null;
  }

  return randomPhoto.file_path;
};
