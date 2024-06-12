"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxChevronDown } from "react-icons/rx";

import { Button, ButtonProps } from "./ui/button";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

interface ExtendedButtonProps extends ButtonProps {
  href?: string;
}

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ExtendedButtonProps[];
};

export type NavbarProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Navbar = (props: NavbarProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logo, navLinks, buttons } = { ...NavbarDefaults, ...props } as Props;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="border-border-primary bg-background-primary flex w-full items-center border-b lg:min-h-18 lg:px-[5%]">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] py-[1%] md:min-h-18 lg:min-h-full lg:px-0">
          <Link
            href={logo.url as string}
            className="text-lg font-bold tracking-tighter"
          >
            ViewFinder
          </Link>

          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>

        <motion.div
          variants={{
            open: { height: "var(--height-open, 100dvh)" },
            close: { height: "var(--height-closed, 0)" },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {navLinks.map((navLink, index) => (
            <div key={index} className="first:pt-4 lg:first:pt-0">
              {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu navLink={navLink} isMobile={isMobile} />
              ) : (
                <Link
                  href={navLink.url}
                  className="block py-3 text-md focus-visible:outline-none lg:px-4 lg:py-2 lg:text-base"
                >
                  {navLink.title}
                </Link>
              )}
            </div>
          ))}

          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                size="sm"
                className="w-full"
                asChild
              >
                {button.href ? (
                  <Link href={button.href}>{button.title}</Link>
                ) : (
                  button.title
                )}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between gap-2 py-3 text-left text-md focus-visible:outline-none lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
        onClick={toggleDropdown}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-background-primary lg:border-border-primary lg:absolute lg:z-50 lg:border lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((subNavLink, index) => (
              <a
                key={index}
                href={subNavLink.url}
                className="block py-3 pl-[5%] text-md focus-visible:outline-none lg:px-4 lg:py-2 lg:text-base"
              >
                {subNavLink.title}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavbarDefaults: NavbarProps = {
  logo: {
    url: "/",
    src: "https://relume-assets.s3.amazonaws.com/logo-image.svg",
    alt: "Logo image",
  },
  navLinks: [
    {
      title: "Explore",
      url: "/explore",
    },
  ],
  buttons: [
    { title: "Log in", variant: "ghost", href: "/login" },
    { title: "Sign up", href: "/sign-up" },
  ],
};

const topLineVariants = {
  open: { translateY: 8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};

const middleLineVariants = {
  open: { width: 0, transition: { duration: 0.1 } },
  closed: { width: "1.5rem", transition: { delay: 0.3, duration: 0.2 } },
};

const bottomLineVariants = {
  open: { translateY: -8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};

Navbar.displayName = "Navbar";
