"use client";

import { FAQType, ServiceType } from "@/types";
import WrapConfigurazioni from "../WrapConfigurazioni";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import SelectImagesConfigurations from "../SelectImagesConfigurations";
import HeaderPage from "../HeaderPage";
import Select from "@/components/Select";
import { useState } from "react";

interface HeroConfiguratorProps {
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
}

function LoghiConfigurator({
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

  disabled,
  totalImage,
}: HeroConfiguratorProps) {
  const [colorSelector, setColorSelector] = useState<string>(
    textBlack
      ? "Nero"
      : textBlue && textGreen
      ? "Blue/Verde"
      : textBlue
      ? "Blue"
      : "Verde"
  );

  return (
    <div className="my-[16px]">
      <div className="mt-[16px] space-y-4">
          <Input
            value={space}
            onValueChange={(e) => setSpace(Number(e.target.value))}
            disabled={disabled}
            type="number"
            label="Spazio sopra e sotto"
          />
      </div>

      <SelectImagesConfigurations
        images={[backgroundImages]}
        setImages={(images: string[]) => {
          setBackgroundImages(images[0]);
        }}
        totalImage={totalImage}
        title="Immagini Logo"
        description="Selezione l'immagine della sezione"
        disabled={disabled}
      />

      <div className="my-[16px]" />

      <HeaderPage
        title="Animazioni"
        description="Gestisci le animazioni del sito"
      />

      <WrapConfigurazioni>
        <CheckBox
          value={animation}
          onValueChange={(e) => setAnimation(e.target.checked)}
          disabled={disabled}
          label="Animazione nella sezione"
        />
        <Select
          value={animationType}
          onValueChange={(e) => setAnimationType(e.target.value)}
          disabled={disabled}
          label="Tipo Animazione"
          possbileValues={[
            {
              name: "Fade in verso l'alto",
              value: "up",
            },
            {
              name: "Fade in verso il basso",
              value: "down",
            },
            {
              name: "Fade in verso sinistra",
              value: "left",
            },
            {
              name: "Fade in verso destra",
              value: "right",
            },
          ]}
        />
      </WrapConfigurazioni>
    </div>
  );
}

export default LoghiConfigurator;
