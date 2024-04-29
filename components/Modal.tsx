"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const modalBackgroundVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.2,
    },
  },
  animate: {
    opacity: 1,
  },
};

const modalVariants: Variants = {
  hidden: {
    y: "170%",
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
    },
  },
};

function Modal({
  open,
  title,
  containerClass,
  body,
  bodyContainerClass,
  footer,
  footerContainerClass,
  onClose,
}: {
  open: boolean;
  title: string;
  containerClass?: string;
  body: React.ReactElement;
  bodyContainerClass?: string;
  footer: React.ReactElement;
  footerContainerClass?: string;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [open]);

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="h-screen w-screen fixed top-0 inset-0 bg-textDesign/40 z-[302] flex flex-col items-center justify-center !max-w-[100%] !overflow-x-hidden"
      variants={modalBackgroundVariants}
      initial="hidden"
      animate={open ? "animate" : "hidden"}
      onAnimationComplete={() => {
        if (!open) {
          setIsOpen(false);
        }
      }}
      transition={{
        duration: 0.5,
      }}
      onClick={() => {
        onClose();
      }}
    >
      <motion.div
        className={`bg-white p-10 rounded-xl shadow-lg  w-full md:w-3/4 lg:w-2/4 ${containerClass} space-y-3 relative z-[101]`}
        variants={modalVariants}
        transition={{
          duration: 0.4,
          type: "spring",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="border-b border-textDesign pb-5 ">
          <div className="md:h3Desktop large-semibold text-center">{title}</div>
          <div
            onClick={onClose}
            className="absolute md:top-4 md:right-4 top-2 right-2 p-1 rounded-full hover:bg-textDesign/10 cursor-pointer hover:opacity-60 hover:scale-105 active:scale-95"
          >
            <X className="w-8 h-8" />
          </div>
        </div>
        <div className={bodyContainerClass + "max-w-full max-h-[300px] overflow-y-scroll"}>
          {body}
        </div>
        <div className={footerContainerClass}>{footer}</div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
