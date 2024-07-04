import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchProfileAction } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

import { fetchAlbumAction, fetchPhotosAction } from "./actions";
import DeleteAlbumButton from "./DeleteAlbumButton";
import UploadButton from "./UploadButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const album = await fetchAlbumAction(params.albumID);
  if (!album) return notFound();

  const user = await fetchProfileAction();

  const photos = await fetchPhotosAction(album.id);

  return (
    <div className="flex flex-col gap-6 px-5 py-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold leading-none tracking-tighter">
            {album.name}
          </h1>

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

      <div>
        {!photos || photos.length === 0 ? (
          <div className="grid h-96 place-items-center">
            <p className="tracking-tight">
              Upload your first photos to get started.
            </p>
          </div>
        ) : (
          <div className="grid min-h-96 grid-cols-2 gap-3">
            {photos.map((photo) => (
              <Skeleton
                key={photo.id}
                className="relative grid h-60 rounded-lg"
              >
                <Link href={`/photo/${photo.id}`}>
                  <Image
                    alt=""
                    src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
                    fill
                    className="absolute h-full w-full rounded-lg object-cover"
                  />
                </Link>
              </Skeleton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
