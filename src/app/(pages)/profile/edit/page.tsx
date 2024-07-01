import { redirect } from "next/navigation";

import { fetchProfileAction } from "@/app/actions";

import EditProfileForm from "./EditProfileForm";

const EditProfilePage = async () => {
  const userProfile = await fetchProfileAction();

  if (!userProfile) redirect("/login");

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfilePage;
