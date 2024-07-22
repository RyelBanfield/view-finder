import Image from "next/image";

import { fetchUserAuth } from "@/app/actions/userActions";

import Logo from "../../../public/logos/logo-base-1200x1200.png";
import TransitionLink from "../../components/TransitionLink";
import NavLinks from "./NavLinks";

const Navbar = async () => {
  const userAuth = await fetchUserAuth();

  return (
    <nav className="flex items-center justify-between border-b p-6">
      <TransitionLink href="/" className="flex items-center gap-1">
        <Image src={Logo} alt="View Finder Logo" className="size-4 md:size-5" />

        <h1 className="text-sm font-bold leading-none tracking-tighter md:text-base">
          View Finder
        </h1>
      </TransitionLink>

      <NavLinks userAuth={userAuth} />
    </nav>
  );
};

export default Navbar;
