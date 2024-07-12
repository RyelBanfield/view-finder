"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
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
];

const ImageSlider = () => {
  return (
    <section className="flex flex-col gap-3 py-12">
      <section className="flex w-screen justify-start overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="flex gap-3"
        >
          {[...images, ...images].map((image, index) => (
            <div
              key={index}
              className="relative grid aspect-[16/10] w-[80vw] place-items-center md:w-[30vw]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </section>

      <section className="flex w-screen justify-start overflow-hidden">
        <motion.div
          initial={{ x: "-50%" }}
          animate={{ x: 0 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="flex gap-3"
        >
          {[...images, ...images].map((image, index) => (
            <div
              key={index}
              className="relative grid aspect-[16/10] w-[80vw] place-items-center md:w-[30vw]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </section>
    </section>
  );
};

export default ImageSlider;
