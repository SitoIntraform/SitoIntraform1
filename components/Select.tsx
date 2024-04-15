import React, { ChangeEvent } from "react";

interface SelectProps {
  label: string;
  value: string | number;
  onValueChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  possbileValues: {
    name: string;
    value: string;
  }[];
  disabledFirst?: boolean;
}

function Select({
  label,
  value,
  onValueChange,
  disabled,
  possbileValues,
  disabledFirst,
}: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={`peer h-full w-full border-2 outline-none p-5 rounded-2xl  border-textDesign/50 text-textDesign focus:border-primaryDesign transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed`}
        disabled={disabled}
        value={value}
        onChange={onValueChange}
      >
        <option value={""} disabled={disabledFirst}>Seleziona qualcosa</option>
        {possbileValues.map((possbileValue) => (
          <option key={possbileValue.value}  value={possbileValue.value}>
            {possbileValue.name}
          </option>
        ))}
      </select>
      <div
        className={`absolute top-[2px] scale-[0.8] px-2 left-2 text-textDesign peer-focus-within:text-primaryDesign peer-focus-within:scale-105 peer-focus-within:px-2 peer-focus-within:bg-white transition-all duration-150 peer-focus-within:-top-3 peer-focus-within:left-4`}
      >
        {label}
      </div>
    </div>
  );
}

export default Select;
