import { redirect } from "next/navigation";

import { AboutUs } from "@/components/AboutUs";
import { Hero } from "@/components/Hero";

import { fetchUserProfileAction } from "./actions";

const Home = async () => {
  const userProfile = await fetchUserProfileAction();

  if (userProfile) {
    if (!userProfile.first_name || !userProfile.username)
      redirect("/profile/edit");
  }

  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
};

export default Home;
