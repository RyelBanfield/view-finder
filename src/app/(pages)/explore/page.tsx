import { fetchProfileAction, redirectIfMissingDetails } from "@/app/actions";

const Explore = async () => {
  const userProfile = await fetchProfileAction();

  await redirectIfMissingDetails(userProfile);

  return (
    <div className="grid grow place-items-center">
      We&apos;re working on this page.
    </div>
  );
};

export default Explore;
