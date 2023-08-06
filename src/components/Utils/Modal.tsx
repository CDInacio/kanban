import React from "react";

interface ModalProps {
  children: React.ReactNode;
  handleToggle: () => void;
}

const Modal = ({ children, handleToggle }: ModalProps) => {
  return (
    <div>
      <div
        onClick={handleToggle}
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
      ></div>
      <div className="absolute flex flex-col p-[30px]  left-0 right-0 z-20 overflow-hidden  mx-auto bg-white w-[1100px] min-h-[400px] border border-gray-200 rounded shadow top-10">
        {children}
      </div>
    </div>
  );
};

export default Modal;
