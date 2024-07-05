import { AboutUs } from "@/components/AboutUs";
import { Hero } from "@/components/Hero";

import { fetchProfileAction, redirectIfMissingDetails } from "./actions";

const Home = async () => {
  const userProfile = await fetchProfileAction();

  await redirectIfMissingDetails(userProfile);

  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
};

export default Home;
