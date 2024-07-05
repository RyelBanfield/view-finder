import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotosByAlbumID } from "@/app/actions/photoActions";
import { fetchCurrentUserProfile } from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";
import { Skeleton } from "@/components/ui/skeleton";

import DeleteAlbumButton from "./components/DeleteAlbumButton";
import UploadButton from "./components/UploadButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const album = await fetchAlbumByID(params.albumID);

  if (!album) return notFound();

  const user = await fetchCurrentUserProfile();

  const photos = await fetchPhotosByAlbumID(album.id);

  return (
    <div className="flex grow flex-col gap-6 p-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-bold leading-none tracking-tighter">
            {album.name}
          </h2>

          <p className="leading-none tracking-tighter text-muted-foreground">
            {new Date(album.created_at).toDateString().slice(4)}
          </p>
        </div>

        {user && user.id === album.user_id && (
          <DeleteAlbumButton
            userID={user.id}
            albumID={album.id}
            photos={photos}
          />
        )}
      </div>

      {user &&
        user.id === album.user_id &&
        user.photo_count < user.max_photos && (
          <UploadButton
            albumID={album.id}
            numberOfPhotosUserCanUpload={user.max_photos - user.photo_count}
          />
        )}

      {!photos || photos.length === 0 ? (
        <div className="grid grow place-items-center">
          <p className="tracking-tight">
            Upload your first photos to get started.
          </p>
        </div>
      ) : (
        <div className="grid min-h-96 grid-cols-2 gap-3">
          {photos.map((photo) => (
            <Skeleton key={photo.id} className="relative grid h-80 rounded-lg">
              <TransitionLink href={`/photo/${photo.id}`}>
                <Image
                  alt=""
                  src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
                  fill
                  className="absolute h-full w-full rounded-lg object-cover"
                />
              </TransitionLink>
            </Skeleton>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
