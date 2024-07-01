import { redirect } from "next/navigation";

import { fetchProfileAction } from "@/app/actions";

const Explore = async () => {
  const userProfile = await fetchProfileAction();

  if (userProfile) {
    if (!userProfile.first_name || !userProfile.username)
      redirect("/profile/edit");
  }

  return (
    <div className="grid place-items-center py-72">
      We&apos;re working on this page.
    </div>
  );
};

export default Explore;
