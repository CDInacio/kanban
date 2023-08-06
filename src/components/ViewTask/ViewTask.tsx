"use client";
import { Itask } from "@/@types/task";
import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";
import Modal from "../Utils/Modal";

type ViewTASKProps = Itask & {
  handleToggle: () => void;
};

const ViewTask = ({
  handleToggle,
  title,
  priority,
  description,
  subTasks,
  createdAt,
  responsable,
}: ViewTASKProps) => {
  const [mode, setMode] = useState<"details" | "subtask">("details");

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
          Subtarefas (0/{subTasks?.length})
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
        <div>subtasks</div>
      )}
    </Modal>
  );
};

export default ViewTask;
