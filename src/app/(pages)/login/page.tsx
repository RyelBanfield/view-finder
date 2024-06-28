import { redirect } from "next/navigation";

import { fetchUserAuthAction } from "@/app/actions";

import LoginForm from "./LoginForm";

const LoginPage = async () => {
  const userFromAuth = await fetchUserAuthAction();

  if (userFromAuth) redirect("/");

  return <LoginForm />;
};

export default LoginPage;
