"use client";

import CheckBox from "@/components/CheckBox";
import Input from "@/components/Input";
import { SectionData } from "@prisma/client";
import React from "react";
import WrapConfigurazioni from "../WrapConfigurazioni";
import HeaderPage from "../HeaderPage";
import Select from "@/components/Select";
import SelectImagesConfigurations from "../SelectImagesConfigurations";
import { FAQType, ServiceType } from "@/types";

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

function HeroConfigurator({
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
  return (
    <div className="my-[16px]">
      <WrapConfigurazioni>
        <Input
          value={textBlue}
          onValueChange={(e) => setTextBlue(e.target.value)}
          disabled={disabled}
          label="Text Blue"
        />
        <Input
          value={textGreen}
          onValueChange={(e) => setTextGreen(e.target.value)}
          disabled={disabled}
          label="Text Green"
        />
      </WrapConfigurazioni>
      <div className="mt-[16px]">
        <Input
          value={description}
          onValueChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
          label="Description"
          textArea
          rows={6}
        />
      </div>
      <div className="mt-[16px] space-y-4">
        <CheckBox
          label="Altezza tutto schemro"
          description="Se la spunta non è attivata la pagina avrà un'altezza che dipenderà dal testo"
          value={hScreen}
          onValueChange={(e) => setHScreen(e.target.checked)}
          disabled={disabled}
        />
        {!hScreen && (
          <Input
            value={space}
            onValueChange={(e) => setSpace(Number(e.target.value))}
            disabled={disabled}
            type="number"
            label="Spazio sopra e sotto"
          />
        )}
      </div>

      <SelectImagesConfigurations
        images={images}
        setImages={setImages}
        multiple
        totalImage={totalImage}
        title="Immagini Background"
        description="Seleziona le immagini che andranno nel background della hero"
        disabled={disabled}
      />

      <div className="my-[16px]">
        <Input
          value={backgroundImageOpacity}
          onValueChange={(e) => setBackgroundImageOpacity(Number(e.target.value))}
          disabled={disabled}
          type="number"
          label="Opacità overlay"
        />
      </div>

      <HeaderPage
        title="Bottone primario"
        description="Gstisci il bottone primario della sezione (IMPORTANTE: imposta la dimensione dei bottoni per far si che si possano vedere)"
      />

      <WrapConfigurazioni>
        <CheckBox
          label="Bottone Primario"
          description="Il bottone primario è quello verde"
          value={primaryButton}
          onValueChange={(e) => setPrimaryButton(e.target.checked)}
          disabled={disabled}
        />
        <Input
          value={primaryButtonText}
          onValueChange={(e) => setPrimaryButtonText(e.target.value)}
          disabled={disabled}
          label="Bottone Primario testo"
        />
      </WrapConfigurazioni>

      <WrapConfigurazioni>
        <Input
          value={widthPrimaryButton}
          onValueChange={(e) => setWidthPrimaryButton(Number(e.target.value))}
          disabled={disabled}
          label="Lunghezza bottone primario"
          type="number"
        />
        <Input
          value={heightPrimaryButton}
          onValueChange={(e) => setHeightPrimaryButton(Number(e.target.value))}
          disabled={disabled}
          label="Altezza bottone primario"
          type="number"
        />
      </WrapConfigurazioni>

      <HeaderPage
        title="Bottone secondario"
        description="Gstisci il bottone secondario della sezione (IMPORTANTE: imposta la dimensione dei bottoni per far si che si possano vedere)"
      />

      <WrapConfigurazioni>
        <CheckBox
          label="Bottone Secondario"
          description="Il bottone secondario è quello blu"
          value={secondaryButton}
          onValueChange={(e) => setSecondaryButton(e.target.checked)}
          disabled={disabled}
        />
        <Input
          value={secondaryButtonText}
          onValueChange={(e) => setSecondaryButtonText(e.target.value)}
          disabled={disabled}
          label="Bottone secondario testo"
        />
      </WrapConfigurazioni>
      <WrapConfigurazioni>
        <Input
          value={widthSecondaryButton}
          onValueChange={(e) => setWidthSecondaryButton(Number(e.target.value))}
          disabled={disabled}
          label="Lunghezza bottone secondario"
          type="number"
        />
        <Input
          value={heightSecondaryButton}
          onValueChange={(e) =>
            setHeightSecondaryButton(Number(e.target.value))
          }
          disabled={disabled}
          label="Altezza bottone secondario"
          type="number"
        />
      </WrapConfigurazioni>

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

export default HeroConfigurator;
