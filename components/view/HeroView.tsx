"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PageType, SectionType } from "@/types";
import Button from "../Button";

import { motion } from "framer-motion";
import { containerAnimation } from "@/lib/animation";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
        //LINK A PAGINA
        const pageId = sec.data.primaryLink?.split("/")[1];
        const page = allPages.find((p) => p.PageId === pageId);
        setLink1("/" + page?.link);
      } else if (section.data.primaryLink?.at(0) === "#") {
        //LINK AD ANCORA
        const sectionId = sec.data.primaryLink?.split("#")[1];
        const section = allSections.find((s) => s.SectionId === sectionId);
        setLink1("#" + section?.name);
      }

      if (section.data.secondaryLink?.at(0) === "/") {
        //LINK A PAGINA
        const pageId = sec.data.secondaryLink?.split("/")[1];
        const page = allPages.find((p) => p.PageId === pageId);
        setLink2("/" + page?.link);
      } else if (section.data.secondaryLink?.at(0) === "#") {
        //LINK AD ANCORA
        const sectionId = sec.data.secondaryLink?.split("#")[1];
        const section = allSections.find((s) => s.SectionId === sectionId);
        setLink2("#" + section?.name);
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
  }, [])

  return (
    <section
      id={section.name}
      className={`${
        section.data.hScreen ? "h-[calc(100vh-80px)]" : ""
      } w-screen relative overflow-hidden !max-w-[100%] !overflow-x-hidden `}
      key={dev ? section.SectionId : mounted ? section.SectionId : undefined}
    >
      {/* Carousel z-[-100] */}
      <div className="z-[-100] absolute top-0 w-full h-full">
        {section.data.images && <>
          {section.data.images.length > 1 ? (
            <Swiper
              key={dev ? section.name + imageVersion : section.name}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
              }}
              speed={1200}
              loop={true}
              className="h-[120%] w-full"
              modules={[Autoplay]}
            >
              {section.data.images.map((image) => (
                <SwiperSlide key={image} className="relative">
                  <Image src={image || ""} alt="" fill className="object-cover" priority  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-[120%] w-full">
              <Image
                src={section.data.images[0]}
                alt=""
                fill
                className="object-cover"
                
              />
            </div>
          )}
        </>}
      </div>

      {/* Overlay z-[-50] */}
      <div
        className="h-full w-full absolute top-0 bg-black z-[-50]"
        style={{
          opacity: section.data.backgroundImageOpacity
            ? section.data.backgroundImageOpacity / 100
            : 0,
        }}
      />

      {/* Text z-3 */}
      <div
        style={{
          paddingTop: section.data.hScreen ? "0px" : section.data.space + "px",
          paddingBottom: section.data.hScreen
            ? "0px"
            : section.data.space + "px",
        }}
        className={`${section.data.hScreen ? "h-full w-full" : ""} z-30`}
        key={updateAnimationCounter}
      >
        <div
          className={`containerDesign h-full w-full flex flex-col items-center justify-center`}
        >
          {(section.data.description || section.data.textBlue || section.data.textGreen || section.data.primaryButton || section.data.secondaryButton) && (
            <>
              {section.data.animation ? (
                <motion.div
                  viewport={{ once: true }}
                  variants={containerAnimation(0, section.data.animationType)}
                  initial={section.data.animation ? "hidden" : {}}
                  whileInView={section.data.animation && mounted ? "show" : {}}
                  className="w-full flex flex-col items-center justify-center gap-6 "
                >
                  <div className="flex flex-col items-center justify-center py-5 gap-6">
                    {(section.data.textBlue || section.data.textGreen) && <motion.h1
                      viewport={{ once: true }}
                      variants={containerAnimation(0, section.data.animationType)}
                      initial={section.data.animation ? "hidden" : {}}
                      whileInView={section.data.animation && mounted ? "show" : {}}
                      className={`${section.data.hScreen ? "h4Mobile lg:h1Desktop max-w-6xl" : "h4Mobile md:h4Desktop xl:h3Desktop max-w-3xl"}  text-center h1Shadow `}
                    >
                      <span className="text-accentDesign">
                        {section.data.textBlue}
                      </span>
                      <span> </span>
                      {/* <br className="md:hidden inline-block" /> */}
                      <span className="text-primaryDesign">
                        {section.data.textGreen}
                      </span>
                    </motion.h1>}
                    {section.data.description && (
                      <motion.p
                        viewport={{ once: true }}
                        variants={containerAnimation(0.1, section.data.animationType)}
                        initial={section.data.animation ? "hidden" : {}}
                        whileInView={section.data.animation && mounted ? "show" : {}}
                        className="small-medium md:regular-normal xl:medium-medium !text-white max-w-4xl text-center"
                        dangerouslySetInnerHTML={{
                          __html: section.data.description
                        }}
                      ></motion.p>
                    )}
                  </div>
                  {(section.data.primaryButton || section.data.secondaryButton) && (
                    <motion.div
                      viewport={{ once: true }}
                      variants={containerAnimation(0.2, section.data.animationType)}
                      initial={section.data.animation ? "hidden" : {}}
                      whileInView={section.data.animation && mounted ? "show" : {}}
                      className="flex md:flex-row flex-col gap-6 mt-[10px]"
                    >
                      {section.data.primaryButton && (
                        <a href={dev ? undefined : link1 ? link1 : undefined} className="cursor-pointer">
                          <Button
                            width={section.data.widthPrimaryButton || 0}
                            height={section.data.heightPrimaryButton || 0}
                            onClick={() => { }}
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
                            onClick={() => { }}
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
              ) : (
                  <div
                    className="w-full flex flex-col items-center justify-center gap-6 "
                  >
                    <div className="flex flex-col items-center justify-center py-5 gap-6">
                      {(section.data.textBlue || section.data.textGreen) && <motion.h1
                        viewport={{ once: true }}
                        variants={containerAnimation(0, section.data.animationType)}
                        initial={section.data.animation ? "hidden" : {}}
                        whileInView={section.data.animation && mounted ? "show" : {}}
                        className={`${section.data.hScreen ? "h4Mobile lg:h1Desktop max-w-6xl" : "h4Mobile md:h4Desktop xl:h3Desktop max-w-3xl"}  text-center h1Shadow `}
                      >
                        <span className="text-accentDesign">
                          {section.data.textBlue}
                        </span>
                        <span> </span>
                        {/* <br className="md:hidden inline-block" /> */}
                        <span className="text-primaryDesign">
                          {section.data.textGreen}
                        </span>
                      </motion.h1>}
                      {section.data.description && (
                        <p
                          className="small-medium md:regular-normal xl:medium-medium !text-white max-w-4xl text-center"
                          dangerouslySetInnerHTML={{
                            __html: section.data.description
                          }}
                        ></p>
                      )}
                    </div>
                    {(section.data.primaryButton || section.data.secondaryButton) && (
                      <div
                        className="flex md:flex-row flex-col gap-6 mt-[10px]"
                      >
                        {section.data.primaryButton && (
                          <a href={dev ? undefined : link1 ? link1 : undefined} className="cursor-pointer">
                            <Button
                              width={section.data.widthPrimaryButton || 0}
                              height={section.data.heightPrimaryButton || 0}
                              onClick={() => { }}
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
                              onClick={() => { }}
                              className="scale-90 md:scale-100 xl:scale-105"
                              secondary
                              animation
                            >
                              <p>{section.data.secondaryButtonText}</p>
                            </Button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroView;