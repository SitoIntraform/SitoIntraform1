"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Link as LinkSchema } from "@prisma/client";
import { PageType } from "@/types";

const AnimatedLink = motion(Link);

const menuVariants: Variants = {
  hidden: {
    x: "150%",
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
    x: "35%",
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

function NavbarClient({
  dev,
  allLinks,
  links,
  logo,
  logoWidth,
  logoHeight,
  buttonText,
  buttonWidth,
  buttonHeight,
  buttonLink,
  allPage,
}: {
  dev?: boolean;
  allLinks: LinkSchema[];
  links: string[];
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  buttonText?: string;
  buttonWidth?: number;
  buttonHeight?: number;
  buttonLink?: string;
  allPage: PageType[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const [mounted, setIsMounted] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (!isOpen) {
      setDropDownOpen(-1);
    }
  }, [isOpen]);

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

  if (!mounted) {
    return null;
  }

  let buttonLinkReal;

  const page = allPage.find((p) => p.PageId === buttonLink?.split("/").at(1));
  buttonLinkReal = dev ? undefined : page?.link ? "/" + page?.link : undefined;

  return (
    <>
      <div
        className={`z-[200] w-[100vw] h-[80px] border-b shadow-sm  bg-white ${
          dev ? "" : "fixed top-0"
        }`}
      >
        <div className="h-full containerDesign flex items-center justify-between relative">
          <a href={"/"} aria-label="Logo Home" className="hover:scale-110 transition-all duration-300">
            {logo && (
              <Image src={logo} alt="Link Home" width={logoWidth} height={logoHeight} />
            )}
          </a>

          <div className="lg:flex hidden flex-row items-center xl:gap-10 lg:gap-5 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
            {links.map((link, index) => {
              const currentLink = allLinks.find((l) => l.LinkId === link);
              const pageId = currentLink?.link?.split("/")[1];

              const currentPage = allPage.find((p) => p.PageId === pageId);

              let isActive = currentPage?.link === path.split("/")[1];

              if (currentLink?.type != "Single") {
                isActive = false;
              }

              let linkReal = "";

              if (currentLink?.type === "Single") {
                const page = allPage.find(
                  (p) => p.PageId === currentLink?.link?.split("/").at(1)
                );
                linkReal = dev ? "" : "/" + page?.link;
              }

              return (
                <>
                  {currentLink?.type === "Single" ? (
                    <a
                      href={dev ? undefined : linkReal ? linkReal : undefined}
                      key={currentLink?.LinkId}
                      className={`text-center regular-normal group cursor-pointer`}
                    >
                      <div
                        className={`${
                          currentLink?.type === "Single"
                            ? `${
                                isActive
                                  ? "text-accentDesign"
                                  : "group-hover:text-primaryDesign"
                              }`
                            : ""
                        } transition-all duration-300 relative flex flex-row items-center gap-1`}
                      >
                        {currentLink?.titolo}
                      </div>
                      <div
                        className={`h-[1px] ${
                          isActive
                            ? "w-full bg-accentDesign"
                            : "w-0 group-hover:w-full bg-primaryDesign"
                        } transition-all duration-300  rounded-full`}
                      />
                    </a>
                  ) : (
                    <div
                      key={currentLink?.LinkId}
                      className={`text-center regular-normal group cursor-pointer`}
                    >
                      <div
                        className={`${
                          currentLink?.type === "Single"
                            ? `${
                                isActive
                                  ? "text-accentDesign"
                                  : "group-hover:text-primaryDesign"
                              }`
                            : ""
                        } transition-all duration-300 relative flex flex-row items-center gap-1`}
                      >
                        {currentLink?.titolo}
                        {currentLink?.type === "Multiple" && (
                          <>
                            <span>
                              <ChevronDown className="w-4 h-4 text-primaryDesign" />
                            </span>
                            <div className="absolute top-[102%] h-0 overflow-hidden group-hover:h-auto bg-primaryDesign transition-all duration-200 -translate-x-[50%] left-[50%] rounded-sm">
                              <div className="flex flex-col items-center justify-between gap-3 rounded-md px-8 py-5">
                                {currentLink.multipleLink.map((l, index2) => {
                                  let linkReal2 = "";

                                  const page = allPage.find(
                                    (p) =>
                                      p.PageId === l?.link?.split("/").at(1)
                                  );
                                  linkReal2 = dev ? "" : "/" + page?.link;

                                  // console.log(linkReal2);

                                  return (
                                    <a
                                      key={index2}
                                      className="cursor-pointer text-white group/link"
                                      href={dev ? undefined : linkReal2}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <p>{l.testo}</p>
                                      <div
                                        className={`h-[1px] w-0 group-hover/link:w-full bg-white
                                    transition-all duration-300  rounded-full`}
                                      />
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={`h-[1px] ${
                          isActive
                            ? "w-full bg-accentDesign"
                            : "w-0 group-hover:w-full bg-primaryDesign"
                        } transition-all duration-300  rounded-full`}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>

          <div className="flex flex-row gap-2 items-center">
            {/* <div className="w-[40px] h-[40px] items-center cursor-pointer rounded-full hover:bg-secondaryDesign group transition-all duration-300  justify-center hidden lg:flex">
              <History className="group-hover:text-white transition-all duration-300 text-textDesign" />
              All the recent action
            </div> */}
            <div className="hidden lg:block">
              <a
                href={
                  dev ? undefined : buttonLinkReal ? buttonLinkReal : undefined
                }
                className="cursor-pointer"
              >
                <Button
                  className="normal-normal !text-white"
                  onClick={() => {}}
                  animation
                  disabled={isLoading}
                  width={buttonWidth}
                  height={buttonHeight}
                >
                  {buttonText}
                </Button>
              </a>
            </div>
          </div>
          <div
            onClick={() => {
              if (!dev) {
                setIsOpen((prev) => !prev);
              }
            }}
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
        className="z-[200] block border-l shadow-md lg:hidden fixed max-h-[calc(100%-80px)] h-[calc(100%-70px)] w-[75%] overflow-hidden bg-white top-[80px]"
        variants={menuVariants}
        initial="hidden"
        animate={isOpen ? "show" : "hidden"}
        onClick={() => {
          setDropDownOpen(-1);
        }}
      >
        <div className="h-full w-full relative">
          <div className="flex flex-col gap-5 items-center justify-center h-full absolute w-full bottom-20">
            {links.map((link, index) => {
              // Capire se il link è attivo
              const currentLink = allLinks.find((l) => l.LinkId === link);
              const pageId = currentLink?.link?.split("/")[1];

              const currentPage = allPage.find((p) => p.PageId === pageId);

              const isActive = currentPage?.link === path.split("/")[1];

              let linkReal = "";

              if (currentLink?.type === "Single") {
                const page = allPage.find(
                  (p) => p.PageId === currentLink?.link?.split("/").at(1)
                );
                linkReal = dev ? "" : "/" + page?.link;
              }

              return (
                <>
                  {currentLink?.type === "Single" ? (
                    <motion.a
                      href={
                        dev
                          ? undefined
                          : linkReal
                          ? linkReal
                          : undefined
                      }
                      key={currentLink?.LinkId}
                      className={`text-center cursor-pointer large-medium group !font-medium z-[100] ${
                        dropDownOpen === index
                          ? "h-auto z-[200]"
                          : "h-[30px] overflow-hidden z-[100]"
                      }`}
                      variants={linkVariant}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentLink?.type === "Single") {
                          setIsOpen(false);
                        } else {
                          setDropDownOpen((prev) =>
                            prev === index ? -1 : index
                          );
                        }
                      }}
                    >
                      <div
                        className={`${
                          isActive
                            ? "text-accentDesign"
                            : "group-hover:text-primaryDesign"
                        } transition-all duration-300 relative flex flex-col items-center `}
                      >
                        <div className="flex flex-row items-center gap-1">
                          {currentLink?.titolo}
                        </div>
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div
                      key={currentLink?.LinkId}
                      className={`text-center cursor-pointer large-medium group !font-medium z-[100] ${
                        dropDownOpen === index
                          ? "h-auto z-[200]"
                          : "h-[30px] overflow-hidden z-[100]"
                      }`}
                      variants={linkVariant}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (currentLink?.type === "Single") {
                          setIsOpen(false);
                        } else {
                          setDropDownOpen((prev) =>
                            prev === index ? -1 : index
                          );
                        }
                      }}
                    >
                      <div
                        className={`${
                          isActive
                            ? "text-accentDesign"
                            : "group-hover:text-primaryDesign"
                        } transition-all duration-300 relative flex flex-col items-center `}
                      >
                        <div className="flex flex-row items-center gap-1">
                          {currentLink?.titolo}
                          {currentLink?.type === "Multiple" && (
                            <ChevronDown className="w-4 h-4 text-primaryDesign" />
                          )}
                        </div>
                        {currentLink?.type === "Multiple" && (
                          <>
                            <div
                              className={`${
                                dropDownOpen === index ? "h-auto" : "h-0"
                              } absolute top-[110%] overflow-hidden bg-primaryDesign transition-all duration-200 rounded-sm`}
                            >
                              <div className="flex flex-col items-center justify-between gap-3 rounded-md px-8 py-5">
                                {currentLink.multipleLink.map((l, index2) => {
                                  let linkReal2 = "";

                                  const page = allPage.find(
                                    (p) =>
                                      p.PageId === l?.link?.split("/").at(1)
                                  );
                                  linkReal2 = dev ? "" : "/" + page?.link;

                                  return (
                                    <a
                                      key={index2}
                                      className="cursor-pointer text-white group/link"
                                      onClick={(e) => {
                                        setIsOpen(false);
                                        e.stopPropagation();
                                      }}
                                      href={dev ? undefined : linkReal2}
                                    >
                                      <p>{l.testo}</p>
                                      <div
                                        className={`h-[1px] w-0 group-hover/link:w-full bg-white
                                    transition-all duration-300  rounded-full`}
                                      />
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              );
            })}
          </div>
          <motion.div
            className="w-full px-10 absolute bottom-10 h-[60px] flex flex-col justify-center"
            variants={buttonVariants}
            initial="hidden"
            animate={isOpen ? "show" : "hidden"}
          >
            <a
              href={
                dev ? undefined : buttonLinkReal ? buttonLinkReal : undefined
              }
              className="w-full cursor-pointer"
            >
              <Button
                wfull
                className="medium-normal !text-white w-full"
                onClick={() => {}}
                animation
                disabled={isLoading}
                // width={buttonWidth}
                height={buttonHeight}
              >
                {buttonText}
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default NavbarClient;
