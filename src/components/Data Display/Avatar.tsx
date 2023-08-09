import { FaUserAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  image?: string | null | undefined;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ image, alt, className, onClick }: AvatarProps) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        `cursor-pointer w-[50px] ${
          !image && "flex items-center justify-center bg-neutral-200"
        }  h-[50px] relative rounded-full overflow-hidden`,
        className
      )}
    >
      {image ? <img src={image ?? ""} alt={alt} /> : <FaUserAlt size={30} />}
    </div>
  );
};

export default Avatar;
