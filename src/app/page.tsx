import Link from "next/link";

import TransitionLink from "@/components/TransitionLink";
import { Button } from "@/components/ui/button";

import {
  fetchCurrentUserProfile,
  redirectIfMissingDetails,
} from "./actions/userActions";
import ImageSlider from "./components/ImageSlider";

const Home = async () => {
  const userProfile = await fetchCurrentUserProfile();

  await redirectIfMissingDetails(userProfile);

  return (
    <>
      <section className="space-y-6 px-6 py-12">
        <div className="space-y-4">
          <h1 className="text-balance text-center text-3xl font-bold">
            Find yourself with View Finder
          </h1>

          <p className="text-balance text-center text-sm text-muted-foreground">
            Discover and connect with amazing photographers.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button size={"sm"} className="w-24" asChild>
            <TransitionLink href="/explore" className="text-xs">
              Explore
            </TransitionLink>
          </Button>

          <Button size={"sm"} variant={"secondary"} className="w-24" asChild>
            <Link href="#about-us" className="text-xs">
              Learn More
            </Link>
          </Button>
        </div>
      </section>

      <ImageSlider />

      <section id="about-us" className="space-y-4 px-6 py-12">
        <h2 className="text-balance text-2xl font-bold">
          We&apos;re focused on experience.
        </h2>

        <p className="text-balance text-sm text-muted-foreground">
          View Finder is a platform that connects photographers with their
          clients. We&apos;re dedicated to delivering high-quality visuals and a
          seamless user experience. We will be taking feedback and iterating on
          our platform to ensure it meets the needs of our users.
        </p>
      </section>
    </>
  );
};

export default Home;
