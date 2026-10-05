import type { InputHTMLAttributes } from "react";
import { hexForColorInput } from "../lib/hex";
import { cn } from "../lib/utils";

export interface HexColorInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
}

export function HexColorInput({
  value,
  onChange,
  placeholder,
  className,
  "aria-label": ariaLabel = "Color",
  ...props
}: HexColorInputProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <input
        type="color"
        aria-label={`${ariaLabel} picker`}
        value={hexForColorInput(value)}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        type="text"
        aria-label={ariaLabel}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </span>
  );
}
