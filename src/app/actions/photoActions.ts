"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";

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
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error(databaseError);
    return databaseError;
  }

  const { error: storageError } = await supabase.storage
    .from("photos")
    .remove([`${filePath}`]);

  if (storageError) {
    // eslint-disable-next-line no-console
    console.error(storageError);
    return storageError;
  }

  revalidatePath("/", "layout");
  redirect(`/album/${albumID}`);
};

export const fetchRandomPhotoFromAlbum = async (albumID: string) => {
  const supabase = createClient();

  const { data: photos, error } = await supabase
    .from("photos")
    .select("id, file_path")
    .eq("album_id", albumID);

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

  if (photos.length === 0) return null;

  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  return randomPhoto.file_path;
};

export const fetchBase64ForPhoto = async (filePath: string) => {
  const { base64 } = await getPlaiceholder(
    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${filePath}`,
    ).then(async (res) => Buffer.from(await res.arrayBuffer())),
  );

  return base64;
};
