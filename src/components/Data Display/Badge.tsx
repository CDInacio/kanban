const Badge = ({ text }: { text: string | undefined }) => {
  switch (text) {
    case "Baixo":
      return (
        <span className="w-fit bg-green-400 rounded-xl py-[2px] px-[5px] text-white font-medium">
          {text}
        </span>
      );
    case "Médio":
      return (
        <span className="w-fit bg-yellow-400 rounded-xl py-[2px] px-[5px] text-white font-medium">
          {text}
        </span>
      );
    case "Alto":
      return (
        <span className="w-fit bg-red-400 rounded-xl py-[2px] px-[5px] text-white font-medium">
          {text}
        </span>
      );
    case "Urgente":
      return (
        <span className="w-fit bg-red-700 rounded-xl py-[2px] px-[5px] text-white font-medium">
          {text}
        </span>
      );
    default:
      return (
        <span className="w-fit bg-green-400 rounded-xl py-[2px] px-[5px] text-white font-medium">
          {text}
        </span>
      );
  }
};

export default Badge;
