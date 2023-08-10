import React from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  handleToggle: () => void;
}

const Modal = ({ children, className, handleToggle }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={handleToggle}
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
      ></div>
      <div
        className={twMerge(
          "relative flex flex-col p-[30px] z-20  bg-white w-[1100px] min-h-[400px] border border-gray-200 rounded shadow",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
