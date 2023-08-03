"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type TextInputProps = ComponentProps<"input"> & {
  className?: string;
};

const TextInput = ({ className, ...props }: TextInputProps) => {
  return (
    <input
      className={twMerge(
        "border-[1px] border-neutral-200 rounded-md  py-[10px] px-[20px] focus:border-2 focus:border-neutral-800 transition ease-out duration-300",
        className
      )}
      {...props}
    />
  );
};

export default TextInput;
