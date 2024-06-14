"use server";

import { createClient } from "@/utils/supabase/server";

export const checkIfLoggedIn = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.getUser();

  if (error) return false;
  return true;
};

export const loginWithEmail = async (email: string) => {
  const supabase = createClient();

  await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
  });
};
