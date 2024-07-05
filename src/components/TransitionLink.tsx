"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const TransitionLink = ({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleTransition = async (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    const body = document.querySelector("body");
    body!.classList.add("page-transition");
    await wait(300);
    router.push(href);
    await wait(300);
    body!.classList.remove("page-transition");
  };

  return (
    <Link
      href={href}
      className={className}
      {...props}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
