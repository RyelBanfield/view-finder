import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import {
  fetchMorePhotosFromAlbum,
  fetchPhotoByID,
} from "@/app/actions/photoActions";
import { fetchUserAuth, fetchUserByID } from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";
import { Tables } from "@/lib/database.types";

import DeletePhotoButton from "./components/DeletePhotoButton";
import DownloadPhotoButton from "./components/DownloadPhotoButton";
import MorePhotos from "./components/MorePhotosGrid";
import SharePhotoButton from "./components/SharePhotoButton";

const PhotoDetails = ({
  user,
  album,
  photo,
  doesPhotoBelongToCurrentUser,
}: {
  user: Tables<"users">;
  album: Tables<"albums">;
  photo: Tables<"photos">;
  doesPhotoBelongToCurrentUser: boolean;
}) => {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:py-12">
      <div className="flex flex-col gap-2 px-6">
        {user.show_full_name && (
          <TransitionLink
            href={`/${user.username}`}
            className="text-center font-bold leading-none tracking-tighter sm:text-left"
          >
            {user.first_name} {user.last_name}
          </TransitionLink>
        )}

        {!user.show_full_name && (
          <TransitionLink
            href={`/${user.username}`}
            className="text-center font-bold leading-none tracking-tighter sm:text-left"
          >
            {user.username}
          </TransitionLink>
        )}

        <TransitionLink
          href={`/album/${album.id}`}
          className="text-center text-sm leading-none tracking-tighter text-muted-foreground sm:text-left"
        >
          {album.name}
        </TransitionLink>
      </div>

      <div className="flex justify-center gap-4 sm:px-6">
        <DownloadPhotoButton photo={photo} />

        <SharePhotoButton
          baseURL={process.env.NEXT_PUBLIC_BASE_URL as string}
        />

        {doesPhotoBelongToCurrentUser && (
          <DeletePhotoButton
            photoID={photo.id}
            albumID={album.id}
            filePath={photo.file_path}
          />
        )}
      </div>
    </div>
  );
};

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
    <div className="flex flex-col gap-16 sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-0">
      <Image
        alt=""
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.file_path}`}
        placeholder="blur"
        blurDataURL={photo.base64}
        width={1080}
        height={1080}
        priority
        className="sm:row-span-2 sm:rounded-br"
      />

      <PhotoDetails
        user={userPhotoBelongsTo}
        album={album}
        photo={photo}
        doesPhotoBelongToCurrentUser={doesPhotoBelongToCurrentUser}
      />

      <MorePhotos photos={morePhotosFromThisAlbum} />
    </div>
  );
};

export default PhotoPage;
