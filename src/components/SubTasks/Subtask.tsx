import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

interface SubtaskProps {
  text: string;
  done?: boolean;
  handleCompleteTask?: () => void;
}

const Subtask = ({ text, done, handleCompleteTask }: SubtaskProps) => {
  return (
    <div className="bg-neutral-100 mb-[10px] p-[10px] rounded mt-[20px] flex items-center gap-[20px]">
      <span onClick={handleCompleteTask} className="cursor-pointer">
        {done ? <FaRegCheckCircle size={20} /> : <FaRegCircle size={20} />}
      </span>
      <p className={`${done && "line-through"}`}>{text}</p>
    </div>
  );
};

export default Subtask;
