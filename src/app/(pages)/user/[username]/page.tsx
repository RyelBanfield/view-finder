import { notFound } from "next/navigation";

import { fetchUserProfileAction } from "./actions";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const userProfile = await fetchUserProfileAction(params.username);

  if (!userProfile) return notFound();

  return <div>User: {userProfile.username}</div>;
};

export default UserPage;
