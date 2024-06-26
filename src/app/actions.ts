"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const checkAndReturnUserProfile = async () => {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error(authError);
    redirect("/");
  }

  const { data: userProfile, error: errorProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", auth.user.id)
    .single();

  if (errorProfile) {
    console.error(errorProfile);
    redirect("/");
  }

  return userProfile;
};
