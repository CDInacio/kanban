interface SubtaskProps {
  text: string;
  done?: boolean;
  handleCompleteTask?: () => void;
}

const Subtask = ({ text, done, handleCompleteTask }: SubtaskProps) => {
  return (
    <div className="bg-neutral-100 mb-[10px] p-[10px] rounded mt-[20px] flex items-center gap-[20px]">
      <input
        onChange={handleCompleteTask}
        type="checkbox"
        checked={done}
        className={` w-6 h-6 border border-gray-300 rounded appearance-none checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      />
      <p className={`${done && "line-through"}`}>{text}</p>
    </div>
  );
};

export default Subtask;
