import Image from "next/image";
import React, { useEffect, useState } from "react";
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
    <div key={mounted ? name : undefined} className={`w-full flex ${right ? "flex-col-reverse lg:flex-row-reverse" : "flex-col lg:flex-row"} gap-10 items-center justify-center`}>
      <div onClick={() => { if(!dev && l) router.push(l)}} className="w-full lg:w-[50%] h-[300px] lg:h-[400px] relative cursor-pointer overflow-hidden">
        <Image
          src={image || ""}
          alt="Immagine"
          fill
          objectFit="cover"
          className="hover:scale-110 transition-all duration-200"
          
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          {duration && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="font-semibold text-[25px] !text-primaryDesign tracking-wider"
          >
            {duration}
          </motion.div>}
          {title && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            onClick={() => { if (!dev && l) router.push(l) }}
            className="h2Desktop !text-accentDesign !leading-[100%] line-clamp-1 lg:line-clamp-2 cursor-pointer hover:underline underline-offset-1"
          >
            {title}
          </motion.div>}
          {description && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="regular-normal line-clamp-2 lg:line-clamp-4"
          >
            {description}
          </motion.div>}
        </div>

        <motion.div
          viewport={{ once: true }}
          variants={containerAnimation(0, "up")}
          initial={"hidden"}
          whileInView={mounted ? "show" : ""}
          className="flex flex-row gap-4 w-full"
        >
          <div onClick={() => { if (!dev && l) router.push(l) }}>
            <Button
              onClick={() => { }}
              height={55}
              animation
              className="lg:w-[200px] w-full"
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
