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
import { SectionType } from "@/types";
import Button from "../Button";

import { motion } from "framer-motion";
import { containerAnimation } from "@/lib/animation";

function HeroView({ section, dev }: { section: SectionType; dev?: boolean }) {
  const [imageVersion, setImageVersion] = useState(0);
  const [updateAnimationCounter, setUpdateanimationCounter] = useState(0);

  const link1 = dev
    ? ""
    : section.data.primaryLink
    ? section.data.primaryLink
    : "";
  const link2 = dev
    ? ""
    : section.data.secondaryLink
    ? section.data.secondaryLink
    : "";

  useEffect(() => {
    setImageVersion((prev) => prev + 1);
  }, [section.data.images]);

  useEffect(() => {
    setUpdateanimationCounter((prev) => prev + 1);
  }, [section.data.animation, section.data.animationType]);

  return (
    <section
      id={section.name}
      className={`${
        section.data.hScreen ? "h-[calc(100vh-80px)]" : ""
      } w-screen relative overflow-hidden`}
    >
      {/* Carousel z-[-100] */}
      <div className="z-[-100] absolute top-0 w-full h-full">
        {section.data.images && (
          <Swiper
            key={imageVersion}
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
                <Image src={image || ""} alt="" fill className="object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Overlay z-[-50] */}
      <div className="h-full w-full absolute top-0 bg-black z-[-50]" style={{
        opacity: section.data.backgroundImageOpacity ? section.data.backgroundImageOpacity / 100 : 0,
      }} />

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
          className={`max-w-[1400px] mx-auto px-10 h-full w-full flex flex-col items-center justify-center`}
        >
          <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, section.data.animationType)}
            initial={section.data.animation ? "hidden" : ""}
            whileInView={section.data.animation ? "show" : ""}
            className="w-full flex flex-col items-center justify-center gap-6 "
          >
            <div className="flex flex-col items-center justify-center p-5 gap-6">
              <motion.h1
                viewport={{ once: true }}
                variants={containerAnimation(0, section.data.animationType)}
                initial={section.data.animation ? "hidden" : ""}
                whileInView={section.data.animation ? "show" : ""}
                className="h1Mobile md:h1Desktop xl:!text-[72px]  text-center h1Shadow"
              >
                <span className="text-accentDesign">
                  {section.data.textBlue}
                </span>
                <span> </span>
                <br className="md:hidden inline-block" />
                <span className="text-primaryDesign">
                  {section.data.textGreen}
                </span>
              </motion.h1>
              {section.data.description && (
                <motion.p
                  viewport={{ once: true }}
                  variants={containerAnimation(0.1, section.data.animationType)}
                  initial={section.data.animation ? "hidden" : ""}
                  whileInView={section.data.animation ? "show" : ""}
                  className="regular-medium md:medium-normal xl:large-medium !text-white max-w-4xl text-center"
                >
                  {section.data.description}
                </motion.p>
              )}
            </div>
            {(section.data.primaryButton || section.data.secondaryButton) && (
              <motion.div
                viewport={{ once: true }}
                variants={containerAnimation(0.2, section.data.animationType)}
                initial={section.data.animation ? "hidden" : ""}
                whileInView={section.data.animation ? "show" : ""}
                className="flex md:flex-row flex-col gap-6 mt-[10px]"
              >
                {section.data.primaryButton && (
                  <Link href={link1}>
                    <Button
                      width={section.data.widthPrimaryButton || 0}
                      height={section.data.heightPrimaryButton || 0}
                      onClick={() => {}}
                      className="scale-90 md:scale-100 xl:scale-105"
                      animation
                    >
                      <p>{section.data.primaryButtonText}</p>
                    </Button>
                  </Link>
                )}
                {section.data.secondaryButton && (
                  <Link href={link2}>
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
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroView;
