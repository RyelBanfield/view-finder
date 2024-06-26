import { checkAndReturnUserProfile } from "@/app/actions";

import EditProfileForm from "./EditProfileForm";

const EditProfilePage = async () => {
  const userProfile = await checkAndReturnUserProfile();

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfilePage;
