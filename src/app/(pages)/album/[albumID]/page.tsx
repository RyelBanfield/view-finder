import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotosByAlbumID } from "@/app/actions/photoActions";
import {
  fetchCurrentUserProfile,
  fetchUserByID,
} from "@/app/actions/userActions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    <div className="flex grow flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${userAlbumBelongsTo.username}`}>
                {userAlbumBelongsTo.username}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                <h2>{album.name}</h2>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-x-1">
          <ShareAlbumButton
            baseURL={process.env.NEXT_PUBLIC_BASE_URL as string}
          />

          {albumBelongsToCurrentUser && (
            <DeleteAlbumButton albumID={album.id} photos={photos} />
          )}
        </div>
      </div>

      <p className="text-xs tracking-tighter text-muted-foreground">
        {new Date(album.created_at).toDateString().slice(4)}
      </p>

      {userIsAllowedToUploadMorePhotos && (
        <UploadButton
          albumID={album.id}
          numberOfPhotosUserCanUpload={
            currentUser.max_photos - currentUser.photo_count
          }
        />
      )}

      {!photos || photos.length === 0 ? (
        <div className="flex grow items-center justify-center">
          <p className="text-xs tracking-tight text-muted-foreground">
            Upload and share your photos.
          </p>
        </div>
      ) : (
        <PhotoList photos={photos} />
      )}
    </div>
  );
};

export default AlbumPage;
