import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotosByAlbumID } from "@/app/actions/photoActions";
import {
  fetchCurrentUserProfile,
  fetchUserByID,
} from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";
import { Button } from "@/components/ui/button";

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
    <div className="flex grow flex-col gap-16 px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-4 px-6">
        <div className="flex gap-4">
          <TransitionLink
            href={`/${userAlbumBelongsTo.username}`}
            className="text-sm tracking-tighter text-muted-foreground hover:text-primary md:text-sm"
          >
            {userAlbumBelongsTo.show_full_name && (
              <>
                {userAlbumBelongsTo.first_name} {userAlbumBelongsTo.last_name}
              </>
            )}

            {!userAlbumBelongsTo.show_full_name && (
              <>{userAlbumBelongsTo.username}</>
            )}
          </TransitionLink>

          <TransitionLink
            href={`/album/${album.id}`}
            className="text-sm tracking-tighter text-muted-foreground hover:text-primary md:text-sm"
          >
            {album.name}
          </TransitionLink>
        </div>

        <div className="flex gap-4">
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
        <>
          <PhotoList
            baseURL={process.env.NEXT_PUBLIC_SUPABASE_URL as string}
            photos={photos}
          />

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
                  href={`/${userAlbumBelongsTo.username}`}
                  className="min-w-28 text-xs"
                >
                  {userAlbumBelongsTo.show_full_name && (
                    <>{userAlbumBelongsTo.first_name}&apos;s Profile</>
                  )}

                  {!userAlbumBelongsTo.show_full_name && (
                    <>{userAlbumBelongsTo.username}&apos;s Profile</>
                  )}
                </TransitionLink>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumPage;
