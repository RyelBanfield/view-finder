import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import {
  fetchMorePhotosFromAlbum,
  fetchPhotoByID,
} from "@/app/actions/photoActions";
import { fetchUserAuth, fetchUserByID } from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";
import { Button } from "@/components/ui/button";

import DeletePhotoButton from "./components/DeletePhotoButton";
import DownloadPhotoButton from "./components/DownloadPhotoButton";
import MorePhotosGrid from "./components/MorePhotosGrid";
import SharePhotoButton from "./components/SharePhotoButton";

const PhotoPage = async ({ params }: { params: { photoID: string } }) => {
  const photo = await fetchPhotoByID(params.photoID);
  if (!photo) return notFound();

  const userPhotoBelongsTo = await fetchUserByID(photo.user_id);
  if (!userPhotoBelongsTo) return notFound();

  const album = await fetchAlbumByID(photo.album_id);
  if (!album) return notFound();

  const morePhotosFromThisAlbum = await fetchMorePhotosFromAlbum(
    photo.id,
    album.id,
    4,
  );

  const currentUser = await fetchUserAuth();
  const doesPhotoBelongToCurrentUser =
    userPhotoBelongsTo.id === currentUser?.id;

  return (
    <div className="flex grow flex-col gap-16 pb-16">
      <div className="flex flex-col gap-8">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.file_path}`}
          alt=""
          placeholder="blur"
          blurDataURL={photo.base64}
          width={1080}
          height={1080}
          priority
        />

        <div className="flex flex-col items-center justify-between gap-4 px-6">
          <div className="flex gap-4">
            <TransitionLink
              href={`/${userPhotoBelongsTo.username}`}
              className="text-sm tracking-tighter text-muted-foreground hover:text-primary md:text-sm"
            >
              {userPhotoBelongsTo.first_name} {userPhotoBelongsTo.last_name}
            </TransitionLink>

            <TransitionLink
              href={`/album/${album.id}`}
              className="text-sm tracking-tighter text-muted-foreground hover:text-primary md:text-sm"
            >
              {album.name}
            </TransitionLink>
          </div>

          <div className="flex gap-4">
            <SharePhotoButton
              baseURL={process.env.NEXT_PUBLIC_BASE_URL as string}
            />

            <DownloadPhotoButton photo={photo} />

            {doesPhotoBelongToCurrentUser && (
              <DeletePhotoButton
                photoID={photo.id}
                albumID={album.id}
                filePath={photo.file_path}
              />
            )}
          </div>
        </div>
      </div>

      {morePhotosFromThisAlbum && (
        <div className="flex flex-col gap-8 px-6">
          <p className="text-center text-sm tracking-tighter text-muted-foreground">
            More from this album
          </p>

          <MorePhotosGrid photos={morePhotosFromThisAlbum} />
        </div>
      )}

      <div className="flex flex-col items-center gap-8 px-6">
        <p className="text-center text-sm tracking-tighter text-muted-foreground">
          Looking for more content like this?
        </p>

        <div className="space-x-4">
          <Button size={"sm"} asChild>
            <TransitionLink href="/explore" className="w-28 text-xs">
              Explore
            </TransitionLink>
          </Button>

          <Button size={"sm"} asChild>
            <TransitionLink
              href={`/${userPhotoBelongsTo.username}`}
              className="w-28 text-xs"
            >
              {userPhotoBelongsTo.first_name}&apos;s Profile
            </TransitionLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
