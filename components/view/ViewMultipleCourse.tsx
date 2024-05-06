import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import Button from "../Button";
import { containerAnimation } from "@/lib/animation";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ViewMultipleCourse({
  name,
  link,
  title,
  description,
  price,
  duration,
  code,
  destination,
  image,
  dev,
  right
}: {
  name?: string;
  link?: string;
  title?: string;
  description?: string;
  price?: string;
  duration?: string;
  code?: string;
  image?: string;
  destination?: string;
  dev?: boolean;
  right?: boolean;
}) {
  const router = useRouter();
  const l = dev === true ? "" : link ? "/"+link : "";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div key={mounted ? name : undefined} className={`w-full flex ${right ? "flex-col-reverse lg:flex-row-reverse" : "flex-col lg:flex-row"} gap-10 items-center justify-center overflow-hidden`}>
      <motion.div viewport={{ once: true }}
        variants={containerAnimation(0, "up")}
        initial={"hidden"}
        whileInView={mounted ? "show" : ""} onClick={() => { if(!dev && l) router.push(l)}} className="w-full lg:w-[50%] h-[300px] lg:h-[400px] relative cursor-pointer overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <Image
            src={image || ""}
            alt="Immagine"
            fill
            objectFit="cover"
            className="hover:scale-110 transition-all duration-200"
          />
        </Suspense>
      </motion.div>
      <div className="w-full lg:w-[50%] flex flex-col gap-3 lg:gap-10">
        <div className="flex flex-col gap-2">
          {/* {duration && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="font-semibold text-[25px] !text-primaryDesign tracking-wider"
          >
            {duration}
          </motion.div>} */}
          {title && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            onClick={() => { if (!dev && l) router.push(l) }}
            className="h6Mobile md:h5Desktop xl:h4Desktop !text-accentDesign !leading-[100%] lg:line-clamp-2 cursor-pointer hover:underline underline-offset-1"
          >
            {title}
          </motion.div>}
          {description && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="regular-normal line-clamp-6 lg:line-clamp-4"
          >
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </motion.div>}
        </div>

        <motion.div
          viewport={{ once: true }}
          variants={containerAnimation(0, "up")}
          initial={"hidden"}
          whileInView={mounted ? "show" : ""}
          className="flex flex-row gap-4 w-full"
        >
          <div onClick={() => { if (!dev && l) router.push(l) }} className="w-full lg:max-w-[200px]">
            <Button
              onClick={() => { }}
              height={55}
              animation
              wfull
            >
              Scopri di più
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ViewMultipleCourse;
