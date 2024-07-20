import {
  fetchCurrentUserProfile,
  redirectIfMissingDetails,
} from "@/app/actions/userActions";

const Explore = async () => {
  const userProfile = await fetchCurrentUserProfile();

  await redirectIfMissingDetails(userProfile);

  return (
    <div className="flex grow items-center justify-center">
      <p className="text-sm text-muted-foreground">
        We&apos;re working on this page.
      </p>
    </div>
  );
};

export default Explore;
