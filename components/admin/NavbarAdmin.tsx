"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { History, Menu, Undo } from "lucide-react";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const AnimatedLink = motion(Link);

const links = [
  {
    name: "Home",
    link: "",
  },
  {
    name: "Sezioni",
    link: "sezioni",
  },
  {
    name: "Immagini",
    link: "immagini",
  },
  {
    name: "Corsi",
    link: "corsi",
  },
];

const menuVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delay: 0.9,
      delayChildren: 0.3,
      duration: 0.7,
      type: "spring",
    },
  },
  show: {
    x: "0%",
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 0.7,
      type: "spring",
    },
  },
};

const linkVariant: Variants = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  show: {
    y: "0%",
    opacity: 1,
  },
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 0.5,
      type: "spring",
    },
  },
};

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  const handleLogut = async () => {
    setIsLoading(true);
    await signOut({
      redirect: false,
    });
    await router.refresh();
    setIsLoading(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="z-[100] w-[100vw] h-[80px] border-b shadow-sm fixed top-0 bg-white">
        <div className="h-full containerDesign px-10 flex items-center justify-between relative">
          <Link
            href={"/admin"}
            className="hover:scale-110 transition-all duration-300"
          >
            <Image
              src={"/logo.jpg"}
              alt=""
              width={170}
              height={100}
              
            />
          </Link>

          <div className="lg:flex hidden flex-row items-center xl:gap-14 lg:gap-7 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
            {links.map((link) => {
              // Capire se il link è attivo
              const active = path.split("/").at(2) || "";
              const isActive = active === link.link;

              return (
                <Link
                  href={"/admin/" + link.link}
                  key={link.name}
                  className={`text-center regular-medium lg:medium-medium xl:large-medium group`}
                >
                  <p
                    className={`${
                      isActive
                        ? "text-accentDesign"
                        : "group-hover:text-primaryDesign"
                    } transition-all duration-300 `}
                  >
                    {link.name}
                  </p>
                  <div
                    className={`h-[1px] ${
                      isActive
                        ? "w-full bg-accentDesign"
                        : "w-0 group-hover:w-full bg-primaryDesign"
                    } transition-all duration-300  rounded-full`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-row gap-2 items-center">
            {/* <div className="w-[40px] h-[40px] items-center cursor-pointer rounded-full hover:bg-secondaryDesign group transition-all duration-300  justify-center hidden lg:flex">
              <History className="group-hover:text-white transition-all duration-300 text-textDesign" />
              All the recent action
            </div> */}
            <div className="hidden lg:block">
              <Button
                className="normal-normal !text-white"
                onClick={handleLogut}
                animation
                disabled={isLoading}
                width={130}
                height={40}
              >
                Logout
              </Button>
            </div>
          </div>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={`${
              isOpen ? "rotate-90" : "rotate-0"
            } cursor-pointer w-[30px] hover:scale-110 h-[20px] transition-all duration-150 active:scale-90 relative block lg:hidden`}
          >
            <div
              className={`after:absolute after:w-full after:h-[3px] after:bg-textDesign  after:rounded-lg transition-all duration-150 ${
                isOpen
                  ? "after:-rotate-45 after:top-[50%] after:-translate-y-[50%]"
                  : "after:top-0"
              }`}
            />
            <div
              className={`after:absolute after:w-full after:h-[3px] after:bg-textDesign after:top-[50%] after:-translate-y-[50%] after:rounded-lg ${
                isOpen
                  ? "after:hidden"
                  : "after:top-[50%] after:-translate-y-[50%]"
              }`}
            />
            <div
              className={`after:absolute after:w-full after:h-[3px] after:bg-textDesign  after:rounded-lg after:transition-all after:duration-150 ${
                isOpen
                  ? "after:rotate-45 after:top-[50%] after:-translate-y-[50%]"
                  : "after:bottom-0"
              }`}
            />
          </div>
        </div>
      </div>
      <motion.div
        className="block lg:hidden fixed max-h-[calc(100%-80px)] h-[calc(100%-70px)] max-w-[calc(100vw-0px)] w-[calc(100vw-0px)] z-[100]  overflow-hidden bg-white top-[80px]"
        variants={menuVariants}
        initial="hidden"
        animate={isOpen ? "show" : "hidden"}
      >
        <div className="h-full w-full relative">
          <div className="flex flex-col gap-5 items-center justify-center h-full absolute w-full bottom-20">
            {links.map((link) => {
              // Capire se il link è attivo
              const active = path.split("/").at(2) || "";
              const isActive = active === link.link;

              return (
                <AnimatedLink
                  href={"/admin/" + link.link}
                  key={link.name}
                  className={`text-center text-[50px] h-[55px] sm:text-[65px] group sm:h-[70px] font-semibold`}
                  variants={linkVariant}
                  onClick={() => setIsOpen(false)}
                >
                  <p
                    className={`${
                      isActive
                        ? "text-accentDesign"
                        : "group-hover:text-primaryDesign"
                    } transition-all duration-300 `}
                  >
                    {link.name}
                  </p>
                </AnimatedLink>
              );
            })}
          </div>
          <motion.div
            className="w-full px-10 absolute bottom-10 h-[60px] flex flex-col justify-center"
            variants={buttonVariants}
            initial="hidden"
            animate={isOpen ? "show" : "hidden"}
          >
            <Button
              className="w-full"
              wfull
              onClick={handleLogut}
              animation
              disabled={isLoading}
              height={50}
            >
              Logout
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default NavbarAdmin;
