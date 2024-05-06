import { Variants } from "framer-motion";

export const containerAnimation = (delay: number, direction?: string) => {
    const variants: Variants = {
      hidden: {
        y: direction === "up" ? "100%" : direction === "down" ? "-10%" : "0",
        x:
          direction === "right" ? "-100%" : direction === "left" ? "100%" : "0",
        opacity: 0,
        transition: {
          type: "spring",
          duration: 0.6,
          //   ease: "easeInOut"
          // delay: 0.1,
        },
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,

        transition: {
          delay: delay + 0.1,
          type: "spring",
          duration: 1,
          //   ease: "easeInOut"
        },
      },
    };

    return variants;
}