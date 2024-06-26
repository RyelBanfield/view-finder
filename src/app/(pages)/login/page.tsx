import { redirect } from "next/navigation";

import { checkIfLoggedIn } from "./actions";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  (await checkIfLoggedIn()) && redirect("/");

  return <LoginForm />;
};

export default LoginPage;
