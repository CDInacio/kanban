interface AvatarProps {
  image: string | null | undefined;
  alt: string;
  onClick?: () => void;
}

const Avatar = ({ image, alt, onClick }: AvatarProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-[50px] h-[50px] relative rounded-full overflow-hidden"
    >
      <img src={image ?? ""} alt={alt} />
    </div>
  );
};

export default Avatar;
