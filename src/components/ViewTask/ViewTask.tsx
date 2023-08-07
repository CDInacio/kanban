"use client";
import { IsubTask, Itask } from "@/@types/task";
import useCompleteTask from "@/queries/useCompleteTask";
import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";
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
}: ViewTaskProps) => {
  const [mode, setMode] = useState<"details" | "subtask">("details");
  const { mutate } = useCompleteTask();

  const handleCompleteTask = (subId: number, taskId: string | undefined) => {
    const data = {
      subId,
      taskId,
    };
    mutate(data);
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
          Subtarefas ({doneCount}/
          {subTasks === undefined ? 0 : subTasks?.length})
        </p>
      </header>
      {mode === "details" ? (
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">{title}</h2>
          <p className="text-neutral-400">
            {" "}
            {moment(createdAt).locale("pt").format("ll")}
          </p>
          <p className="text-neutral-600 font-medium mt-[10px]">
            {description}
          </p>
        </div>
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
