import { notFound } from "next/navigation";

import { fetchUserAuthAction } from "@/app/actions";

import { fetchAlbumAction } from "./actions";
import DeleteButton from "./DeleteButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const user = await fetchUserAuthAction();
  const album = await fetchAlbumAction(params.albumID);

  if (!album) return notFound();

  return (
    <div>
      Album: {album.name}
      {user && user.id === album.user_id && <DeleteButton albumID={album.id} />}
    </div>
  );
};

export default AlbumPage;
