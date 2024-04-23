import { FAQType, ServiceType } from "@/types";
import React from "react";
import HeroConfigurator from "./HeroConfigurator";
import TextWithImageConfigurator from "./TextWithImageConfigurator";
import OnlyTextConfigurator from "./OnlyTextConfigurator";
import GalleryConfigurator from "./GalleryConfigurator";
import ContactConfigurator from "./ContactConfigurator";
import FAQConfigurator from "./FAQConfigurator";
import ServiceConfigurator from "./ServiceConfigurator";
import CourseConfigurator from "./CourseConfigurator";
import { Course } from "@prisma/client";

interface ConfiguratorInterfaceProps {
  animation: boolean;
  setAnimation: (animation: boolean) => void;
  animationType: string;
  setAnimationType: (animationType: string) => void;

  backgroundImages: string;
  setBackgroundImages: (backgroundImages: string) => void;
  backgroundImageOpacity: number;
  setBackgroundImageOpacity: (opacity: number) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;

  images: string[];
  setImages: (images: string[]) => void;
  imagesOnLeft: boolean;
  setImagesOnLeft: (imagesOnLeft: boolean) => void;

  textBlue: string;
  setTextBlue: (text: string) => void;
  textGreen: string;
  setTextGreen: (text: string) => void;
  textBlack: string;
  setTextBlack: (textBlack: string) => void;
  description: string;
  setDescription: (description: string) => void;

  carouselDots: boolean;
  setCarouselDots: (carouselDots: boolean) => void;
  carouselButtons: boolean;
  setCarouselButtons: (carouselButtons: boolean) => void;

  service: ServiceType[];
  setService: (service: ServiceType[]) => void;

  hScreen: boolean;
  setHScreen: (hScreen: boolean) => void;
  space: number;
  setSpace: (space: number) => void;

  primaryButton: boolean;
  setPrimaryButton: (primaryButton: boolean) => void;
  primaryButtonText: string;
  setPrimaryButtonText: (primaryButtonText: string) => void;
  widthPrimaryButton: number;
  setWidthPrimaryButton: (widthPrimaryButton: number) => void;
  heightPrimaryButton: number;
  setHeightPrimaryButton: (heightPrimaryButton: number) => void;

  secondaryButton: boolean;
  setSecondaryButton: (secondaryButton: boolean) => void;
  secondaryButtonText: string;
  setSecondaryButtonText: (secondaryButtonText: string) => void;
  widthSecondaryButton: number;
  setWidthSecondaryButton: (widthSecondaryButton: number) => void;
  heightSecondaryButton: number;
  setHeightSecondaryButton: (heightSecondaryButton: number) => void;

  faq: FAQType[];
  setFaq: (faq: FAQType[]) => void;

  courseId: string[];
  setCourseId: (courseId: string[]) => void;

  disabled?: boolean;
  totalImage: string[];
  allCourse: Course[]
  pageType: string;
}

function ReturnConfigurator({
  animation,
  setAnimation,
  animationType,
  setAnimationType,

  backgroundImages,
  setBackgroundImages,
  backgroundImageOpacity,
  setBackgroundImageOpacity,
  backgroundColor,
  setBackgroundColor,

  images,
  setImages,
  imagesOnLeft,
  setImagesOnLeft,

  textBlue,
  setTextBlue,
  textGreen,
  setTextGreen,
  textBlack,
  setTextBlack,
  description,
  setDescription,

  carouselDots,
  setCarouselDots,
  carouselButtons,
  setCarouselButtons,

  service,
  setService,

  hScreen,
  setHScreen,
  space,
  setSpace,

  primaryButton,
  setPrimaryButton,
  primaryButtonText,
  setPrimaryButtonText,
  widthPrimaryButton,
  setWidthPrimaryButton,
  heightPrimaryButton,
  setHeightPrimaryButton,

  secondaryButton,
  setSecondaryButton,
  secondaryButtonText,
  setSecondaryButtonText,
  widthSecondaryButton,
  setWidthSecondaryButton,
  heightSecondaryButton,
  setHeightSecondaryButton,

  faq,
  setFaq,

  courseId,
  setCourseId,

  disabled,
  totalImage,
  pageType,

  allCourse,

}: ConfiguratorInterfaceProps) {
  if (pageType === "Hero") {
    return (
      <HeroConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "TextWithImage") {
    return (
      <TextWithImageConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "OnlyText") {
    return (
      <OnlyTextConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "Gallery") {
    return (
      <GalleryConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "Contact") {
    return (
      <ContactConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "FAQ") {
    return (
      <FAQConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "Service") {
    return (
      <ServiceConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
      />
    );
  } else if (pageType === "Course") {
    return (
      <CourseConfigurator
        animation={animation}
        setAnimation={setAnimation}
        animationType={animationType}
        setAnimationType={setAnimationType}
        backgroundImages={backgroundImages}
        setBackgroundImages={setBackgroundImages}
        backgroundImageOpacity={backgroundImageOpacity}
        setBackgroundImageOpacity={setBackgroundImageOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        images={images}
        setImages={setImages}
        imagesOnLeft={imagesOnLeft}
        setImagesOnLeft={setImagesOnLeft}
        textBlue={textBlue}
        setTextBlue={setTextBlue}
        textGreen={textGreen}
        setTextGreen={setTextGreen}
        textBlack={textBlack}
        setTextBlack={setTextBlack}
        description={description}
        setDescription={setDescription}
        carouselDots={carouselDots}
        setCarouselDots={setCarouselDots}
        carouselButtons={carouselButtons}
        setCarouselButtons={setCarouselButtons}
        service={service}
        setService={setService}
        hScreen={hScreen}
        setHScreen={setHScreen}
        space={space}
        setSpace={setSpace}
        primaryButton={primaryButton}
        setPrimaryButton={setPrimaryButton}
        primaryButtonText={primaryButtonText}
        setPrimaryButtonText={setPrimaryButtonText}
        widthPrimaryButton={widthPrimaryButton}
        setWidthPrimaryButton={setWidthPrimaryButton}
        heightPrimaryButton={heightPrimaryButton}
        setHeightPrimaryButton={setHeightPrimaryButton}
        secondaryButton={secondaryButton}
        setSecondaryButton={setSecondaryButton}
        secondaryButtonText={secondaryButtonText}
        setSecondaryButtonText={setSecondaryButtonText}
        widthSecondaryButton={widthSecondaryButton}
        setWidthSecondaryButton={setWidthSecondaryButton}
        heightSecondaryButton={heightSecondaryButton}
        setHeightSecondaryButton={setHeightSecondaryButton}
        faq={faq}
        setFaq={setFaq}
        courseId={courseId}
        setCourseId={setCourseId}
        disabled={disabled}
        totalImage={totalImage}
        allCourse={allCourse}
      />
    );
  }
}

export default ReturnConfigurator;
