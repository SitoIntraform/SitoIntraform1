import { PageType, SectionType } from "@/types";
import React, { useEffect } from "react";
import HeroView from "./HeroView";
import TextWithImageView from "./TextWithImageView";
import OnlyTextView from "./OnlyTextView";
import { Course, Page } from "@prisma/client";
import GalleryView from "./GalleryView";
import ContactView from "./ContactView";
import FAQView from "./FAQView";
import ServiceView from "./ServiceView";
import CourseView from "./CourseView";

function ReturnViewComponent({
  pageType,
  section,
  dev,
  allPages,
  allSection,
  allCourse
}: {
  pageType: string;
  section: SectionType;
  dev?: boolean;
  allPages: PageType[];
  allSection: SectionType[]
  allCourse: Course[];
}) {
  if (pageType === "Hero") {
    return <HeroView dev={dev} section={section} allPages={allPages} allSections={allSection}  />;
  } else if (pageType === "TextWithImage") {
    return <TextWithImageView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "OnlyText") {
    return <OnlyTextView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "Gallery") {
    return <GalleryView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "Contact") {
    return <ContactView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "FAQ") {
    return <FAQView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "Service") {
    return <ServiceView dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  } else if (pageType === "Course") {
    return <CourseView allCourse={allCourse} dev={dev} section={section} allPages={allPages} allSections={allSection} />;
  }
}

export default ReturnViewComponent;
