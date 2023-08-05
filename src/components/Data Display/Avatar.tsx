import { twMerge } from "tailwind-merge";

interface AvatarProps {
  image: string | null | undefined;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ image, alt, className, onClick }: AvatarProps) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "cursor-pointer w-[50px] h-[50px] relative rounded-full overflow-hidden",
        className
      )}
    >
      <img src={image ?? ""} alt={alt} />
    </div>
  );
};

export default Avatar;
