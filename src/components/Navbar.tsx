"use client";

import { motion } from "framer-motion";
import { Pivot as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchUserAuthAction } from "@/app/actions";

import Logo from "../../public/logos/logo-base-1200x1200.png";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [hamburgerPos, setHamburgerPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userFromAuth = await fetchUserAuthAction();

      if (userFromAuth) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const hamburger = document.getElementById("hamburger-icon");
      if (hamburger) {
        const rect = hamburger.getBoundingClientRect();
        setHamburgerPos({ x: rect.x, y: rect.y });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const mobileMenu = {
    closed: {
      clipPath: `circle(0px at ${hamburgerPos.x + 24}px ${hamburgerPos.y + 24}px)`,
      transition: {
        duration: 0.6,
      },
    },
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at ${hamburgerPos.x}px ${hamburgerPos.y}px)`,
      transition: {
        duration: 1.2,
      },
    }),
  };

  const navigationList = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    closed: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };

  const menuItem = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <nav className="relative flex w-full items-center justify-between p-5">
      <div className="flex items-center gap-1">
        <Image src={Logo} alt="View Finder Logo" className="h-5 w-5" />
        <Link href={"/"} className="font-bold tracking-tighter">
          View Finder
        </Link>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenu}
        className="absolute inset-0 z-10 h-screen w-screen bg-neutral-900"
      >
        <motion.ul
          variants={navigationList}
          className="flex h-full flex-col items-center justify-center gap-5"
        >
          <motion.li
            variants={menuItem}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
          >
            <Link href="/" className="text-lg text-neutral-300">
              Home
            </Link>
          </motion.li>

          <motion.li
            variants={menuItem}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
          >
            <Link href="/explore" className="text-lg text-neutral-300">
              Explore
            </Link>
          </motion.li>

          {isUserLoggedIn ? (
            <>
              <motion.li
                variants={menuItem}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(false)}
              >
                <Link href="/profile" className="text-lg text-neutral-300">
                  Profile
                </Link>
              </motion.li>
            </>
          ) : (
            <motion.li
              variants={menuItem}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(false)}
            >
              <Link href="/login" className="text-lg text-neutral-300">
                Login
              </Link>
            </motion.li>
          )}
        </motion.ul>
      </motion.div>

      <div id="hamburger-icon" className="z-20 rounded-full bg-white/80">
        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
