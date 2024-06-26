import { redirect } from "next/navigation";

import { AboutUs } from "@/components/AboutUs";
import { Hero } from "@/components/Hero";
import { createClient } from "@/utils/supabase/server";

const Home = async () => {
  const supabase = createClient();

  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (auth && !authError) {
    const { data: userProfile, error: errorProfile } = await supabase
      .from("users")
      .select("*")
      .eq("id", auth.user.id)
      .single();

    if (userProfile && !errorProfile && !userProfile.username) {
      redirect(`/profile/edit`);
    }
  }

  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
};

export default Home;
