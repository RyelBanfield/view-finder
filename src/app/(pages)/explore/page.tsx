import {
  fetchCurrentUserProfile,
  redirectIfMissingDetails,
} from "@/app/actions/userActions";

const Explore = async () => {
  const userProfile = await fetchCurrentUserProfile();

  await redirectIfMissingDetails(userProfile);

  return (
    <div className="grid grow place-items-center">
      We&apos;re working on this page.
    </div>
  );
};

export default Explore;
