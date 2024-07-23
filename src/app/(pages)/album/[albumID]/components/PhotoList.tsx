"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import TransitionLink from "@/components/TransitionLink";
import { Tables } from "@/lib/database.types";

const PhotoList = ({ photos }: { photos: Tables<"photos">[] }) => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-4"
    >
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          variants={itemVariants}
          whileHover={{
            opacity: 0.9,
            rotateZ: -1,
            transition: {
              duration: 0.25,
            },
          }}
          whileTap={{
            scale: 0.95,
            transition: {
              duration: 0.25,
            },
          }}
          className="relative aspect-square rounded shadow-2xl"
        >
          <TransitionLink href={`/photo/${photo.id}`}>
            <Image
              src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
              alt={photo.id}
              fill
              placeholder="blur"
              blurDataURL={photo.base64}
              className="absolute rounded object-cover object-top"
            />
          </TransitionLink>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PhotoList;
