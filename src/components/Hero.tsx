"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button, ButtonProps } from "./ui/button";

type ImageProps = {
  src: string;
  alt: string;
};

interface ExtendedButtonProps extends ButtonProps {
  href?: string;
}

type Props = {
  heading: string;
  description: string;
  buttons: ExtendedButtonProps[];
  images: ImageProps[];
};

export type HeroProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Hero = (props: HeroProps) => {
  const { heading, description, buttons, images } = {
    ...HeroDefaults,
    ...props,
  } as Props;

  return (
    <header className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex flex-col items-center">
        <div className="mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-balance text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            {heading}
          </h1>

          <p className="text-balance md:text-md">{description}</p>

          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button key={index} variant={button.variant} size={"sm"}>
                {button.href && <Link href={button.href}>{button.title}</Link>}
                {!button.href && button.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex w-screen justify-start overflow-hidden">
          <div className="grid shrink-0 grid-cols-1 gap-y-4">
            <motion.div
              initial={{ x: "0" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 50,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="grid w-full auto-cols-fr grid-cols-2 gap-4 self-center"
            >
              {[...new Array(2)].map((_e, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src={image.src}
                        alt={image.alt}
                        width={500}
                        height={500}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ x: "-50%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 50,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="grid w-full grid-cols-2 gap-4 self-center"
            >
              {[...new Array(2)].map((_e, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src={image.src}
                        alt={image.alt}
                        width={500}
                        height={500}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const HeroDefaults: HeroProps = {
  heading: "Explore stunning visuals on View Finder",
  description:
    "A platform to discover and connect with the top in the industry.",
  buttons: [
    { title: "Explore", href: "/explore" },
    { title: "Learn More", variant: "secondary", href: "#about-us" },
  ],
  images: [
    {
      src: "/hero/1.jpg",
      alt: "Placeholder image 1",
    },

    {
      src: "/hero/2.jpg",
      alt: "Placeholder image 2",
    },

    {
      src: "/hero/3.jpg",
      alt: "Placeholder image 3",
    },

    {
      src: "/hero/4.jpg",
      alt: "Placeholder image 4",
    },

    {
      src: "/hero/5.jpg",
      alt: "Placeholder image 5",
    },

    {
      src: "/hero/6.jpg",
      alt: "Placeholder image 6",
    },
  ],
};

Hero.displayName = "Hero";
