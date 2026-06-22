"use client";

import { PageType, SectionType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { containerAnimation } from "@/lib/animation";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  const [faqOpen, setFaqOpen] = useState(-1);

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
    setUpdateCounter((prev) => prev + 1);
  }, [section]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const anim = section.data.animation;
  const isDarkBg = section.data.backgroundColor === "#3b3b3b";

  return (
    <section
      id={section.name}
      style={{
        backgroundColor: section.data.backgroundImages
          ? "transparent"
          : section.data.backgroundColor,
      }}
      className="w-screen relative lg:overflow-hidden !max-w-[100%] !overflow-hidden"
      key={dev ? updateCounter : mounted ? section.SectionId : undefined}
    >
      {section.data.backgroundImages && section.data.backgroundImageOpacity && (
        <div className="h-full w-full absolute inset-0">
          <div className="h-full w-full relative z-[-10]">
            <Image
              src={section.data.backgroundImages}
              alt=""
              fill
              className="object-cover"
              style={{ opacity: section.data.backgroundImageOpacity / 100 }}
            />
          </div>
        </div>
      )}
      <div
        style={{
          paddingBottom: section.data.space + "px",
          paddingTop: section.data.space + "px",
        }}
        className="h-full z-30 flex containerDesign flex-col items-center justify-center"
      >
        <div className="mx-auto flex flex-col w-full items-center justify-center gap-8">
          {/* Titolo */}
          {(section.data.textBlack ||
            section.data.textBlue ||
            section.data.textGreen) && (
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0, section.data.animationType)}
              initial={anim ? "hidden" : {}}
              whileInView={anim && mounted ? "show" : {}}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-primaryDesign to-accentDesign" />
              <div className="h4Mobile md:h4Desktop xl:h3Desktop relative">
                {section.data.textBlue && section.data.textGreen ? (
                  <>
                    <span className="text-accentDesign">{section.data.textBlue}</span>{" "}
                    <span className="text-primaryDesign">{section.data.textGreen}</span>
                  </>
                ) : section.data.textBlue ? (
                  <span className="text-accentDesign">{section.data.textBlue}</span>
                ) : section.data.textGreen ? (
                  <span className="text-primaryDesign">{section.data.textGreen}</span>
                ) : (
                  <span className={isDarkBg ? "text-white" : "text-textDesign"}>
                    {section.data.textBlack}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Accordion */}
          <div className="flex flex-col items-center w-full gap-4 z-[10]">
            {section.data.faq?.map((f, index) => {
              const isActive = faqOpen === index;
              const click = () => setFaqOpen(isActive ? -1 : index);
              return (
                <motion.div
                  viewport={{ once: true }}
                  variants={containerAnimation(index * 0.04, section.data.animationType)}
                  initial={anim ? "hidden" : {}}
                  whileInView={anim && mounted ? "show" : {}}
                  key={index}
                  className={`w-full max-w-[860px] rounded-2xl cursor-pointer bg-white border transition-all duration-200 ${
                    isActive
                      ? "border-primaryDesign shadow-[0_18px_40px_-26px_rgba(0,0,0,0.4)]"
                      : "border-black/[0.08] hover:border-primaryDesign/50"
                  }`}
                  onClick={click}
                >
                  <div className="flex flex-row items-center justify-between gap-4 p-5">
                    <p className="regular-semibold md:medium-semibold !mb-0">{f.domand}</p>
                    <ChevronDown
                      className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                        isActive ? "rotate-180 text-primaryDesign" : "text-accentDesign"
                      }`}
                    />
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: isActive ? "10000px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 text-justify leading-relaxed text-textDesign/80">
                      <div dangerouslySetInnerHTML={{ __html: f.response || "" }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Descrizione */}
          {section.data.description && (
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0, section.data.animationType)}
              initial={anim ? "hidden" : {}}
              whileInView={anim && mounted ? "show" : {}}
              className="small-normal md:regular-normal relative text-center max-w-3xl"
              style={{ color: isDarkBg ? "white" : "#3b3b3b" }}
              dangerouslySetInnerHTML={{ __html: section.data.description || "" }}
            />
          )}

          {/* Bottoni */}
          {(section.data.primaryButton || section.data.secondaryButton) && (
            <motion.div
              viewport={{ once: true }}
              variants={containerAnimation(0.2, section.data.animationType)}
              initial={anim ? "hidden" : {}}
              whileInView={anim && mounted ? "show" : {}}
              className="flex md:flex-row flex-col gap-3 md:gap-6"
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
        </div>
      </div>
    </section>
  );
}
