import {
  fetchCurrentUserProfile,
  redirectIfMissingDetails,
} from "./actions/userActions";
import { AboutUs } from "./components/AboutUs";
import { Hero } from "./components/Hero";

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
