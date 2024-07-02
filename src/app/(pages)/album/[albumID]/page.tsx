import { notFound } from "next/navigation";

import { fetchUserAuthAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

import { fetchAlbumAction } from "./actions";
import DeleteButton from "./DeleteButton";

const AlbumPage = async ({ params }: { params: { albumID: string } }) => {
  const user = await fetchUserAuthAction();
  const album = await fetchAlbumAction(params.albumID);

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
          <DeleteButton albumID={album.id} />
        )}
      </div>

      <Button size={"sm"}>Upload Photos</Button>
    </div>
  );
};

export default AlbumPage;
