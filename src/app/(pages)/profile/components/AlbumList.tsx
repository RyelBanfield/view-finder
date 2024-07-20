"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchRandomPhotoFromAlbum } from "@/app/actions/photoActions";
import TransitionLink from "@/components/TransitionLink";
import { Tables } from "@/lib/database.types";

const AlbumList = ({ albums }: { albums: Tables<"albums">[] }) => {
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

  const [coverPhotos, setCoverPhotos] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    const fetchCoverPhotos = async () => {
      if (albums) {
        const photos = await Promise.all(
          albums.map(async (album) => {
            const filePath = await fetchRandomPhotoFromAlbum(album.id);
            return { albumId: album.id, url: filePath || null };
          }),
        );

        const photoMap = photos.reduce(
          (acc, photo) => {
            if (photo.url) {
              acc[photo.albumId] = photo.url;
            }
            return acc;
          },
          {} as { [key: string]: string | null },
        );

        setCoverPhotos(photoMap);
      }
    };

    fetchCoverPhotos();
  }, [albums]);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-4"
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
            {coverPhotos[album.id] ? (
              <>
                <Image
                  src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${coverPhotos[album.id]}`}
                  alt={album.name}
                  fill
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
