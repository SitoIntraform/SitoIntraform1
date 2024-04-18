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
import { X } from "lucide-react";
import useScrollBar from "@/hooks/useScrollbar";

export default function FAQView({
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
  const [updateCounter, setUpdateCounter] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [policy, setPolicy] = useState(false);

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  const privacyModal = usePrivacyModal();

  const [faqOpen, setFaqOpen] = useState(-1);

  const scrollBar = useScrollBar();

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
    setUpdateCounter((prev) => prev + 1);
  }, [section]);

  const onPressContactBtn = () => {
    if (!name || !email || !message) {
      toast.error("Compila tutti i campi");
      return;
    }

    if (!policy) {
      toast.error("Conferma di aver letto le policy per poterci contattare");
      return;
    }

    toast.success("Contattati");
  };

  return (
    <section
      id={section.name}
      style={{
        backgroundColor: section.data.backgroundImages
          ? "transparent"
          : section.data.backgroundColor,
      }}
      className={` w-screen relative lg:overflow-hidden`}
      key={dev ? updateCounter : section.name}
    >
      {section.data.backgroundImages && section.data.backgroundImageOpacity && (
        <div className={` h-full w-full absolute inset-0`}>
          <div className="h-full w-full relative z-[-10]">
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
          paddingBottom: section.data.space + "px",
          paddingTop: section.data.space + "px",
        }}
        className={`h-full z-30 flex containerDesign  flex-col items-center justify-center !max-lg:!py-10`}
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
          <div className="flex flex-col items-center justify-center p-5 w-full gap-4 z-[10]">
            {section.data.faq?.map((f, index) => {
              const isActive = faqOpen === index;

              const click = () => {
                if (isActive) {
                  setFaqOpen(-1);
                } else {
                  setFaqOpen(index);
                }
                setTimeout(() => {
                  scrollBar.onSet();
                }, 550);
              };

              return (
                <div
                  key={index}
                  className={`w-full border-2 outline-none p-5 rounded-2xl cursor-pointer ${
                    isActive ? "border-primaryDesign" : "border-textDesign/50"
                  } transition-all duration-200`}
                  onClick={click}
                >
                  <div className="flex flex-row items-center">
                    <p className="large-semibold">{f.domand}</p>
                    <X
                      className={`w-8 h-8 text-textDesign/70 ml-auto transition-transform duration-300 ${
                        isActive ? "rotate-180 !text-primaryDesign" : "rotate-45"
                      }`}
                    />
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isActive ? "1000px" : "0px",
                      // opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="mt-[10px]">{f.response}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {section.data.description && (
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0, section.data.animationType)}
              initial={section.data.animation ? "hidden" : ""}
              whileInView={section.data.animation ? "show" : ""}
              className="small-normal  xl:regular-normal relative text-center"
              style={{
                color:
                  section.data.backgroundColor === "#303030"
                    ? "white"
                    : "#303030",
              }}
            >
              {section.data.description}
            </motion.div>
          )}
          <div className="w-full flex flex-col items-center justify-center">
            {(section.data.primaryButton || section.data.secondaryButton) && (
              <motion.div
                viewport={{ once: true }}
                variants={containerAnimation(0.2, section.data.animationType)}
                initial={section.data.animation ? "hidden" : ""}
                whileInView={section.data.animation ? "show" : ""}
                className="flex md:flex-row flex-col gap-3 md:gap-6"
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
        </div>
      </div>
    </section>
  );
}