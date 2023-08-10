import { twMerge } from "tailwind-merge";

const Devider = ({ className }: { className?: string }) => {
  return <hr className={twMerge("mb-[20px]", className)} />;
};

export default Devider;
