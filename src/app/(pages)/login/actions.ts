"use server";

import { createClient } from "@/utils/supabase/server";

export const loginWithEmailAction = async (email: string) => {
  const supabase = createClient();

  await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
  });
};
