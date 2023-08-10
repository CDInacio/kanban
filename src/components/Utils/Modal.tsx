import React from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  handleToggle: () => void;
}

const Modal = ({ children, className, handleToggle }: ModalProps) => {
  return (
    <div>
      <div
        onClick={handleToggle}
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
      ></div>
      <div
        className={twMerge(
          "absolute flex flex-col p-[30px]  left-0 right-0 z-20 overflow-hidden  mx-auto bg-white w-[1100px] min-h-[400px] border border-gray-200 rounded shadow top-10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
