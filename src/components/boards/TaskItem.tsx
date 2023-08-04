import moment from "moment";
import "moment/locale/pt-br";

import { BiComment, BiDotsVerticalRounded } from "react-icons/bi";

interface TaskItemProps {
  title: string;
  description?: string;
  createdAt?: string;
}

const TaskItem = ({ title, description, createdAt }: TaskItemProps) => {
  return (
    <div className="my-[20px]">
      <div className="flex justify-between items-center">
        <span className="bg-red-400 rounded-xl py-[2px] px-[5px] text-white font-medium">
          Alto
        </span>
        <BiDotsVerticalRounded size={25} />
      </div>
      <h4 className="text-xl text-slate-800 font-bold mt-[10px]">{title}</h4>
      <div>
        <h5 className="font-semibold text-lg mt-[20px]">Subtarefas</h5>
        <ul>
          <li>Subtarefa 1</li>
          <li>Subtarefa 2</li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-[20px]">
        <p className="text-neutral-400">
          {moment(createdAt).locale("pt").format("ll")}
        </p>
        <BiComment size={20} />
      </div>
      <hr className="mt-[20px]" />
    </div>
  );
};

export default TaskItem;
