"use client";
import { CommentI, IsubTask, TaskI } from "@/@types/task";
import useAddComment from "@/queries/useAddComment";
import useCompleteTask from "@/queries/useCompleteTask";
import moment from "moment";
import "moment/locale/pt-br";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Avatar from "../Data Display/Avatar";
import Devider from "../Data Display/Devider";
import Subtask from "../SubTasks/Subtask";
import Modal from "../Utils/Modal";

type ViewTaskProps = TaskI & {
  handleToggle: () => void;
};

interface SubTaskItem {
  id: number; // Assuming 'id' is of type number
  text: string;
  done: boolean;
}

const ViewTask = ({
  handleToggle,
  _id,
  title,
  priority,
  description,
  subTasks,
  createdAt,
  responsable,
  comments,
  deadline,
}: ViewTaskProps) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");
  const [mode, setMode] = useState<"details" | "subtask">("details");

  const { mutate: taskMutation } = useCompleteTask();
  const {
    mutate: commentMutation,
    isLoading,
    isSuccess,
    data,
  } = useAddComment();

  const handleAddComment = () => {
    let newComment: CommentI = {
      id: Math.floor(Math.random() * 1000),
      text: comment,
      author: {
        name: session?.user?.name,
        image: session?.user?.image,
      },
      createdAt: new Date().toISOString(),
      taskId: _id,
    };
    commentMutation(newComment);
  };

  const handleCompleteTask = (subId: number, taskId: string | undefined) => {
    const data = {
      subId,
      taskId,
    };
    taskMutation(data);
  };

  const doneCount = subTasks?.filter(
    (sub: IsubTask) => sub.done === true
  ).length;

  return (
    <Modal handleToggle={handleToggle}>
      <header className="mb-[20px] text-xl flex">
        <p
          onClick={() => setMode("details")}
          className={` ${
            mode === "details"
              ? "font-bold text-neutral-800"
              : "text-neutral-300"
          } cursor-pointer`}
        >
          Detalhes
        </p>
        <p
          onClick={() => setMode("subtask")}
          className={`mx-[20px]  ${
            mode === "subtask"
              ? "font-bold text-neutral-800"
              : "text-neutral-300"
          }  cursor-pointer`}
        >
          Subtarefas ({doneCount ? doneCount : 0}/
          {subTasks === undefined ? 0 : subTasks?.length})
        </p>
      </header>
      <Devider />
      {mode === "details" ? (
        <>
          <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
          <p className="text-sm text-neutral-500">
            {moment(deadline).locale("pt").format("ll")}
          </p>
          <p className="text-neutral-600 font-medium mt-[10px]">
            {description}
          </p>
          <div className="mt-[20px]">
            <p className="text-3xl font-bold">
              {comments === undefined ? 0 : comments?.length}
            </p>
            <h2 className="text-lg font-medium text-neutral-500 mb-[10px]">
              Comentário(s)
            </h2>
            <Devider />
            <div className="flex justify-between">
              <Avatar image={session?.user?.image} alt="user image" />
              <div className="w-[92%] flex flex-col ml-[20px] ">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="p-[10px] border-[1px] border-neutral-300 rounded-md  min-h-[150px] focus:border-2 focus:border-neutral-800 transition ease-out duration-300"
                />
                <button
                  disabled={isLoading}
                  className={`rounded p-[10px] text-white  text-lg mt-[10px] ${
                    isLoading
                      ? "bg-neutral-400"
                      : " bg-neutral-800 hover:bg-neutral-900"
                  }  transition ease-out duration-300`}
                  onClick={handleAddComment}
                >
                  Postar
                </button>
              </div>
            </div>
            <div className="mt-[20px] max-h-[230px] overflow-y-scroll p-[5px]">
              {comments?.map((comment: CommentI) => (
                <div key={comment.id} className="">
                  <div className="flex mb-[20px] items-start">
                    <Avatar
                      image={comment.author.image}
                      alt="image of the person who made the comment"
                    />
                    <div className="flex flex-col ml-[20px] ">
                      <h5 className="text-xl font-bold">
                        {comment.author.name}
                      </h5>
                      {/* <p className="text-sm text-neutral-500">
                      {moment(comment.createdAt).locale("pt").format("ll")}
                    </p> */}
                      <p className="">{comment.text}</p>
                    </div>
                  </div>
                  <Devider />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          {subTasks === undefined ? (
            <p>Não há subtarefas</p>
          ) : (
            <>
              {subTasks.map((sub: any) => (
                <Subtask
                  key={sub.id}
                  done={sub.done}
                  handleCompleteTask={() => handleCompleteTask(sub.id, _id)}
                  text={sub.text}
                />
              ))}
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ViewTask;
