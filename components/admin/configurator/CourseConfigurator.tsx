"use client";

import { FAQType, ServiceType } from "@/types";
import WrapConfigurazioni from "../WrapConfigurazioni";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import SelectImagesConfigurations from "../SelectImagesConfigurations";
import HeaderPage from "../HeaderPage";
import Select from "@/components/Select";
import { useState } from "react";
import { Menu, Plus, Trash } from "lucide-react";
import Button from "@/components/Button";
import { Course } from "@prisma/client";

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
  allCourse: Course[];
}

function CourseConfigurator({
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
  allCourse,
}: HeroConfiguratorProps) {
  const onAddCourse = () => {
    let c = courseId;
    c = [
      ...c,
      allCourse[0].CorsoId,
    ];
    setCourseId(c);
  };

  const onValueChange = (index: number, value: string) => {
    const c = courseId;
    c[index] = value;
    setCourseId([...c]);
  }

  const onDelete = (index: number) => {
    let c = courseId;
    c.splice(index, 1);
    setCourseId([...c]);
  }

  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>(-1);

  const handleDrop = () => {
    if (dragOverItemIndex === -1) {
      setDragItemIndex(-1);
      return;
    }

    const _sections = [...courseId];
    const dragItem = _sections.splice(dragItemIndex, 1)[0];
    _sections.splice(dragOverItemIndex, 0, dragItem);
    setCourseId(_sections);
    setDragItemIndex(-1);
  };

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
      <Select
        value={colorSelector}
        onValueChange={(e) => {
          setColorSelector(e.target.value);

          if (e.target.value === "Nero") {
            setTextBlue("");
            setTextGreen("");
          } else if (e.target.value === "Blue/Verde") {
            setTextBlack("");
          } else if (e.target.value === "Blue") {
            setTextGreen("");
            setTextBlack("");
          } else {
            setTextBlack("");
            setTextBlue("");
          }
        }}
        disabled={disabled}
        label="Colore Titolo"
        possbileValues={[
          {
            name: "Titolo Blu e Verde",
            value: "Blue/Verde",
          },
          {
            name: "Titolo blu",
            value: "Blue",
          },
          {
            name: "Titolo verde",
            value: "Verde",
          },
          {
            name: "Titolo nero",
            value: "Nero",
          },
        ]}
        disabledFirst
      />
      {colorSelector === "Blue/Verde" ? (
        <WrapConfigurazioni>
          <Input
            value={textBlue}
            onValueChange={(e) => setTextBlue(e.target.value)}
            disabled={disabled}
            label="Titolo blu"
          />
          <Input
            value={textGreen}
            onValueChange={(e) => setTextGreen(e.target.value)}
            disabled={disabled}
            label="Titolo verde"
          />
        </WrapConfigurazioni>
      ) : colorSelector === "Blue" ? (
        <div className="my-[20px]">
          <Input
            value={textBlue}
            onValueChange={(e) => setTextBlue(e.target.value)}
            disabled={disabled}
            label="Titolo blu"
          />
        </div>
      ) : colorSelector === "Verde" ? (
        <div className="my-[20px]">
          <Input
            value={textGreen}
            onValueChange={(e) => setTextGreen(e.target.value)}
            disabled={disabled}
            label="Titolo verde"
          />
        </div>
      ) : (
        <div className="my-[20px]">
          <Input
            value={textBlack}
            onValueChange={(e) => setTextBlack(e.target.value)}
            disabled={disabled}
            label="Titolo nero"
          />
        </div>
      )}

      <HeaderPage title="Corsi" description="Gestisci i corsi della sezione">
        <Button onClick={onAddCourse} width={170} height={55} animation>
          <div className="flex flex-row items-center gap-2 justify-center">
            <Plus className="w-6 h-6" />
            <p>Aggiungi</p>
          </div>
        </Button>
      </HeaderPage>

      <div className="my-[16px] flex flex-col items-center justify-center bg-neutral-200 p-5 rounded-lg gap-5">
        {courseId.map((c, index) => {
          const possibleValue = [...allCourse.map((course) => {
            return {
              name: course.name || "",
              value: course.CorsoId,
            }
          })]

          return (
            <div
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDragStart={() => setDragItemIndex(index)}
              onDragEnter={() => setDragOverItemIndex(index)}
              onDragEnd={handleDrop}
              key={index}
              className="w-full bg-white flex flex-col md:flex-row gap-10 p-5 items-center rounded-md cursor-grab"
            >
              <Menu className="w-8 h-8 hover:cursor-grab" />
              <div className="w-full space-y-[16px]">
                <Select 
                  label="Corso"
                  value={c}
                  possbileValues={possibleValue}
                  onValueChange={(e) => {
                    onValueChange(index, e.target.value);
                  }}
                  disabledFirst
                />
              </div>
              <Trash
                className="w-8 h-8 hover:opacity-35 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                    onDelete(index);
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="my-[16px]" />

      {/* <HeaderPage
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
      </WrapConfigurazioni> */}
    </div>
  );
}

export default CourseConfigurator;
