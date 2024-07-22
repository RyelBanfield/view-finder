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
      <section className="space-y-6 px-6 py-12 md:py-24">
        <div className="space-y-4 md:space-y-0">
          <h1 className="text-balance text-center text-3xl font-bold md:text-left md:text-4xl">
            Find yourself with View Finder
          </h1>

          <p className="text-balance text-center text-sm text-muted-foreground md:text-left md:text-base">
            Discover and connect with amazing photographers.
          </p>
        </div>

        <div className="flex justify-center space-x-4 md:justify-start">
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

      <section id="about-us" className="space-y-4 px-6 pb-24 pt-12">
        <h2 className="text-balance text-2xl font-bold md:text-center md:text-3xl">
          We&apos;re focused on experience.
        </h2>

        <p className="mx-auto max-w-3xl text-balance text-sm text-muted-foreground md:text-center md:text-base">
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
