import { redirect } from "next/navigation";

import { fetchUserProfileAction } from "@/app/actions";

import EditProfileForm from "./EditProfileForm";

const EditProfilePage = async () => {
  const userProfile = await fetchUserProfileAction();

  if (!userProfile) redirect("/login");

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfilePage;
