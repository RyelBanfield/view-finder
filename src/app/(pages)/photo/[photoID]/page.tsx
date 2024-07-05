import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotoByID } from "@/app/actions/photoActions";
import { fetchUserAuth } from "@/app/actions/userActions";
import { Skeleton } from "@/components/ui/skeleton";

import DeletePhotoButton from "./components/DeletePhotoButton";

const PhotoPage = async ({ params }: { params: { photoID: string } }) => {
  const user = await fetchUserAuth();
  const photo = await fetchPhotoByID(params.photoID);

  if (!photo) return notFound();

  const album = await fetchAlbumByID(photo.album_id);
  if (!album) return notFound();

  return (
    <div className="flex grow flex-col gap-6 p-6">
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
          <DeletePhotoButton
            photoID={photo.id}
            albumID={album.id}
            filePath={photo.file_path}
          />
        )}
      </div>

      <Skeleton>
        <Image
          src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
          alt=""
          width={1080}
          height={1080}
          className="rounded-lg"
        />
      </Skeleton>
    </div>
  );
};

export default PhotoPage;
