import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge(" flex text-3xl italic text-white", className)}>
      <h1 className="font-thin">Easy</h1>
      <h1 className="font-bold">Task</h1>
    </div>
  );
};

export default Logo;
