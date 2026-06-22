"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Link as LinkSchema } from "@prisma/client";
import { PageType } from "@/types";

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
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDropDownOpen(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sfondo "vetro" + ombra quando si scrolla
  useEffect(() => {
    if (dev) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dev]);

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

  const drawerVariants: Variants = {
    hidden: {
      x: "100%",
      transition: { type: "spring", stiffness: 260, damping: 32 },
    },
    show: {
      x: "0%",
      transition: { type: "spring", stiffness: 260, damping: 32 },
    },
  };

  const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
  };

  const linkVariant: Variants = {
    hidden: { y: 16, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  // Stile bottone outline (CTA)
  const outlineBtn =
    "inline-flex items-center justify-center rounded-full border-[1.5px] border-accentDesign text-accentDesign font-medium px-6 py-2.5 transition-all duration-300 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-primaryDesign hover:to-accentDesign hover:shadow-[0_14px_30px_-14px_rgba(58,86,197,0.55)] active:scale-95";

  return (
    <>
      <div
        className={`relative z-[200] w-[100vw] h-[80px] bg-white transition-all duration-300 ${
          dev ? "" : "fixed top-0"
        } ${
          scrolled
            ? "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] border-b border-transparent"
            : "border-b border-black/5"
        }`}
      >
        {/* Firma: linea gradiente verde→blu che appare allo scroll */}
        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primaryDesign to-accentDesign transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="h-full containerDesign flex items-center justify-between relative">
          <a
            href={"/"}
            aria-label="Logo Home"
            className="transition-transform duration-300 hover:scale-105 shrink-0"
          >
            {logo && (
              <Image
                src={logo}
                alt="Link Home"
                width={logoWidth}
                height={logoHeight}
              />
            )}
          </a>

          {/* Link desktop */}
          <div className="lg:flex hidden flex-row items-center xl:gap-9 lg:gap-6">
            {links.map((link) => {
              const currentLink = allLinks.find((l) => l.LinkId === link);
              const pageId = currentLink?.link?.split("/")[1];
              const currentPage = allPage.find((p) => p.PageId === pageId);

              let isActive = currentPage?.link === path.split("/")[1];
              if (currentLink?.type != "Single") {
                isActive = false;
              }

              let linkReal = "";
              if (currentLink?.type === "Single") {
                const p = allPage.find(
                  (p) => p.PageId === currentLink?.link?.split("/").at(1)
                );
                linkReal = dev ? "" : "/" + p?.link;
              }

              return (
                <div key={currentLink?.LinkId} className="relative">
                  {currentLink?.type === "Single" ? (
                    <a
                      href={dev ? undefined : linkReal ? linkReal : undefined}
                      className="group cursor-pointer text-[15px] font-medium"
                    >
                      <div
                        className={`${
                          isActive
                            ? "text-accentDesign"
                            : "text-textDesign group-hover:text-primaryDesign"
                        } transition-colors duration-300 flex flex-row items-center gap-1`}
                      >
                        {currentLink?.titolo}
                      </div>
                      <div
                        className={`h-[2px] mt-0.5 rounded-full transition-all duration-300 bg-gradient-to-r from-primaryDesign to-accentDesign ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </a>
                  ) : (
                    <div className="group cursor-pointer text-[15px] font-medium">
                      <div className="text-textDesign group-hover:text-primaryDesign transition-colors duration-300 flex flex-row items-center gap-1">
                        {currentLink?.titolo}
                        {currentLink?.type === "Multiple" && (
                          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-primaryDesign" />
                        )}
                      </div>
                      <div className="h-[2px] mt-0.5 rounded-full w-0 group-hover:w-full bg-gradient-to-r from-primaryDesign to-accentDesign transition-all duration-300" />

                      {/* Dropdown a scheda bianca */}
                      {currentLink?.type === "Multiple" && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-[210]">
                          <div className="min-w-[200px] rounded-xl bg-white border border-black/5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] p-2 flex flex-col">
                            {currentLink.multipleLink.map((l, index2) => {
                              const p = allPage.find(
                                (p) => p.PageId === l?.link?.split("/").at(1)
                              );
                              const linkReal2 = dev ? "" : "/" + p?.link;
                              return (
                                <a
                                  key={index2}
                                  className="cursor-pointer rounded-lg px-4 py-2.5 text-[15px] text-textDesign hover:bg-secondaryDesign/30 hover:text-primaryDesign transition-colors duration-200"
                                  href={dev ? undefined : linkReal2}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {l.testo}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA desktop (outline) + hamburger */}
          <div className="flex flex-row gap-2 items-center">
            <div className="hidden lg:block">
              <a
                href={dev ? undefined : buttonLinkReal ? buttonLinkReal : undefined}
                className={outlineBtn}
              >
                {buttonText}
              </a>
            </div>

            <button
              type="button"
              aria-label="Apri menu"
              onClick={() => {
                if (!dev) setIsOpen((prev) => !prev);
              }}
              className={`${
                isOpen ? "rotate-90" : "rotate-0"
              } cursor-pointer w-[30px] h-[20px] transition-transform duration-150 active:scale-90 relative block lg:hidden`}
            >
              <span
                className={`absolute left-0 w-full h-[3px] bg-textDesign rounded-full transition-all duration-200 ${
                  isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[3px] bg-textDesign rounded-full top-1/2 -translate-y-1/2 transition-all duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[3px] bg-textDesign rounded-full transition-all duration-200 ${
                  isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "bottom-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 top-[80px] z-[190] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Pannello laterale mobile */}
      <motion.div
        className="z-[200] block lg:hidden fixed top-[80px] right-0 h-[calc(100%-80px)] w-[85%] max-w-[360px] bg-white shadow-[-20px_0_50px_-30px_rgba(0,0,0,0.6)] border-l border-black/5"
        variants={drawerVariants}
        initial="hidden"
        animate={isOpen && mounted ? "show" : "hidden"}
      >
        <div className="h-full w-full flex flex-col">
          <div className="h-[3px] w-full bg-gradient-to-r from-primaryDesign to-accentDesign shrink-0" />
          <motion.div
            className="flex-1 flex flex-col gap-2 justify-center px-8"
            variants={listVariants}
            initial="hidden"
            animate={isOpen && mounted ? "show" : "hidden"}
          >
            {links.map((link, index) => {
              const currentLink = allLinks.find((l) => l.LinkId === link);
              const pageId = currentLink?.link?.split("/")[1];
              const currentPage = allPage.find((p) => p.PageId === pageId);
              const isActive = currentPage?.link === path.split("/")[1];

              let linkReal = "";
              if (currentLink?.type === "Single") {
                const p = allPage.find(
                  (p) => p.PageId === currentLink?.link?.split("/").at(1)
                );
                linkReal = dev ? "" : "/" + p?.link;
              }

              return (
                <motion.div key={currentLink?.LinkId} variants={linkVariant}>
                  {currentLink?.type === "Single" ? (
                    <div
                      className={`cursor-pointer text-[22px] font-semibold font-display tracking-[-0.01em] py-1.5 transition-colors duration-200 ${
                        isActive ? "text-accentDesign" : "text-textDesign"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                        if (!dev && linkReal) router.push(linkReal);
                      }}
                    >
                      {currentLink?.titolo}
                    </div>
                  ) : (
                    <div>
                      <div
                        className="cursor-pointer text-[22px] font-semibold font-display tracking-[-0.01em] py-1.5 text-textDesign flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropDownOpen((prev) => (prev === index ? -1 : index));
                        }}
                      >
                        {currentLink?.titolo}
                        <ChevronDown
                          className={`w-5 h-5 text-primaryDesign transition-transform duration-300 ${
                            dropDownOpen === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          dropDownOpen === index ? "max-h-[400px]" : "max-h-0"
                        }`}
                      >
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-secondaryDesign py-1">
                          {currentLink?.multipleLink?.map((l, index2) => {
                            const p = allPage.find(
                              (p) => p.PageId === l?.link?.split("/").at(1)
                            );
                            const linkReal2 = dev ? "" : "/" + p?.link;
                            return (
                              <a
                                key={index2}
                                className="cursor-pointer text-[17px] text-textDesign hover:text-primaryDesign py-1 transition-colors duration-200"
                                href={dev ? undefined : linkReal2}
                                onClick={() => setIsOpen(false)}
                              >
                                {l.testo}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA mobile (outline) */}
          <div className="px-8 pb-10 pt-2">
            <a
              href={dev ? undefined : buttonLinkReal ? buttonLinkReal : undefined}
              onClick={() => setIsOpen(false)}
              className={`${outlineBtn} w-full`}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default NavbarClient;
