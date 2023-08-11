import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";

import { Itask } from "@/@types/task";
import { IUser } from "@/@types/user";
import useGetUsers from "@/queries/useGetUsers";
import useRemoveTask from "@/queries/useRemoveTask";

import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  TbCalendarTime,
  TbClipboard,
  TbClipboardText,
  TbSubtask,
} from "react-icons/tb";
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
  deadline,
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
        {/* {subTasks && (
          <div className="flex items-center  mt-[20px]">
            <h5 className="text-lg font-semibold ">Subtarefas</h5>
            <p className="ml-[10px]">{subTasks.length}</p>
          </div>
        )} */}
        <div className="flex items-center justify-between mt-[20px]">
          <div className="flex items-center justify-between rounded">
            <TbCalendarTime size={20} />
            <p className="text-neutral-400 ml-[5px]">
              {moment(deadline).format("D MMM")}
            </p>
          </div>
          <div className="flex items-center">
            {responsable && (
              <Tooltip text={userData?.name}>
                <Avatar
                  className="h-[35px] w-[35px]"
                  image={userData?.image}
                  alt="imagem do responsavel pela tareda"
                />
              </Tooltip>
            )}
            <div className="flex items-center">
              <Tooltip text="Comentários">
                <div className="flex items-center">
                  <span className="ml-[5px] text-neutral-900">
                    {comments ? comments.length : 0}
                  </span>
                  <span className="cursor-pointer">
                    {comments ? (
                      <TbClipboardText color="black" size={20} />
                    ) : (
                      <TbClipboard color="black" size={20} />
                    )}
                  </span>
                </div>
              </Tooltip>
              {subTasks && (
                <Tooltip text="Subtarefas">
                  <div className="flex items-center">
                    <span className="ml-[5px] text-neutral-900">
                      {subTasks.length}
                    </span>
                    <span>
                      <TbSubtask color="black" size={20} />
                    </span>
                  </div>
                </Tooltip>
              )}
            </div>
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
            deadline={deadline}
          />
        </>
      )}
    </>
  );
};

export default TaskItem;
