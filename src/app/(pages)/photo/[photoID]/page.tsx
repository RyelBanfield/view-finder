import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchUserAuthAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

import { fetchAlbumAction } from "../../album/[albumID]/actions";
import { fetchPhotoAction } from "./actions";
import DeletePhotoButton from "./DeletePhotoButton";

const PhotoPage = async ({ params }: { params: { photoID: string } }) => {
  const user = await fetchUserAuthAction();
  const photo = await fetchPhotoAction(params.photoID);

  if (!photo) return notFound();

  const album = await fetchAlbumAction(photo.album_id);
  if (!album) return notFound();

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
          <DeletePhotoButton
            photoID={photo.id}
            albumID={album.id}
            filePath={photo.file_path}
          />
        )}
      </div>

      <Image
        src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
        alt=""
        width={1080}
        height={1080}
        className="rounded-lg"
      />

      <Button asChild>
        <Link href={`/album/${album.id}`}>Back to album</Link>
      </Button>
    </div>
  );
};

export default PhotoPage;
