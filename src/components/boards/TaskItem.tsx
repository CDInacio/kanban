import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";

import { BiComment, BiDotsVerticalRounded } from "react-icons/bi";

interface TaskItemProps {
  title: string;
  status?: string;
  description?: string;
  createdAt?: string;
}

const TaskItem = ({ title, description, createdAt }: TaskItemProps) => {
  const [dropDown, setDropdown] = useState<boolean>(false);
  const options = ["editar", "excluir"];
  return (
    <div className="my-[20px]">
      <div className="flex justify-between items-center">
        <span className="bg-red-400 rounded-xl py-[2px] px-[5px] text-white font-medium">
          Alto
        </span>
        <span
          onClick={() => setDropdown((prev) => !prev)}
          className="relative hover:bg-neutral-100 cursor-pointer rounded-full h-[35px] w-[35px] flex items-center justify-center"
        >
          <BiDotsVerticalRounded size={25} />
          {dropDown && (
            <div className="absolute bg-white top-[40px] shadow-sm">
              {options.map((opt, i) => (
                <div
                  key={`${opt + i}`}
                  className="py-[10px] px-[20px] hover:bg-neutral-100 transition ease-out duration-300 cursor-pointer"
                >
                  <span onClick={() => {}}>{opt}</span>
                </div>
              ))}
            </div>
          )}
        </span>
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
