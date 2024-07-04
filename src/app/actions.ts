"use server";

import { createClient } from "@/utils/supabase/server";

export const fetchUserAuthAction = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data.user;
};

export const fetchProfileAction = async () => {
  const supabase = createClient();

  const { data: userAuth, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error(authError.message);
    return null;
  }

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userAuth.user.id)
    .single();

  if (profileError) {
    console.error(profileError.message);
    return null;
  }

  const { count: photoCount, error: photoCountError } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userAuth.user.id);

  if (photoCountError) {
    console.error(photoCountError);
    return null;
  }

  return {
    ...userProfile,
    photo_count: photoCount as number,
  };
};
