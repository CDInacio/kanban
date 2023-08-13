"use client";

import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";

import { TaskI } from "@/@types/task";
import { IUser } from "@/@types/user";
import useGetUsers from "@/queries/useGetUsers";
import useRemoveTask from "@/queries/useRemoveTask";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbClipboard, TbClipboardText, TbSubtask } from "react-icons/tb";

import { MdOutlineTimer } from "react-icons/md";
import Avatar from "../Data Display/Avatar";
import Badge from "../Data Display/Badge";
import Tooltip from "../Data Display/ToolTip";
import Popover from "../Overlay/Popover";
import ViewTask from "../ViewTask/ViewTask";

const options = ["editar", "excluir"];
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
  tags,
  status,
}: TaskI) => {
  const { mutate } = useRemoveTask();
  const { data } = useGetUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const [dropDown, setDropdown] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

  const userData = data?.find((user: IUser) => user.email === responsable);
  let orderComments = comments?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    mutate(_id);
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  let editProps = {
    _id,
    title,
    priority,
    description,
    subTasks,
    createdAt,
    responsable,
    comments,
    deadline,
    tags,
    status,
  };
  return (
    <>
      <div className="my-[20px]  min-h-[220px] flex flex-col justify-center relative">
        {priority ? (
          <div className="absolute top-0 left-0">
            <Badge text={priority} />{" "}
          </div>
        ) : (
          <span />
        )}
        <span
          onClick={() => setDropdown((prev) => !prev)}
          className="absolute right-0 top-0 hover:bg-neutral-100 cursor-pointer rounded-full h-[35px] w-[35px] flex items-center justify-center"
        >
          <BiDotsVerticalRounded size={25} />
          {dropDown && (
            <div className="absolute bg-white top-[40px] shadow-sm z-50 ">
              {options.map((opt, i) => (
                <div
                  key={`${opt + i}`}
                  className="py-[10px] px-[20px] hover:bg-neutral-100 transition ease-out duration-300 cursor-pointer"
                >
                  <span
                    onClick={() =>
                      opt === "editar" ? togglePopover() : handleDelete()
                    }
                  >
                    {opt}
                  </span>
                </div>
              ))}
            </div>
          )}
        </span>
        <h4
          onClick={handleToggle}
          className="text-xl text-neutral-800 font-bold mt-[20px] cursor-pointer"
        >
          {title}
        </h4>

        {responsable && (
          <div className="w-fit mt-[15px]">
            <Tooltip text={userData?.name}>
              <Avatar
                className="h-[35px] w-[35px]"
                image={userData?.image}
                alt="imagem do responsavel pela tareda"
              />
            </Tooltip>
          </div>
        )}
        <div className="flex items-center justify-between mt-[20px]">
          {deadline ? (
            <div className="absolute bottom-0 left-0 flex items-center">
              <MdOutlineTimer size={20} />
              <Tooltip text="Prazo">
                <p className="text-neutral-400">
                  {moment(deadline).format("D MMM")}
                </p>
              </Tooltip>
            </div>
          ) : (
            <span />
          )}
          <div className="flex items-center">
            <div className="absolute bottom-0 right-0 flex items-center ">
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
              <Tooltip text="Subtarefas">
                <div className="flex items-center">
                  <span className="ml-[5px] text-neutral-900">
                    {subTasks ? subTasks.length : 0}
                  </span>
                  <span>
                    <TbSubtask color="black" size={20} />
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-[20px]" />
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
            comments={orderComments}
            deadline={deadline}
          />
        </>
      )}
      {showPopover && (
        <div className="relative">
          <Popover isEditing handleToggle={togglePopover} {...editProps} />
        </div>
      )}
    </>
  );
};

export default TaskItem;
