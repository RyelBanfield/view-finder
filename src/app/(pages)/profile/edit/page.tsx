import { redirect } from "next/navigation";

import { fetchCurrentUserProfile } from "@/app/actions";

import EditProfileForm from "./EditProfileForm";

const EditProfilePage = async () => {
  const userProfile = await fetchCurrentUserProfile();

  if (!userProfile) redirect("/login");

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfilePage;
