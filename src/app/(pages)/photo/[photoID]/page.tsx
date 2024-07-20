import Image from "next/image";
import { notFound } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotoByID } from "@/app/actions/photoActions";
import { fetchCurrentUserProfile } from "@/app/actions/userActions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import DeletePhotoButton from "./components/DeletePhotoButton";

const PhotoPage = async ({ params }: { params: { photoID: string } }) => {
  const photo = await fetchPhotoByID(params.photoID);

  if (!photo) return notFound();

  const album = await fetchAlbumByID(photo.album_id);

  if (!album) return notFound();

  const user = await fetchCurrentUserProfile();

  const { base64 } = await getPlaiceholder(
    await fetch(
      `http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`,
    ).then(async (res) => Buffer.from(await res.arrayBuffer())),
  );

  return (
    <div className="flex grow flex-col gap-6 px-6 py-12">
      {user && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile">{user.username}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/album/${album.id}`}>
                {album.name}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Photo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold leading-none tracking-tighter">
            {album.name}
          </h1>

          <p className="text-sm leading-none tracking-tighter text-muted-foreground">
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

      <div className="relative h-96">
        <Image
          src={`http://127.0.0.1:54321/storage/v1/object/public/photos/${photo.file_path}`}
          alt=""
          placeholder="blur"
          blurDataURL={base64}
          fill
          className="rounded object-contain"
        />
      </div>
      <p>hvkhvhjg</p>
    </div>
  );
};

export default PhotoPage;
