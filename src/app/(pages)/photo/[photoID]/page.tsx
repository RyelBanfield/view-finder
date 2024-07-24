import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import {
  fetchMorePhotosFromAlbum,
  fetchPhotoByID,
} from "@/app/actions/photoActions";
import { fetchUserAuth, fetchUserByID } from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import DeletePhotoButton from "./components/DeletePhotoButton";
import DownloadPhotoButton from "./components/DownloadPhotoButton";
import MorePhotosGrid from "./components/MorePhotosGrid";
import SharePhotoButton from "./components/SharePhotoButton";

const PhotoPage = async ({ params }: { params: { photoID: string } }) => {
  const photo = await fetchPhotoByID(params.photoID);
  if (!photo) return notFound();

  const userPhotoBelongsTo = await fetchUserByID(photo.user_id);
  if (!userPhotoBelongsTo) return notFound();

  const album = await fetchAlbumByID(photo.album_id);
  if (!album) return notFound();

  const morePhotosFromThisAlbum = await fetchMorePhotosFromAlbum(
    photo.id,
    album.id,
    4,
  );

  const currentUser = await fetchUserAuth();
  const doesPhotoBelongToCurrentUser =
    userPhotoBelongsTo.id === currentUser?.id;

  return (
    <>
      <div className="flex grow flex-col gap-6 py-12">
        {userPhotoBelongsTo && (
          <Breadcrumb className="px-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/profile">
                  {userPhotoBelongsTo.username}
                </BreadcrumbLink>
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

          {doesPhotoBelongToCurrentUser && (
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
          blurDataURL={photo.base64}
          width={1080}
          height={1080}
          priority
        />

        <div className="flex justify-end gap-1 px-6">
          <DownloadPhotoButton filePath={photo.file_path} />

          <SharePhotoButton
            baseURL={process.env.NEXT_PUBLIC_BASE_URL as string}
          />
        </div>

        {morePhotosFromThisAlbum && (
          <div className="flex flex-col gap-6 px-6">
            <p className="leading-none tracking-tighter text-muted-foreground">
              More from this album
            </p>

            <MorePhotosGrid photos={morePhotosFromThisAlbum} />
          </div>
        )}

        <div className="flex flex-col items-center gap-6 px-6 py-12">
          <p className="text-center text-sm leading-none tracking-tighter text-muted-foreground">
            Looking for more content like this?
          </p>

          <div className="space-x-2">
            <Button size={"sm"} asChild>
              <TransitionLink href="/explore" className="w-28 text-xs">
                Explore
              </TransitionLink>
            </Button>

            <Button size={"sm"} asChild>
              <TransitionLink
                href={`/${userPhotoBelongsTo.username}`}
                className="w-28 text-xs"
              >
                {userPhotoBelongsTo.first_name}&apos;s Profile
              </TransitionLink>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoPage;
