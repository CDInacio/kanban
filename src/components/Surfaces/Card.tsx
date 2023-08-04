import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white rounded p-[15px] mt-[20px]">{children}</div>;
};

export default Card;
