"use client"

import React, { ChangeEvent } from "react";

interface CheckBoxProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function CheckBox({
  label,
  description,
  value,
  onValueChange,
  disabled,
}: CheckBoxProps) {
  return (
    <div className="peer w-full border-2 outline-none p-5 rounded-2xl  border-textDesign/50 text-textDesign focus:border-primaryDesign transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex flex-row gap-4 large-regular font-bold">
      <input
        className={``}
        disabled={disabled}
        checked={value}
        onChange={onValueChange}
        type={"checkbox"}
      />
      <div className="flex flex-col">
        {label}
        {description && <span className="small-normal">{description}</span>}
      </div>
    </div>
  );
}

export default CheckBox;
