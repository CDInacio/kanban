"use client";
import { CommentI, IsubTask, Itask } from "@/@types/task";
import useAddComment from "@/queries/useAddComment";
import useCompleteTask from "@/queries/useCompleteTask";
import moment from "moment";
import "moment/locale/pt-br";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Avatar from "../Data Display/Avatar";
import Subtask from "../SubTasks/Subtask";
import Modal from "../Utils/Modal";

type ViewTaskProps = Itask & {
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
}: ViewTaskProps) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");
  const [mode, setMode] = useState<"details" | "subtask">("details");
  const { mutate: taskMutation } = useCompleteTask();
  const { mutate: commentMutation } = useAddComment();
  console.log(comments);
  const handleAddComment = () => {
    let newComment: CommentI = {
      id: Math.floor(Math.random() * 1000),
      text: comment,
      author: {
        name: session?.user?.name,
        Image: session?.user?.image,
      },
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
    <Modal className="top-[30%]" handleToggle={handleToggle}>
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
          Subtarefas ({doneCount}/
          {subTasks === undefined ? 0 : subTasks?.length})
        </p>
      </header>
      <hr className="mb-[20px]" />
      {mode === "details" ? (
        <>
          <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
          <p className="text-neutral-400">
            {moment(createdAt).locale("pt").format("ll")}
          </p>
          <p className="text-neutral-600 font-medium mt-[10px]">
            {description}
          </p>
          <div className="mt-[20px]">
            <p className="text-3xl font-bold">
              {comments === undefined ? 0 : comments?.length}
            </p>
            <h2 className="text-lg font-medium text-neutral-500">
              Comentário(s)
            </h2>
            <hr className="mb-[20px]" />
            <div className="">
              <div className="flex justify-between">
                <Avatar image={session?.user?.image} alt="user image" />
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="p-[10px] border-[1px] border-neutral-300 rounded-md ml-[20px] w-[92%] min-h-[150px] focus:border-2 focus:border-neutral-800 transition ease-out duration-300"
                />
              </div>
              <button onClick={handleAddComment}>Postar</button>
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
