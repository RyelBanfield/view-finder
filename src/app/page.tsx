import { AboutUs } from "@/components/AboutUs";
import { Hero } from "@/components/Hero";

import { fetchCurrentUserProfile, redirectIfMissingDetails } from "./actions";

const Home = async () => {
  const userProfile = await fetchCurrentUserProfile();

  await redirectIfMissingDetails(userProfile);

  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
};

export default Home;
