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
import { useRouter } from "next/navigation";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import dynamic from "next/dynamic";
import axios from "axios";

const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

function ContactView({
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
  const router = useRouter();
  const [updateCounter, setUpdateCounter] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [message, setMessage] = useState("");

  const [policy, setPolicy] = useState(false);

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  const privacyModal = usePrivacyModal();

  const [isLoafing, setIsLoafing] = useState(false);

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
    setIsLoafing(true);
    if (!name || !email || !message || !telefono) {
      toast.error("Compila tutti i campi");
      setIsLoafing(false);
      return;
    }

    if (!policy) {
      toast.error("Conferma di aver letto le policy per poterci contattare");
      setIsLoafing(false);
      return;
    }

    try{
      const req = axios.post("/api/contact", {
        nome: name, telefono, email, messaggio: message
      });

      toast.success("Grazie per averci contattato! Riceverai nostre notizie al più presto");
    } catch(e){
      console.log(e);
      toast.error("Something went wrong");
    }

    setEmail("");
    setMessage("");
    setTelefono("");
    setName("");
    setPolicy(false);

    setIsLoafing(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id={section.name}
      style={{
        backgroundColor: section.data.backgroundImages
          ? "transparent"
          : section.data.backgroundColor,
      }}
      className={`${
        section.data.hScreen
          ? "lg:h-[calc(100vh-80px)] h-auto py-20 lg:py-0"
          : ""
      } w-screen relative lg:overflow-hidden !max-w-[100%] !overflow-x-hidden !overflow-hidden`}
      key={dev ? updateCounter : mounted ? section.SectionId : undefined}
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
          paddingBottom: section.data.hScreen
            ? "0px"
            : section.data.space + "px",
          paddingTop: section.data.hScreen ? "0px" : section.data.space + "px",
        }}
        className={`h-full z-30 flex containerDesign  flex-col items-center justify-center !overflow-hidden ${
          section.data.hScreen ? "py-10 lg:py-0" : "!max-lg:!py-10"
        }`}
      >
        <div
          className={`mx-auto flex flex-col w-[100%] items-center justify-center gap-6`}
        >
          <div
            className="h4Mobile md:h4Desktop xl:h3Desktop relative text-center"
          >
            {/* Title */}

            {section.data.textBlue && section.data.textGreen ? (
              <>
                <span className="text-accentDesign">
                  {section.data.textBlue}
                </span>{" "}
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
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10 mt-8 overflow-hidden">
            {/* FORM */}
            <div className="w-[100%] lg:w-[50%] flex flex-col items-center justify-center z-[20]">
              <div
                className="max-w-[500px] w-[100%] space-y-[20px] "
              >
                <div className="w-full">
                  <Input
                    value={name}
                    onValueChange={(e) => setName(e.target.value)}
                    label="Nome e Cognome"
                    notAnimate
                    disabled={isLoafing}
                  />
                </div>
                <div className="w-full">
                  <Input
                    value={email}
                    onValueChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    notAnimate
                    disabled={isLoafing}
                  />
                </div>
                <div className="w-full">
                  <Input
                    value={telefono}
                    onValueChange={(e) => setTelefono(e.target.value)}
                    label="Numero di telefono"
                    notAnimate
                    disabled={isLoafing}
                  />
                </div>
                <div className="w-full">
                  <Input
                    value={message}
                    onValueChange={(e) => setMessage(e.target.value)}
                    label="Messaggio"
                    textArea
                    rows={5}
                    notAnimate
                    disabled={isLoafing}
                  />
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <input
                    type="checkbox"
                    checked={policy}
                    onChange={(e) => setPolicy(e.target.checked)}
                    disabled={isLoafing}
                  />
                  <p
                    className={`regular-normal`}
                    style={{
                      color:
                        section.data.backgroundColor === "#3b3b3b"
                          ? "white"
                          : "#3b3b3b",
                    }}
                  >
                    Dichiaro di aver letto le{" "}
                    <span
                      className="regular-medium hover:underline cursor-pointer hover:underline-offset-1 !text-primaryDesign"
                      onClick={() => {
                        if (!dev) {
                          privacyModal.onOpen();
                        }
                      }}
                    >
                      Privacy Policy
                    </span>
                  </p>
                </div>
              </div>
              <div
                className="w-full flex flex-row items-center justify-center mt-[20px]"
              >
                <Button
                  height={55}
                  width={160}
                  onClick={() => {
                    if (!dev) {
                      onPressContactBtn();
                    }
                  }}
                  className="scale-90 md:scale-100 xl:scale-105"
                  animation
                  disabled={isLoafing}
                >
                  <p>Contattaci</p>
                </Button>
              </div>
            </div>

            {/* MAP */}
            <div
              className="lg:h-full h-[300px] w-[100%] lg:w-[50%] overflow-hidden"
            >
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactView;
