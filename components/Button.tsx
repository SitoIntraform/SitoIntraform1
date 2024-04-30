"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive"

interface ButtonPros {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  width?: number;
  height?: number;
  secondary?: boolean;
  rectangle?: boolean;
  wfull?: boolean;
  animation?: boolean;
  className?: string;
}

function Button({
  children,
  disabled,
  onClick,
  width,
  height,
  rectangle,
  secondary,
  wfull,
  animation,
  className
}: ButtonPros) {
  const [isMouseOverLeft, setIsMouseOverLeft] = useState<boolean>(false);
  const [isMouseOverRight, setIsMouseOverRight] = useState<boolean>(false);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const mouseX = event.pageX;
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const isOverLeft = mouseX < buttonRect.left + buttonRect.width / 2;
    const isOverRight = mouseX > buttonRect.left + buttonRect.width / 2;
    setIsMouseOverLeft(isOverLeft);
    setIsMouseOverRight(isOverRight);
  };

  return (
    <button
      className={`relative overflow-hidden group ${wfull ? "w-full overflow-hidden" : "overflow-hidden"}  
      ${rectangle ? "rounded-md" : "rounded-full"}  overflow-y-hidden text-white
      ${secondary ? "greenShadowBtn" : "blueShadowBtn"}
      ${secondary ? "bg-accentDesign" : "bg-primaryDesign"}
      hover:opacity-90
      transition-all duration-500 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed w-full ${className}
      `}
      style={{
        height,
        width,
      }}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseMove}
      onMouseLeave={() => {
        setIsMouseOverLeft(false);
        setIsMouseOverRight(false);
      }}
    >
      {animation && !disabled && !isMobile && (
        <div
          className={`z-10 absolute h-full w-[99%] ${
            secondary ? "bg-primaryDesign" : "bg-accentDesign"
            } top-0  transition-all duration-500 right-[100%] ${isMouseOverLeft && "group-hover:right-0"}
          `}
        />
      )}
      {animation && !disabled && !isMobile && (
        <div
          className={`z-10 absolute h-full w-[99%] ${secondary ? "bg-primaryDesign" : "bg-accentDesign"
            } top-0  transition-all duration-500 left-[100%] ${isMouseOverRight && "group-hover:left-0"}
          `}
        />
      )}
      <div
        className={`h-full w-full absolute z-50 top-0 flex flex-col items-center justify-center transition-all duration-500 regular-medium !text-white`}
      >
        {children}
      </div>
    </button>
  );
}

export default Button;