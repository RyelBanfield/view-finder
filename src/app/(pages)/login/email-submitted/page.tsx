import { redirect } from "next/navigation";

import { fetchUserAuth } from "@/app/actions/userActions";

const EmailSubmittedPage = async () => {
  const user = await fetchUserAuth();

  if (user) redirect("/");

  return (
    <div className="flex grow flex-col justify-center gap-4 p-12">
      <h1 className="text-center text-xl font-bold">
        We&apos;ve sent your link.
      </h1>

      <p className="text-pretty text-center text-xs text-muted-foreground">
        Check your email for your magic link. If you don&apos;t see it, check
        your spam folder.
      </p>
    </div>
  );
};

export default EmailSubmittedPage;
