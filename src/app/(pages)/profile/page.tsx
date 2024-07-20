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
    <div className="flex grow flex-col gap-6 px-6 py-12">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold leading-none tracking-tighter">
            {userProfile.first_name} {userProfile.last_name}
          </h2>

          <p className="text-sm leading-none tracking-tighter text-muted-foreground">
            {userProfile.username}
          </p>
        </div>

        <Button asChild size={"sm"} variant={"outline"} className="w-24">
          <TransitionLink href="/profile/edit" className="text-xs">
            Edit Profile
          </TransitionLink>
        </Button>
      </div>

      <CreateAlbumForm />

      {!albums || albums.length === 0 ? (
        <div className="grid grow place-items-center">
          <p className="text-xs tracking-tight text-muted-foreground">
            Create your first album and share your photos.
          </p>
        </div>
      ) : (
        <AlbumList albums={albums} />
      )}
    </div>
  );
};

export default ProfilePage;
