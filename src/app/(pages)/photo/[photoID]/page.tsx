import Image from "next/image";
import { notFound } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import {
  fetchPhotoByID,
  fetchPhotosByAlbumID,
} from "@/app/actions/photoActions";
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
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.file_path}`,
    ).then(async (res) => Buffer.from(await res.arrayBuffer())),
  );

  const getThreeRandomPhotos = async () => {
    const photosFromAlbum = await fetchPhotosByAlbumID(album.id);

    if (!photosFromAlbum || photosFromAlbum.length <= 1) return null;

    const photosWithoutCurrentPhoto = photosFromAlbum.filter(
      (photoFromAlbum) => photoFromAlbum.id !== photo.id,
    );

    if (photosWithoutCurrentPhoto.length === 0) return null;

    const shuffledPhotos = photosWithoutCurrentPhoto.sort(
      () => 0.5 - Math.random(),
    );

    return shuffledPhotos.slice(0, 3);
  };

  const morePhotosFromThisAlbum = await getThreeRandomPhotos();

  return (
    <>
      <div className="flex grow flex-col gap-6 py-12">
        {user && (
          <Breadcrumb className="px-6">
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

        <div className="flex justify-between px-6">
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

        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.file_path}`}
          alt=""
          placeholder="blur"
          blurDataURL={base64}
          width={1080}
          height={1080}
        />

        <div className="flex flex-col gap-6 px-6">
          <p className="text-sm leading-none tracking-tighter text-muted-foreground">
            More from this album
          </p>

          {morePhotosFromThisAlbum && (
            <div className="grid grid-cols-3 gap-4">
              {morePhotosFromThisAlbum.map((photo) => (
                <div key={photo.id} className="relative aspect-square">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.file_path}`}
                    alt=""
                    placeholder="blur"
                    blurDataURL={base64}
                    fill
                    className="rounded object-cover object-top"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoPage;
