import Link from "next/link";
import { redirect } from "next/navigation";

import { fetchUserProfileAction } from "@/app/actions";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";

import CreateAlbumForm from "./CreateAlbumForm";

const ProfilePage = async () => {
  const supabase = createClient();

  const userProfile = await fetchUserProfileAction();

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
    <div className="flex flex-col gap-6 px-5 py-3">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-bold leading-none tracking-tighter">
            {userProfile.first_name} {userProfile.last_name}
          </h1>
          <p className="text-sm leading-none tracking-tighter text-muted-foreground">
            @{userProfile.username}
          </p>
        </div>

        <CreateAlbumForm />
      </div>

      <Separator />

      <p className="text-sm font-bold leading-none tracking-tighter">
        Your Albums
      </p>

      <div className="grid min-h-80 grid-cols-2 gap-1">
        {albums.length === 0 ? (
          <p className="col-span-2 tracking-tighter">
            Create your first album to get started.
          </p>
        ) : (
          albums.map((album) => (
            <Link
              key={album.id}
              href={"/profile"}
              className="h-60 w-full rounded-lg bg-black transition-transform duration-300 hover:scale-95"
            ></Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
