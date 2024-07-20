import { notFound } from "next/navigation";

import { fetchAlbumByID } from "@/app/actions/albumActions";
import { fetchPhotosByAlbumID } from "@/app/actions/photoActions";
import { fetchCurrentUserProfile } from "@/app/actions/userActions";
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
import UploadButton from "./components/UploadButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const album = await fetchAlbumByID(params.albumID);

  if (!album) return notFound();

  const user = await fetchCurrentUserProfile();
  const photos = await fetchPhotosByAlbumID(album.id);

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
              <BreadcrumbPage>{album.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

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
        <PhotoList photos={photos} />
      )}
    </div>
  );
};

export default AlbumPage;
