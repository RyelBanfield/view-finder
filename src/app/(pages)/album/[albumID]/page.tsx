import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotosByAlbumID } from "@/app/actions/photoActions";
import {
  fetchCurrentUserProfile,
  fetchUserByID,
} from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";

import DeleteAlbumButton from "./components/DeleteAlbumButton";
import PhotoList from "./components/PhotoList";
import ShareAlbumButton from "./components/ShareAlbumButton";
import UploadButton from "./components/UploadButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const album = await fetchAlbumByID(params.albumID);
  if (!album) return notFound();

  const userAlbumBelongsTo = await fetchUserByID(album.user_id);
  if (!userAlbumBelongsTo) return notFound();

  const photos = await fetchPhotosByAlbumID(album.id);

  const currentUser = await fetchCurrentUserProfile();

  const albumBelongsToCurrentUser = userAlbumBelongsTo.id === currentUser?.id;

  const userIsAllowedToUploadMorePhotos =
    albumBelongsToCurrentUser &&
    currentUser.photo_count < currentUser.max_photos;

  return (
    <div className="flex grow flex-col gap-16 px-6 py-12">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold leading-none tracking-tighter">
            {album.name}
          </h1>

          {userAlbumBelongsTo.show_full_name && (
            <TransitionLink
              href={`/${userAlbumBelongsTo.username}`}
              className="text-center leading-none tracking-tighter text-muted-foreground"
            >
              {userAlbumBelongsTo.first_name} {userAlbumBelongsTo.last_name}
            </TransitionLink>
          )}

          {!userAlbumBelongsTo.show_full_name && (
            <TransitionLink
              href={`/${userAlbumBelongsTo.username}`}
              className="text-center leading-none tracking-tighter text-muted-foreground"
            >
              {userAlbumBelongsTo.username}
            </TransitionLink>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {userIsAllowedToUploadMorePhotos && (
            <UploadButton
              albumID={album.id}
              numberOfPhotosUserCanUpload={
                currentUser.max_photos - currentUser.photo_count
              }
            />
          )}

          <ShareAlbumButton
            baseURL={process.env.NEXT_PUBLIC_BASE_URL as string}
          />

          {albumBelongsToCurrentUser && (
            <DeleteAlbumButton albumID={album.id} photos={photos} />
          )}
        </div>
      </div>

      {!photos || photos.length === 0 ? (
        <div className="flex grow items-center justify-center">
          <p className="text-xs tracking-tight text-muted-foreground">
            Upload and share your photos.
          </p>
        </div>
      ) : (
        <PhotoList
          baseURL={process.env.NEXT_PUBLIC_SUPABASE_URL as string}
          photos={photos}
        />
      )}
    </div>
  );
};

export default AlbumPage;
