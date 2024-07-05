import { redirect } from "next/navigation";

import { fetchCurrentUserProfile } from "@/app/actions/userActions";

import EditProfileForm from "./components/EditProfileForm";

const EditProfilePage = async () => {
  const userProfile = await fetchCurrentUserProfile();

  if (!userProfile) redirect("/login");

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfilePage;
