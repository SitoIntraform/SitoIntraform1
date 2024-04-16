"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";

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
      className={`relative group ${wfull ? "w-full" : ""}  
      ${rectangle ? "rounded-md" : "rounded-full"} overflow-x-hidden overflow-y-hidden text-white
      ${secondary ? "greenShadowBtn" : "blueShadowBtn"}
      ${secondary ? "bg-accentDesign" : "bg-primaryDesign"}
      ${!animation && "hover:opacity-80"}
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
      {animation && !disabled && (
        <div
          className={`z-10 absolute h-full w-full ${
            secondary ? "bg-primaryDesign" : "bg-accentDesign"
            } top-0  transition-all duration-500 right-[100%] ${isMouseOverLeft && "group-hover:right-0"}
          `}
        />
      )}
      {animation && !disabled && (
        <div
          className={`z-10 absolute h-full w-full ${secondary ? "bg-primaryDesign" : "bg-accentDesign"
            } top-0  transition-all duration-500 left-[100%] ${isMouseOverRight && "group-hover:left-0"}
          `}
        />
      )}
      <div
        className={`h-full w-full absolute z-50 top-0 flex flex-col items-center justify-center transition-all duration-500`}
      >
        {children}
      </div>
    </button>
  );
}

export default Button;
