"use client";

import { PageType, SectionType } from "@/types";
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
import Input from "../Input";
import usePrivacyModal from "@/hooks/usePrivacyModal";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import ViewMultipleCourse from "./ViewMultipleCourse";
import { useRouter } from "next/navigation";

function CourseView({
  section,
  dev,
  allPages,
  allSections,
  allCourse,
}: {
  section: SectionType;
  dev?: boolean;
  allPages: PageType[];
  allSections: SectionType[];
  allCourse: Course[];
}) {
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => {
    setUpdateCounter((prev) => prev + 1);
  }, [section]);

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
      } w-screen relative lg:overflow-hidden !max-w-[100%] !overflow-x-hidden !overflow-hidden`}
      key={dev ? updateCounter : section.name}
    >
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
          className={`mx-auto flex flex-col w-[100%] items-center justify-center gap-6`}
        >
          <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, section.data.animationType)}
            initial={section.data.animation ? "hidden" : ""}
            whileInView={section.data.animation ? "show" : ""}
            className="h2Mobile lg:h4Desktop xl:h2Desktop relative text-center"
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
          <div className="w-full flex flex-col items-center justify-center mt-[30px] space-y-[16px] z-[20]">
            {section.data.courseId?.map((c, i) => {
              const course = allCourse.find((course) => course.CorsoId === c);

              return (
                <div key={i} className="w-full">
                  <ViewMultipleCourse
                    name={course?.name || ""}
                    link={course?.link || ""}
                    title={course?.title || ""}
                    description={course?.description || ""}
                    price={course?.price || 0}
                    duration={course?.duration || ""}
                    code={course?.code || ""}
                    image={course?.image || ""}
                    haveFile={course?.haveFile || false}
                    fileLink={course?.fileLink || ""}
                    dev={dev}
                    right={i % 2 == 0}
                  />
                  <div className="w-full h-1 bg-primaryDesign mt-[16px] rounded-3xl" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseView;
