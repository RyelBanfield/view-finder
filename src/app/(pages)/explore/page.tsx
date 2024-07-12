import {
  fetchCurrentUserProfile,
  redirectIfMissingDetails,
} from "@/app/actions/userActions";

const Explore = async () => {
  const userProfile = await fetchCurrentUserProfile();

  await redirectIfMissingDetails(userProfile);

  return (
    <div className="grid grow place-items-center">
      <p>We&apos;re working on this page.</p>
    </div>
  );
};

export default Explore;
