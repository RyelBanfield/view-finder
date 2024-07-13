import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotosByAlbumID } from "@/app/actions/photoActions";
import { fetchCurrentUserProfile } from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";

import DeleteAlbumButton from "./components/DeleteAlbumButton";
import UploadButton from "./components/UploadButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const album = await fetchAlbumByID(params.albumID);

  if (!album) return notFound();

  const user = await fetchCurrentUserProfile();
  const photos = await fetchPhotosByAlbumID(album.id);

  return (
    <div className="flex grow flex-col gap-6 px-6 py-12">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold leading-none tracking-tighter">
            {album.name}
          </h2>

          <p className="text-sm leading-none tracking-tighter text-muted-foreground">
            {new Date(album.created_at).toDateString().slice(4)}
          </p>
        </div>

        {user && user.id === album.user_id && (
          <DeleteAlbumButton albumID={album.id} photos={photos} />
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
          <p className="text-xs tracking-tight text-muted-foreground">
            Upload and share your photos.
          </p>
        </div>
      ) : (
        <div className="grid grow grid-cols-2 gap-4">
          {photos.map((photo) => (
            <TransitionLink
              key={photo.id}
              href={`/photo/${photo.id}`}
              className="relative aspect-square shadow-2xl"
            >
              <Image
                alt=""
                src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
                fill
                className="absolute rounded object-cover object-top"
              />
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
