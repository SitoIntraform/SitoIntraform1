"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { PageType, SectionType } from "@/types";
import Button from "../Button";
import { ChevronDown } from "lucide-react";

import { motion } from "framer-motion";
import { containerAnimation } from "@/lib/animation";

function HeroView({
  section,
  dev,
  allPages,
  allSections,
}: {
  section: SectionType;
  dev?: boolean;
  allPages: PageType[];
  allSections: SectionType[];
}) {
  const [imageVersion, setImageVersion] = useState(0);
  const [updateAnimationCounter, setUpdateanimationCounter] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  useEffect(() => {
    if (dev) {
      setLink1("");
      setLink2("");
    } else {
      const sec = section;
      if (section.data.primaryLink?.at(0) === "/") {
        const pageId = sec.data.primaryLink?.split("/")[1];
        const page = allPages.find((p) => p.PageId === pageId);
        setLink1("/" + page?.link);
      } else if (section.data.primaryLink?.at(0) === "#") {
        const sectionId = sec.data.primaryLink?.split("#")[1];
        const s = allSections.find((s) => s.SectionId === sectionId);
        setLink1("#" + s?.name);
      }

      if (section.data.secondaryLink?.at(0) === "/") {
        const pageId = sec.data.secondaryLink?.split("/")[1];
        const page = allPages.find((p) => p.PageId === pageId);
        setLink2("/" + page?.link);
      } else if (section.data.secondaryLink?.at(0) === "#") {
        const sectionId = sec.data.secondaryLink?.split("#")[1];
        const s = allSections.find((s) => s.SectionId === sectionId);
        setLink2("#" + s?.name);
      }
    }
  }, [section, dev, allPages, allSections]);

  useEffect(() => {
    setImageVersion((prev) => prev + 1);
  }, [section.data.images]);

  useEffect(() => {
    setUpdateanimationCounter((prev) => prev + 1);
  }, [section.data.animation, section.data.animationType]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const anim = section.data.animation;
  const hasTitle = !!(section.data.textBlue || section.data.textGreen);
  const hasContent =
    hasTitle ||
    !!section.data.description ||
    !!section.data.primaryButton ||
    !!section.data.secondaryButton;

  return (
    <section
      id={section.name}
      className={`${
        section.data.hScreen ? "h-[calc(100vh-80px)]" : ""
      } w-screen relative overflow-hidden !max-w-[100%] !overflow-x-hidden`}
      key={dev ? section.SectionId : mounted ? section.SectionId : undefined}
    >
      {/* Immagini di sfondo */}
      <div className="z-[-100] absolute top-0 w-full h-full">
        {section.data.images && (
          <>
            {section.data.images.length > 1 ? (
              <Swiper
                key={dev ? section.name + imageVersion : section.name}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                speed={1200}
                loop={true}
                className="h-[120%] w-full"
                modules={[Autoplay]}
              >
                {section.data.images.map((image) => (
                  <SwiperSlide key={image} className="relative">
                    <Image src={image || ""} alt="" fill className="object-cover" priority />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="h-[120%] w-full">
                <Image src={section.data.images[0]} alt="" fill className="object-cover" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Overlay: gradiente raffinato (intensità da admin) */}
      <div
        className="h-full w-full absolute top-0 left-0 bg-gradient-to-b from-black/15 via-black/40 to-black/75 z-[-50]"
        style={{
          opacity: section.data.backgroundImageOpacity
            ? section.data.backgroundImageOpacity / 100
            : 0,
        }}
      />

      {/* Contenuto */}
      <div
        style={{
          paddingTop: section.data.hScreen ? "0px" : section.data.space + "px",
          paddingBottom: section.data.hScreen ? "0px" : section.data.space + "px",
        }}
        className={`${section.data.hScreen ? "h-full w-full" : ""} z-30`}
        key={updateAnimationCounter}
      >
        <div className="containerDesign h-full w-full flex flex-col items-center justify-center">
          {hasContent && (
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0, section.data.animationType)}
              initial={anim ? "hidden" : {}}
              whileInView={anim && mounted ? "show" : {}}
              className="w-full flex flex-col items-center justify-center gap-7"
            >
              <div className="flex flex-col items-center justify-center gap-6">
                {hasTitle && (
                  <motion.span
                    variants={containerAnimation(0, section.data.animationType)}
                    initial={anim ? "hidden" : {}}
                    whileInView={anim && mounted ? "show" : {}}
                    className="h-[3px] w-16 rounded-full bg-gradient-to-r from-primaryDesign to-accentDesign"
                  />
                )}
                {hasTitle && (
                  <motion.h1
                    viewport={{ once: true }}
                    variants={containerAnimation(0, section.data.animationType)}
                    initial={anim ? "hidden" : {}}
                    whileInView={anim && mounted ? "show" : {}}
                    className={`${
                      section.data.hScreen
                        ? "h4Mobile lg:h1Desktop max-w-6xl"
                        : "h4Mobile md:h4Desktop xl:h3Desktop max-w-3xl"
                    } text-center h1Shadow`}
                  >
                    <span className="text-accentDesign">{section.data.textBlue}</span>
                    <span> </span>
                    <span className="text-primaryDesign">{section.data.textGreen}</span>
                  </motion.h1>
                )}
                {section.data.description && (
                  <motion.p
                    viewport={{ once: true }}
                    variants={containerAnimation(0.1, section.data.animationType)}
                    initial={anim ? "hidden" : {}}
                    whileInView={anim && mounted ? "show" : {}}
                    className="small-medium md:regular-normal xl:medium-medium !text-white/90 max-w-3xl text-center"
                    dangerouslySetInnerHTML={{ __html: section.data.description }}
                  />
                )}
              </div>
              {(section.data.primaryButton || section.data.secondaryButton) && (
                <motion.div
                  viewport={{ once: true }}
                  variants={containerAnimation(0.2, section.data.animationType)}
                  initial={anim ? "hidden" : {}}
                  whileInView={anim && mounted ? "show" : {}}
                  className="flex md:flex-row flex-col gap-4 md:gap-6 mt-1"
                >
                  {section.data.primaryButton && (
                    <a href={dev ? undefined : link1 ? link1 : undefined} className="cursor-pointer">
                      <Button
                        width={section.data.widthPrimaryButton || 0}
                        height={section.data.heightPrimaryButton || 0}
                        onClick={() => {}}
                        className="scale-90 md:scale-100 xl:scale-105"
                        animation
                      >
                        <p>{section.data.primaryButtonText}</p>
                      </Button>
                    </a>
                  )}
                  {section.data.secondaryButton && (
                    <a href={dev ? undefined : link2 ? link2 : undefined} className="cursor-pointer">
                      <Button
                        width={section.data.widthSecondaryButton || 0}
                        height={section.data.heightSecondaryButton || 0}
                        onClick={() => {}}
                        className="scale-90 md:scale-100 xl:scale-105"
                        secondary
                        animation
                      >
                        <p>{section.data.secondaryButtonText}</p>
                      </Button>
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Scroll cue (solo hero a tutto schermo) */}
        {section.data.hScreen && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1 text-white/70">
            <span className="text-[11px] tracking-[0.25em] uppercase">Scorri</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroView;
