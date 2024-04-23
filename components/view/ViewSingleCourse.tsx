import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";

import { motion } from "framer-motion";
import { containerAnimation } from "@/lib/animation";
import Input from "../Input";
import usePrivacyModal from "@/hooks/usePrivacyModal";
import toast from "react-hot-toast";

function ViewSingleCourse({
  name,
  link,
  title,
  description,
  price,
  duration,
  code,
  image,
  haveFile,
  fileLink,
  dev,
}: {
  name?: string;
  link?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  code?: string;
  image?: string;
  haveFile?: boolean;
  fileLink?: string;
  dev?: boolean;
}) {
  const privacyModal = usePrivacyModal();

  const [nameContact, setNameContact] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [messageContact, setMessageContact] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const onPressContactBtn = () => {
    if (!nameContact || !emailContact || !messageContact) {
      toast.error("Compila tutti i campi");
      return;
    }

    if (!privacy) {
      toast.error("Conferma di aver letto le policy per poterci contattare");
      return;
    }

    toast.success("Contattati");
  };

  return (
    <div className={`${dev ? "w-full" : "w-[100vw] pt-[90px] containerDesign"}`}>
      <div className="w-full flex lg:flex-row flex-col-reverse gap-10 items-start">
        <div className="w-full lg:w-[70%] flex-col flex gap-3">
          <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={"show"}
            className="font-semibold text-[30px] !text-primaryDesign tracking-wider"
          >
            {duration}
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={"show"}
            className="h1Desktop !text-accentDesign"
          >
            {title}
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={"show"}
            className="flex flex-col gap-2"
          >
            <div className="">
              <span className="large-medium !text-primaryDesign">Codice: </span>
              <span className="large-extrabold">{code}</span>
            </div>
            <div className="">
              <span className="large-medium !text-primaryDesign">Prezzo: </span>
              <span className="large-extrabold">€{price}</span>
            </div>
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={"show"}
            className="large-normal"
          >
            {description}
          </motion.div>
        </div>
        <motion.div
          viewport={{ once: true }}
          variants={containerAnimation(0, "up")}
          initial={"hidden"}
          whileInView={"show"}
          className="w-full lg:w-[30%] lg:border-textDesign/50 lg:p-4 lg:border-2 lg:sticky lg:top-28 overflow-hidden"
        >
          <div className="w-full h-[350px] lg:h-[200px] relative">
            <Image src={image || ""} alt="Image" fill objectFit="cover" />
          </div>
          <div className="hidden lg:flex flex-col gap-2 mt-[20px]">
            <div className="font-semibold text-[20px] !text-primaryDesign tracking-wide line-clamp-1">
              {duration}
            </div>
            <div className="h5Desktop !text-accentDesign !leading-[100%] cursor-pointer hover:underline underline-offset-1">
              {title}
            </div>
            <div className="small-normal line-clamp-4">{description}</div>
          </div>

          {haveFile && <div className="hidden lg:flex flex-col gap-2 w-full mt-[30px]">
            <Button
              onClick={() => {}}
              height={55}
              className="w-full regular-medium !text-white"
              secondary
            >
              Scarica il programma
            </Button>
          </div>}
        </motion.div>
      </div>
      <div>
        <div className="text-center h2Desktop !text-primaryDesign my-[50px]">
          Contattaci per informazioni
        </div>
        <div className="my-[30px] flex flex-row justify-center">
          <div className="max-w-[600px] w-full flex-col items-center justify-center space-y-[16px]">
            <div
              className="w-full"
            >
              <Input
                value={nameContact}
                onValueChange={(e) => setNameContact(e.target.value)}
                label="Nome"
                notAnimate
              />
            </div>
            <div
              className="w-full"
            >
              <Input
                value={emailContact}
                onValueChange={(e) => setEmailContact(e.target.value)}
                label="Email"
                notAnimate
              />
            </div>
            <div
              className="w-full"
            >
              <Input
                value={messageContact}
                onValueChange={(e) => setMessageContact(e.target.value)}
                label="Messaggio"
                textArea
                rows={5}
                notAnimate
              />
            </div>
            <div
              className="flex flex-row items-center justify-center gap-2"
            >
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
              />
              <p className={`regular-normal`}>
                Dichiaro di aver letto le{" "}
                <span
                  className="regular-medium hover:underline cursor-pointer hover:underline-offset-1"
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
              >
                <p>Contattaci</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleCourse;
