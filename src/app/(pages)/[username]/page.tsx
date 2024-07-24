import { notFound, redirect } from "next/navigation";

import {
  fetchCurrentUserProfile,
  fetchUserByUsername,
} from "@/app/actions/userActions";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const userProfile = await fetchUserByUsername(params.username);
  if (!userProfile) return notFound();

  const currentUser = await fetchCurrentUserProfile();

  if (currentUser && currentUser.username === params.username) {
    redirect("/profile");
  }

  return (
    <div className="flex grow items-center justify-center">
      <p className="text-sm text-muted-foreground">
        We&apos;re working on {userProfile.first_name}&apos;s profile
      </p>
    </div>
  );
};

export default UserPage;
