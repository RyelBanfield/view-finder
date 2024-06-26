import Link from "next/link";

import { checkAndReturnUserProfile } from "@/app/actions";

const ProfilePage = async () => {
  const userProfile = await checkAndReturnUserProfile();

  return (
    <div className="px-[5%] py-16">
      <h1>{userProfile.username}</h1>

      <Link href="/profile/edit">Edit Profile</Link>
    </div>
  );
};

export default ProfilePage;
