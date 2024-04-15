import { Section } from "@prisma/client";

export type ImageType = {
  ImageId: string;
  link: string;
};

type pageType = {
  value: string;
  name: string;
};

export type SectionType = {
  SectionId: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  pageType: string;

  data: SectionDataType;
};

export type ServiceType = {
  name: string;
  description: string;
  image: string;
  LinkPage?: string | null;
};

export type FAQType = {
  domand: string;
  response: string;
};

export type SectionDataType = {
  animation?: boolean;
  animationType?: string;

  backgroundImages?: string;
  backgroundImageOpacity?: number;
  backgroundColor?: string;

  images?: string[];
  imagesOnLeft?: boolean;

  textBlue?: string;
  textGreen?: string;
  textBlack?: string;
  description?: string;

  carouselDots?: boolean;
  carouselButtons?: boolean;

  service: ServiceType[];

  hScreen?: boolean;
  space?: number;

  primaryButton?: boolean;
  primaryButtonText?: string;
  primaryLink?: string;
  widthPrimaryButton?: number;
  heightPrimaryButton?: number;

  secondaryButton?: boolean;
  secondaryButtonText?: string;
  secondaryLink?: string;
  widthSecondaryButton?: number;
  heightSecondaryButton?: number;

  faq: FAQType[];
};

export const pageTypes: pageType[] = [
  {
    value: "Hero",
    name: "Hero",
  },
  {
    value: "TextWithImage",
    name: "Immagine e testo",
  },
  {
    value: "OnlyText",
    name: "Solo testo",
  },
];

export type SectionColumnType = {
  SectionId: string;
  name: string;
  pageType: string;
  createdAt: string;
  updatedAt: string;
};

export type PageType = {
  PageId: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  link: string;

  defaltPage?: boolean;

  numberSections?: number;

  sections?: string[];
};

export const emptySection: Section = {
  SectionId: "",
  createdAt: new Date(),
  updatedAt: new Date(),

  name: "",
  pageType: "",

  PageId: "",

  data: {
    animation: false,
    animationType: "",

    backgroundImages: "",
    backgroundImageOpacity: 100,
    backgroundColor: "",

    images: [],
    imagesOnLeft: true,

    textBlue: "",
    textGreen: "",
    textBlack: "",
    description: "",

    carouselDots: false,
    carouselButtons: false,

    service: [],

    hScreen: false,
    space: 40,

    primaryButton: false,
    primaryButtonText: "",
    primaryLink: "",
    widthPrimaryButton: 0,
    heightPrimaryButton: 0,

    secondaryButton: false,
    secondaryButtonText: "",
    secondaryLink: "",
    widthSecondaryButton: 0,
    heightSecondaryButton: 0,

    faq: [],
  },
};

export type LinkType = {
  LinkId: string;
  createdAt: string;
  updatedAt: string;

  type: string;
  titolo: string;
  link?: string;
  multipleLink: {
    testo: string;
    link: string;
  }[]
}