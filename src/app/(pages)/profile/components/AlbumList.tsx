"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import TransitionLink from "@/components/TransitionLink";
import { Tables } from "@/lib/database.types";

interface AlbumWithCoverPhoto extends Tables<"albums"> {
  coverPhoto?: string;
  base64?: string;
}

const AlbumList = ({
  baseURL,
  albums,
}: {
  baseURL: string;
  albums: AlbumWithCoverPhoto[];
}) => {
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
      className="grid w-full max-w-3xl grid-cols-2 gap-4 self-center sm:grid-cols-3"
    >
      {albums.map((album) => (
        <motion.div
          key={album.id}
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
          <TransitionLink href={`album/${album.id}`}>
            {album.coverPhoto ? (
              <>
                <Image
                  src={`${baseURL}/storage/v1/object/public/photos/${album.coverPhoto}`}
                  alt={album.name}
                  fill
                  placeholder="blur"
                  blurDataURL={album.base64}
                  className="absolute rounded object-cover object-top"
                />
                <div className="absolute flex h-full w-full items-end rounded bg-gradient-to-bl from-transparent via-black/10 to-black p-2">
                  <p className="absolute text-xs text-white/60">{album.name}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full w-full items-end rounded bg-primary p-2">
                <p className="text-xs text-white/60">{album.name} (Empty)</p>
              </div>
            )}
          </TransitionLink>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AlbumList;
