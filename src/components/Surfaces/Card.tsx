import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={twMerge("bg-white rounded p-[15px] mt-[20px]", className)}>
      {children}
    </div>
  );
};

export default Card;
