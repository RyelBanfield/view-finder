import { EditIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { fetchAlbumsByUserID } from "@/app/actions/albumActions";
import {
  fetchCurrentUserProfile,
  redirectIfMissingDetails,
} from "@/app/actions/userActions";
import TransitionLink from "@/components/TransitionLink";
import { Button } from "@/components/ui/button";

import AlbumList from "./components/AlbumList";
import CreateAlbumForm from "./components/CreateAlbumForm";

const ProfilePage = async () => {
  const userProfile = await fetchCurrentUserProfile();

  if (!userProfile) redirect("/login");

  await redirectIfMissingDetails(userProfile);

  const albums = await fetchAlbumsByUserID(userProfile.id);

  return (
    <div className="flex grow flex-col gap-8 px-6 py-12">
      <div className="flex flex-col items-center justify-between gap-6">
        {userProfile.show_full_name && (
          <div className="space-y-2">
            <h2 className="text-center text-3xl font-bold leading-none tracking-tighter">
              {userProfile.first_name} {userProfile.last_name}
            </h2>

            <p className="text-center leading-none tracking-tighter text-muted-foreground">
              {userProfile.username}
            </p>
          </div>
        )}

        {!userProfile.show_full_name && (
          <h2 className="text-center text-3xl font-bold leading-none tracking-tighter">
            {userProfile.username}
          </h2>
        )}

        <div className="flex gap-4">
          <Button size={"sm"} variant={"ghost"} asChild className="w-32">
            <TransitionLink
              href="/profile/edit"
              className="flex justify-evenly text-xs"
            >
              <EditIcon className="size-3" />
              Edit Profile
            </TransitionLink>
          </Button>

          <CreateAlbumForm />
        </div>
      </div>

      {!albums || albums.length === 0 ? (
        <div className="flex grow items-center justify-center">
          <p className="text-xs tracking-tight text-muted-foreground">
            Create your first album and share your photos.
          </p>
        </div>
      ) : (
        <AlbumList
          baseURL={process.env.NEXT_PUBLIC_SUPABASE_URL as string}
          albums={albums}
        />
      )}
    </div>
  );
};

export default ProfilePage;
