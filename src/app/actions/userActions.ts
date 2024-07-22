"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";

export const loginWithEmail = async (email: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) return error.message;

  redirect("/login/email-submitted");
};

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

export const fetchUserAuth = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return null;
  }

  return data.user;
};

export const fetchCurrentUserProfile = async () => {
  const supabase = createClient();

  const { data: userAuth, error: authError } = await supabase.auth.getUser();

  if (authError) {
    // eslint-disable-next-line no-console
    console.error(authError.message);
    return null;
  }

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userAuth.user.id)
    .single();

  if (profileError) throw new Error(profileError.message);

  const { count: photoCount, error: photoCountError } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userAuth.user.id);

  if (photoCountError) throw new Error(photoCountError.message);

  return {
    ...userProfile,
    photo_count: photoCount as number,
  };
};

export const redirectIfMissingDetails = async (
  userProfile: Tables<"users"> | null,
) => {
  if (!userProfile) return;

  if (!userProfile.first_name || !userProfile.username) {
    redirect("/profile/edit");
  }
};

export const fetchUserByUsername = async (username: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return null;
  }

  return data;
};
