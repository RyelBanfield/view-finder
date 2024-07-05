"use client";

import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import TransitionLink from "./TransitionLink";

const NavLinks = ({ userAuth }: { userAuth: User | null }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3">
      <TransitionLink
        href="/explore"
        className={cn(
          "text-sm leading-none tracking-tighter text-muted-foreground hover:text-primary",
          {
            "text-primary": pathname === "/explore",
          },
        )}
      >
        Explore
      </TransitionLink>

      {!userAuth && (
        <TransitionLink
          href="/login"
          className={cn(
            "text-sm leading-none tracking-tighter text-muted-foreground hover:text-primary",
            {
              "text-primary": pathname === "/login",
            },
          )}
        >
          Login
        </TransitionLink>
      )}

      {userAuth && (
        <TransitionLink
          href="/profile"
          className={cn(
            "text-sm leading-none tracking-tighter text-muted-foreground hover:text-primary",
            {
              "text-primary": pathname === "/profile",
            },
          )}
        >
          Profile
        </TransitionLink>
      )}
    </div>
  );
};

export default NavLinks;
