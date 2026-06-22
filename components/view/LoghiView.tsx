"use client";

import { PageType, SectionType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { containerAnimation } from "@/lib/animation";

import { motion } from "framer-motion";

function LoghiView({
  section,
  dev,
}: {
  section: SectionType;
  dev?: boolean;
  allPages: PageType[];
  allSections: SectionType[];
}) {
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => {
    setUpdateCounter((prev) => prev + 1);
  }, [section]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const anim = section.data.animation;

  return (
    <section
      id={section.name}
      style={{
        backgroundColor: section.data.backgroundImages
          ? "transparent"
          : section.data.backgroundColor,
      }}
      className={`${
        section.data.hScreen ? "lg:h-[calc(100vh-80px)] h-auto py-20 lg:py-0" : ""
      } w-screen relative lg:overflow-hidden !max-w-[100%] !overflow-x-hidden !overflow-hidden`}
      key={dev ? updateCounter : mounted ? section.SectionId : undefined}
    >
      <div
        style={{
          paddingBottom: section.data.hScreen ? "0px" : section.data.space + "px",
          paddingTop: section.data.hScreen ? "0px" : section.data.space + "px",
        }}
        className={`h-full z-30 flex containerDesign flex-col items-center justify-center ${
          section.data.hScreen ? "py-10 lg:py-0" : "!max-lg:!py-10"
        }`}
      >
        <div className="mx-auto relative h-[200px] w-full overflow-hidden">
          {anim && section.data.animationType ? (
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0, section.data.animationType)}
              initial={anim ? "hidden" : {}}
              whileInView={anim && mounted ? "show" : {}}
              className="h-full w-full relative"
            >
              <Image
                src={section.data.backgroundImages || ""}
                alt="Loghi"
                fill
                className="object-contain"
              />
            </motion.div>
          ) : (
            <div className="h-full w-full relative">
              <Image
                src={section.data.backgroundImages || ""}
                alt="Loghi"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LoghiView;
