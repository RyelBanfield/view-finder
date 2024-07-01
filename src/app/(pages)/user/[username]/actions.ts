"use server";

import { createClient } from "@/utils/supabase/server";

export const fetchUserProfileAction = async (username: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
};
