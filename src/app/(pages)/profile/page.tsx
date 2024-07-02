import Link from "next/link";
import { redirect } from "next/navigation";

import { fetchProfileAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

import CreateAlbumForm from "./CreateAlbumForm";

const ProfilePage = async () => {
  const supabase = createClient();

  const userProfile = await fetchProfileAction();

  if (!userProfile) redirect("/login");

  if (!userProfile.first_name || !userProfile.username) {
    redirect("/profile/edit");
  }

  const { data: albums, error } = await supabase
    .from("albums")
    .select("*")
    .eq("user_id", userProfile.id);

  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6 px-5 py-6 pb-36">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold leading-none tracking-tighter">
            {userProfile.first_name} {userProfile.last_name}
          </h1>
          <p className="leading-none tracking-tighter text-muted-foreground">
            {userProfile.username}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button size={"sm"} variant={"outline"} asChild className="w-28">
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        </div>
      </div>

      <CreateAlbumForm />

      <div className="grid min-h-80 grid-cols-2 gap-3">
        {albums.length === 0 ? (
          <p className="col-span-2 tracking-tight">
            Create your first album to get started.
          </p>
        ) : (
          albums.map((album) => (
            <Link key={album.id} href={`album/${album.id}`}>
              <div className="grid h-60 w-full place-items-center rounded-lg bg-primary px-3 py-2 text-secondary">
                {album.name}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
