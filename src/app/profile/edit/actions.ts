"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const updateUsername = async (id: string, username: string) => {
  console.log(username);

  const supabase = createClient();

  const { error } = await supabase
    .from("users")
    .update({ username })
    .eq("id", id);

  if (error) console.error(error);

  redirect("/");
};
