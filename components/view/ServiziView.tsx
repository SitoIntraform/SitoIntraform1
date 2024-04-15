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
      
    </section>
  );
}

export default HeroView;
