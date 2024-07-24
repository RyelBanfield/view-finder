"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import TransitionLink from "@/components/TransitionLink";
import { Tables } from "@/lib/database.types";

const MorePhotosGrid = ({ photos }: { photos: Tables<"photos">[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {photos.map((photo) => (
        <motion.div
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
          key={photo.id}
          className="relative aspect-square"
        >
          <TransitionLink href={`/photo/${photo.id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.file_path}`}
              alt=""
              placeholder="blur"
              blurDataURL={photo.base64}
              fill
              className="rounded object-cover object-top"
            />
          </TransitionLink>
        </motion.div>
      ))}
    </div>
  );
};

export default MorePhotosGrid;
