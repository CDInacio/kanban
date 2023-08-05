import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";

import { Itask } from "@/@types/task";
import { IUser } from "@/@types/user";
import useGetUsers from "@/queries/useGetUsers";
import { BiComment, BiDotsVerticalRounded } from "react-icons/bi";
import Avatar from "../Data Display/Avatar";
import Badge from "../Data Display/Badge";

const TaskItem = ({
  title,
  priority,
  description,
  subTasks,
  createdAt,
  responsable,
}: Itask) => {
  const { data } = useGetUsers();

  const [dropDown, setDropdown] = useState<boolean>(false);
  const options = ["editar", "excluir"];

  const userData = data?.find((user: IUser) => user.email === responsable);

  return (
    <div className="my-[20px]">
      <div className="flex items-center justify-between">
        {priority ? <Badge text={priority} /> : <span />}
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
      {subTasks && (
        <>
          <h5 className="font-semibold text-lg mt-[20px]">Subtarefas</h5>
          <ul>
            {subTasks?.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
        </>
      )}
      <div className="flex items-center justify-between mt-[20px]">
        <p className="text-neutral-400">
          {moment(createdAt).locale("pt").format("ll")}
        </p>
        <div>
          <BiComment size={20} />
          {responsable && (
            <Avatar
              image={userData?.image}
              alt="imagem do responsavel pela tareda"
            />
          )}
        </div>
      </div>
      <hr className="mt-[20px]" />
    </div>
  );
};

export default TaskItem;
