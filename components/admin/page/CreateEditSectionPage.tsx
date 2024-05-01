"use client";

import HeaderPage from "../HeaderPage";
import { Check, LogOut, Plus, Trash } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { FAQType, PageType, pageTypes, SectionType, ServiceType } from "@/types";
import { Course, Section } from "@prisma/client";
import { useEffect, useState } from "react";
import HeroConfigurator from "../configurator/HeroConfigurator";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import HeroView from "@/components/view/HeroView";
import useDeleteModal from "@/hooks/useDelete";
import DeleteModal from "../modals/DeleteModal";
import ReturnConfigurator from "../configurator/ReturnConfigurator";
import ReturnViewComponent from "@/components/view/ReturnViewComponent";

interface CreateEditSectionPageProps {
  id: string;
  sectionRecived: SectionType;
  totalImage: string[];
  allPages: PageType[];
  allSection: SectionType[];
  allCourse: Course[];
}

function CreateEditSectionPage({
  id,
  sectionRecived,
  totalImage,
  allPages,
  allSection,
  allCourse,
}: CreateEditSectionPageProps) {
  const deleteModal = useDeleteModal();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>(sectionRecived.name);
  const [pageType, setPageType] = useState<string>(sectionRecived.pageType);

  const [animation, setAnimation] = useState<boolean>(
    sectionRecived.data.animation || false
  );
  const [animationType, setAnimationType] = useState<string>(
    sectionRecived.data.animationType || ""
  );

  const [backgroundImages, setBackgroundImages] = useState<string>(
    sectionRecived.data.backgroundImages || ""
  );
  const [backgroundImageOpacity, setBackgroundImageOpacity] = useState<number>(
    sectionRecived.data.backgroundImageOpacity || 100
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    sectionRecived.data.backgroundColor || "#ffffff"
  );

  const [images, setImages] = useState<Array<string>>(
    sectionRecived.data.images || []
  );
  const [imagesOnLeft, setImagesOnLeft] = useState<boolean>(
    sectionRecived.data.imagesOnLeft || false
  );

  const [textBlue, setTextBlue] = useState<string>(
    sectionRecived.data.textBlue || ""
  );
  const [textGreen, setTextGreen] = useState<string>(
    sectionRecived.data.textGreen || ""
  );
  const [textBlack, setTextBlack] = useState<string>(
    sectionRecived.data.textBlack || ""
  );
  const [description, setDescription] = useState<string>(
    sectionRecived.data.description || ""
  );

  const [carouselDots, setCarouselDots] = useState<boolean>(
    sectionRecived.data.carouselDots || false
  );
  const [carouselButtons, setCarouselButtons] = useState<boolean>(
    sectionRecived.data.carouselButtons || false
  );

  const [service, setService] = useState<Array<ServiceType>>(
    sectionRecived.data.service || []
  );

  const [hScreen, setHScreen] = useState<boolean>(
    sectionRecived.data.hScreen || false
  );
  const [space, setSpace] = useState<number>(sectionRecived.data.space || 40);

  const [primaryButton, setPrimaryButton] = useState<boolean>(
    sectionRecived.data.primaryButton || false
  );
  const [primaryButtonText, setPrimaryButtonText] = useState<string>(
    sectionRecived.data.primaryButtonText || ""
  );
  const [primaryLink, setPrimaryLink] = useState<string>(
    sectionRecived.data.primaryLink || ""
  );

  const [widthPrimaryButton, setWidthPrimaryButton] = useState<number>(
    sectionRecived.data.widthPrimaryButton || 0
  );
  const [heightPrimaryButton, setHeightPrimaryButton] = useState<number>(
    sectionRecived.data.heightPrimaryButton || 0
  );

  const [secondaryButton, setSecondaryButton] = useState<boolean>(
    sectionRecived.data.secondaryButton || false
  );
  const [secondaryButtonText, setSecondaryButtonText] = useState<string>(
    sectionRecived.data.secondaryButtonText || ""
  );
  const [secondaryLink, setSecondaryLink] = useState<string>(
    sectionRecived.data.secondaryLink || ""
  );

  const [widthSecondaryButton, setWidthSecondaryButton] = useState<number>(
    sectionRecived.data.widthSecondaryButton || 0
  );
  const [heightSecondaryButton, setHeightSecondaryButton] = useState<number>(
    sectionRecived.data.heightSecondaryButton || 0
  );

  const [faq, setFaq] = useState<Array<FAQType>>(sectionRecived.data.faq || []);

  const [courseId, setCourseId] = useState<Array<string>>(sectionRecived.data.courseId || []);

  const onChangePagetType = (value: string) => {
    setPageType(value);
    // setFaq([]);
    // setService([]);
    // setCourseId([]);
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const insertInDB = async () => {
    if (!name || !pageType) {
      toast.error("Assicurati di aver dato il nome e di aver scelto il tipo");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/sections", {
        name,
        pageType,
        animation,
        animationType,
        backgroundImages,
        backgroundImageOpacity,
        backgroundColor,
        images,
        imagesOnLeft,
        textBlue,
        textGreen,
        textBlack,
        description,
        carouselDots,
        carouselButtons,
        service,
        hScreen,
        space,
        primaryButton,
        primaryButtonText,
        primaryLink,
        widthPrimaryButton,
        heightPrimaryButton,
        secondaryButton,
        secondaryButtonText,
        secondaryLink,
        widthSecondaryButton,
        heightSecondaryButton,
        faq,
        courseId,
      });

      if (res.status === 200) {
        toast.success("Sezione creata con successo");
        window.location.assign("/admin/sezioni");
        return;
      }
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (exit: boolean) => {
    if (!name || !pageType) {
      toast.error("Assicurati di aver compilato tutti i campi");
      return;
    }

    setLoading(true);

    console.log(sectionRecived.SectionId);

    try {
      const res = await axios.post(
        `/api/sections/${sectionRecived.SectionId}`,
        {
          name,
          pageType,
          animation,
          animationType,
          backgroundImages,
          backgroundImageOpacity,
          backgroundColor,
          images,
          imagesOnLeft,
          textBlue,
          textGreen,
          textBlack,
          description,
          carouselDots,
          carouselButtons,
          service,
          hScreen,
          space,
          primaryButton,
          primaryButtonText,
          primaryLink,
          widthPrimaryButton,
          heightPrimaryButton,
          secondaryButton,
          secondaryButtonText,
          secondaryLink,
          widthSecondaryButton,
          heightSecondaryButton,
          faq,
          courseId,
        }
      );

      if (res.status === 200) {
        toast.success("Sezione salvata con successo");
        if (exit) {
          window.location.assign("/admin/sezioni");
        } else {
          router.refresh();
        }
        return;
      }
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(false);

    try {
      const res = await axios.delete(
        `/api/sections/${sectionRecived.SectionId}`
      );

      if (res.status === 200) {
        toast.success("Sezione cancellata con successo");
        window.location.assign("/admin/sezioni");
        return;
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
      deleteModal.onClose();
    }
  };

  if (!mounted) {
    return;
  }

  return (
    <>
      <DeleteModal
        onCancel={onDelete}
        onClose={deleteModal.onClose}
        isOpen={deleteModal.isOpen}
        text={`Sei sicuro di voler eliminare la sezione ${name}?`}
      />
      <div className="containerDesign px-10 pt-[80px]">
        <div className="md:sticky top-[80px] bg-white z-[90]">
          <HeaderPage
            title="Sezione"
            description={
              id == "new"
                ? "Crea qui la nuova sezione del tuo sito"
                : "Modifica o elimina la sezione del tuo sito"
            }
          >
            {id == "new" ? (
              <Button
                className="md:w-[130px] w-[90%] h-[50px]"
                onClick={insertInDB}
                disabled={loading}
                secondary
                animation
              >
                <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                  <Plus />
                  Crea
                </div>
              </Button>
            ) : (
              <div className="flex md:flex-row flex-col gap-2 md:w-auto w-full justify-center items-center md:justify-end">
                <div className="w-full items-center md:w-auto flex flex-col gap-2">
                  <Button
                    className="md:w-[160px] w-[90%] h-[50px]"
                    onClick={() => update(true)}
                    disabled={loading}
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <Check />
                      Salva e esci
                    </div>
                  </Button>
                  <Button
                    className="md:w-[160px] w-[90%] h-[50px]"
                    onClick={() => update(false)}
                    disabled={loading}
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <Check />
                      Salva
                    </div>
                  </Button>
                </div>
                <div className="w-full items-center md:w-auto flex flex-col gap-2">
                  <Button
                    className="md:w-[150px] w-[90%] h-[50px]"
                    onClick={() => {
                      window.location.assign("/admin/sezioni");
                    }}
                    disabled={loading}
                    secondary
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <LogOut />
                      Esci
                    </div>
                  </Button>
                  <Button
                    className="md:w-[150px] w-[90%] h-[50px]"
                    onClick={deleteModal.onOpen}
                    disabled={loading}
                    secondary
                  >
                    <div className="flex flex-row items-center justify-center gap-2 xl:regular-medium !text-white md:small-regular">
                      <Trash />
                      Elimina
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </HeaderPage>
        </div>

        <div className="mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={name}
            onValueChange={(e) => setName(e.target.value)}
            label="Nome sezione"
            disabled={loading}
          />
          <Select
            value={pageType}
            onValueChange={(e) => onChangePagetType(e.target.value)}
            possbileValues={pageTypes}
            label="Tipo pagina"
            disabled={loading}
          />
        </div>

        {/* CONFIGURATORS */}
        <>
          <ReturnConfigurator
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
            disabled={loading}
            totalImage={totalImage}
            allCourse={allCourse}
            pageType={pageType}
          />
        </>
      </div>
      <div className="my-[100px] containerDesign px-10">
        <HeaderPage
          title="Preview pagina"
          description="Guarda la preview della pagina"
        />
      </div>

      {/* VIEW */}
      <>
        <ReturnViewComponent
          allPages={allPages}
          allSection={allSection}
          allCourse={allCourse}
          dev
          section={{
            SectionId: sectionRecived.SectionId,
            name,
            pageType,
            createdAt: sectionRecived.createdAt,
            updatedAt: sectionRecived.updatedAt,
            data: {
              animation,
              animationType,

              backgroundImages,
              backgroundImageOpacity,
              backgroundColor,

              images,
              imagesOnLeft,

              textBlue,
              textGreen,
              textBlack,
              description,

              carouselDots,
              carouselButtons,

              service,

              hScreen,
              space,

              primaryButton,
              primaryButtonText,
              primaryLink,
              heightPrimaryButton,
              widthPrimaryButton,

              secondaryButton,
              secondaryButtonText,
              secondaryLink,
              heightSecondaryButton,
              widthSecondaryButton,

              faq,
              courseId,
            },
          }}
          pageType={pageType}
        />
      </>
    </>
  );
}

export default CreateEditSectionPage;
