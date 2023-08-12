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
}: TaskI) => {
  const { mutate } = useRemoveTask();
  const { data } = useGetUsers();
  const [isOpen, setIsOpen] = useState(false);

  const [dropDown, setDropdown] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
            <div className="absolute  top-[40px] bg-white shadow-sm z-50 ">
              <div className="py-[10px] px-[20px] flex flex-col gap-5  transition ease-out duration-300 cursor-pointer">
                <span
                  className=" hover:bg-neutral-100"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </span>
                <span onClick={handleDelete}>Excluir</span>
              </div>
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
            <div className="flex items-center">
              <MdOutlineTimer size={20} />
              <p className="text-neutral-400 ml-[5px]">
                {moment(deadline).format("D MMM")}
              </p>
            </div>
          ) : (
            <span />
          )}
          <div className="flex items-center">
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
      {isEditing && <Popover handleToggle={() => {}} />}
    </>
  );
};

export default TaskItem;
