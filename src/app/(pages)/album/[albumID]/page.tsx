import { notFound } from "next/navigation";

import { fetchUserAuthAction } from "@/app/actions";

import { fetchAlbumAction } from "./actions";
import DeleteButton from "./DeleteButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const user = await fetchUserAuthAction();
  const album = await fetchAlbumAction(params.albumID);

  if (!album) return notFound();

  return (
    <div className="flex flex-col gap-6 px-5 py-12">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold tracking-tighter">{album.name}</h1>

        {user && user.id === album.user_id && (
          <DeleteButton albumID={album.id} />
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
