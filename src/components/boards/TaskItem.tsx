import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";

import { Itask } from "@/@types/task";
import { IUser } from "@/@types/user";
import useGetUsers from "@/queries/useGetUsers";
import useRemoveTask from "@/queries/useRemoveTask";
import { BiComment, BiDotsVerticalRounded } from "react-icons/bi";
import Avatar from "../Data Display/Avatar";
import Badge from "../Data Display/Badge";
import Tooltip from "../Data Display/ToolTip";
import ViewTask from "../ViewTask/ViewTask";

const TaskItem = ({
  _id,
  title,
  priority,
  description,
  subTasks,
  createdAt,
  responsable,
  comments,
}: Itask) => {
  const { mutate } = useRemoveTask();
  const { data } = useGetUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"details" | "subtask">("details");

  const [dropDown, setDropdown] = useState<boolean>(false);
  const options = ["editar", "excluir"];

  const userData = data?.find((user: IUser) => user.email === responsable);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOption = (option: string) => {
    if (option === "excluir") {
      mutate(_id);
    }
  };

  return (
    <>
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
                    <span
                      onClick={() =>
                        handleOption(opt === "editar" ? "editar" : "excluir")
                      }
                    >
                      {opt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </span>
        </div>
        <h4
          onClick={handleToggle}
          className="text-xl text-slate-800 font-bold mt-[10px] cursor-pointer"
        >
          {title}
        </h4>
        {subTasks && (
          <>
            <h5 className="font-semibold text-lg mt-[20px]">Subtarefas</h5>
            <ul>
              {subTasks?.map((el: any, i) => (
                <li key={el + i}>{el.text}</li>
              ))}
            </ul>
          </>
        )}
        <div className="flex items-center justify-between mt-[20px]">
          <p className="text-neutral-400">
            {moment(createdAt).locale("pt").format("ll")}
          </p>
          <div className="flex items-center gap-[20px]">
            {responsable && (
              <Tooltip text={userData?.name}>
                <Avatar
                  className="h-[35px] w-[35px]"
                  image={userData?.image}
                  alt="imagem do responsavel pela tareda"
                />
              </Tooltip>
            )}
            <BiComment size={20} />
          </div>
        </div>
        <hr className="mt-[20px]" />
      </div>
      {isOpen && (
        <>
          <ViewTask
            _id={_id}
            handleToggle={handleToggle}
            title={title}
            description={description}
            createdAt={createdAt}
            responsable={responsable}
            subTasks={subTasks}
            priority={priority}
            comments={comments}
          />
        </>
      )}
    </>
  );
};

export default TaskItem;
