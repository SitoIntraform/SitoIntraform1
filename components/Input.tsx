"use client";

import React, { ChangeEvent, useEffect, useRef } from "react";

interface InputProps {
  type?: string;
  label: string;
  value: string | number;
  onValueChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
  textArea?: boolean;
  rows?: number;
  notAnimate?: boolean;
}

function Input({
  type = "text",
  label,
  value,
  onValueChange,
  disabled,
  textArea,
  rows,
  notAnimate,
}: InputProps) {
  return (
    <div className="relative w-full h-full">
      {!textArea ? (
        <input
          className={`peer w-full border-2 outline-none p-5 rounded-2xl  border-textDesign/50 text-textDesign focus:border-primaryDesign transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed h-full`}
          disabled={disabled}
          value={value}
          onChange={onValueChange}
          type={type}
          onClick={(e) => {
            e.stopPropagation();
          }}
          name={label}
          id={label}
        />
      ) : (
        <textarea
          className={`peer w-full border-2 outline-none p-5 rounded-2xl  border-textDesign/50 text-textDesign focus:border-primaryDesign transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed z-10`}
          disabled={disabled}
          value={value}
          onChange={onValueChange}
          rows={rows}
          style={{ resize: "none", overflow: "auto" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          name={label}
          id={label}
        />
      )}
      <div
        className={`absolute top-[2px] scale-[0.8] px-2 left-2 text-textDesign peer-focus-within:text-primaryDesign ${
          notAnimate
            ? ""
            : "peer-focus-within:scale-105 peer-focus-within:px-2 peer-focus-within:bg-white transition-all duration-150 peer-focus-within:-top-3 peer-focus-within:left-4"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default Input;
