import Image from "next/image";

import { fetchUserAuth } from "@/app/actions";

import Logo from "../../public/logos/logo-base-1200x1200.png";
import NavLinks from "./NavLinks";
import TransitionLink from "./TransitionLink";

const Navbar = async () => {
  const userAuth = await fetchUserAuth();

  return (
    <nav className="flex items-center justify-between p-6">
      <TransitionLink href="/" className="flex items-center gap-1">
        <Image src={Logo} alt="View Finder Logo" className="h-5 w-5" />

        <h1 className="font-bold leading-none tracking-tighter">View Finder</h1>
      </TransitionLink>

      <NavLinks userAuth={userAuth} />
    </nav>
  );
};

export default Navbar;
