import { notFound } from "next/navigation";

import { fetchUserByUsername } from "@/app/actions/userActions";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const userProfile = await fetchUserByUsername(params.username);

  if (!userProfile) return notFound();

  return <div>User: {userProfile.username}</div>;
};

export default UserPage;
