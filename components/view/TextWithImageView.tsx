"use client";

import { SectionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { containerAnimation } from "@/lib/animation";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TextWithImageView({
  section,
  dev,
}: {
  section: SectionType;
  dev?: boolean;
}) {
  const [updateCounter, setUpdateCounter] = useState(0);
  const [carouselCounter, setCarouselCounter] = useState(0);

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
    setUpdateCounter((prev) => prev + 1);
  }, [section]);

  useEffect(() => {
    const carouselUpdate = () => {
      setCarouselCounter((prev) => prev + 1);
    };

    window.addEventListener("resize", carouselUpdate);

    return () => {
      window.removeEventListener("resize", carouselUpdate);
    };
  }, []);

  return (
    <section
      id={section.name}
      style={{
        backgroundColor: section.data.backgroundImages
          ? "transparent"
          : section.data.backgroundColor,
      }}
      className={`${
        section.data.hScreen
          ? "lg:h-[calc(100vh-80px)] h-auto py-20 lg:py-0"
          : ""
      } w-screen relative lg:overflow-hidden`}
      key={dev ? updateCounter : section.name}
    >
      {section.data.backgroundImages && section.data.backgroundImageOpacity && (
        <div className={` h-full w-full absolute inset-0`}>
          <div className="h-full w-full relative">
            <Image
              src={section.data.backgroundImages}
              alt=""
              fill
              className="object-cover"
              style={{
                opacity: section.data.backgroundImageOpacity / 100,
              }}
            />
          </div>
        </div>
      )}
      <div
        style={{
          paddingBottom: section.data.hScreen
            ? "0px"
            : section.data.space + "px",
          paddingTop: section.data.hScreen ? "0px" : section.data.space + "px",
        }}
        className={`h-full z-30 flex containerDesign  flex-col items-center justify-center ${
          section.data.hScreen ? "py-10 lg:py-0" : "!max-lg:!py-10"
        }`}
      >
        <div
          className={`mx-auto flex w-[100%] items-center justify-center gap-12 lg:gap-24 xl:gap-36 ${
            section.data.imagesOnLeft
              ? "flex-col lg:flex-row"
              : "flex-col-reverse lg:flex-row-reverse"
          }`}
        >
          <div className="lg:w-[50%] w-[100%] text-start space-y-7 h-full flex flex-col justify-center items-center  lg:items-start">
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0, section.data.animationType)}
              initial={section.data.animation ? "hidden" : ""}
              whileInView={section.data.animation ? "show" : ""}
              className="h2Mobile lg:h4Desktop xl:h2Desktop relative text-center lg:text-start"
            >
              {/* Title */}

              {section.data.textBlue && section.data.textGreen ? (
                <>
                  <span className="text-accentDesign">
                    {section.data.textBlue}
                  </span>{" "}
                  <span className="md:hidden">
                    <br />
                  </span>
                  <span className="text-primaryDesign">
                    {section.data.textGreen}
                  </span>
                </>
              ) : section.data.textBlue ? (
                <>
                  <span className="text-accentDesign">
                    {section.data.textBlue}
                  </span>
                </>
              ) : section.data.textGreen ? (
                <>
                  <span className="text-primaryDesign">
                    {section.data.textGreen}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-textDesign">
                    {section.data.textBlack}
                  </span>
                </>
              )}
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0.1, section.data.animationType)}
              initial={section.data.animation ? "hidden" : ""}
              whileInView={section.data.animation ? "show" : ""}
              className="small-normal  xl:regular-normal relative text-center lg:text-start"
              style={{
                color:
                  section.data.backgroundColor === "#303030"
                    ? "white"
                    : "#303030",
              }}
            >
              {section.data.description}
              <div className="absolute -bottom-3 -right-3 border-r-primaryDesign border-8 w-[50px] border-b-accentDesign border-t-transparent border-l-transparent h-[50px]" />
            </motion.div>
            {(section.data.primaryButton || section.data.secondaryButton) && (
              <motion.div
                viewport={{ once: true }}
                variants={containerAnimation(0.2, section.data.animationType)}
                initial={section.data.animation ? "hidden" : ""}
                whileInView={section.data.animation ? "show" : ""}
                className="flex md:flex-row flex-col gap-6 "
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
          </div>
          <div className="lg:w-[50%] w-[100%] h-[300px] lg:h-[480px] xl:h-[550px] relative">
            <motion.div
              variants={containerAnimation(0, section.data.animationType)}
              viewport={{ once: true }}
              initial={section.data.animation ? "hidden" : ""}
              whileInView={section.data.animation ? "show" : ""}
              className="absolute top-0 w-full h-full"
            >
              {section.data.images && (
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,
                  }}
                  speed={1200}
                  loop={true}
                  className="h-[100%] w-full"
                  modules={[Autoplay, Pagination, Navigation]}
                  pagination={section.data.carouselDots}
                  navigation={section.data.carouselButtons}
                  key={section.name + carouselCounter}
                >
                  {section.data.images.map((image) => (
                    <SwiperSlide key={image} className="relative">
                      <Image
                        src={image || ""}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextWithImageView;
