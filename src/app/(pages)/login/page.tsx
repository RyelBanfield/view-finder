import { redirect } from "next/navigation";

import { fetchUserAuth } from "@/app/actions";

import LoginForm from "./LoginForm";

const LoginPage = async () => {
  const userAuth = await fetchUserAuth();

  if (userAuth) redirect("/");

  return <LoginForm />;
};

export default LoginPage;
