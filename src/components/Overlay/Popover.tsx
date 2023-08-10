"use client";

import { Itask } from "@/@types/task";
import { IUser } from "@/@types/user";
import { isObjectEmpty } from "@/helpers/isEmpty";
import useAddTask from "@/queries/useAddTask";
import useGetUsers from "@/queries/useGetUsers";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosClose } from "react-icons/io";
import "react-tagsinput/react-tagsinput.css";
import TextInput from "../Forms/TextInput";
import Subtask from "../SubTasks/Subtask";
import Modal from "../Utils/Modal";

interface PopoverProps {
  handleToggle: () => void;
}

const status = ["fazer", "fazendo", "feito"];
const priority = ["Baixo", "Médio", "Alto", "Urgente"];

const Popover = ({ handleToggle }: PopoverProps) => {
  const [mode, setMode] = useState<"details" | "subtask">("details");
  const [deadline, setDeadline] = useState(new Date());
  const [select, setSelect] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [task, setTask] = useState<Itask>({
    title: "",
    description: "",
  });

  const handleDeadline = (data: any) => {
    setSelect(true);
    setDeadline(data);
  };

  const [subTasks, setSubTask] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const { data } = useGetUsers();
  const { mutate } = useAddTask();

  const handleAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value;
      if (type === "tag") {
        setTags((prev) => [
          ...prev,
          { text: inputValue, id: Math.floor(Math.random() * 1000) },
        ]);
      } else if (type === "subtask") {
        setSubTask((prev) => [
          ...prev,
          {
            text: inputValue,
            id: Math.floor(Math.random() * 1000),
            done: false,
          },
        ]);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tag));
  };

  // useEffect(() => {
  //   if (tags.length !== 0) setTask((prev) => ({ ...prev, tags }));
  //   if (subTasks.length !== 0) setTask((prev) => ({ ...prev, subTasks }));
  //   if (select) {
  //     setTask((prev) => ({
  //       ...prev,
  //       deadline,
  //     }));
  //   }
  // }, [tags, subTasks, deadline]);

  const handleAddTask = () => {
    let newTask = {
      ...task,
    };

    if (tags.length > 0) {
      newTask.tags = tags;
    }

    if (subTasks.length > 0) {
      newTask.subTasks = subTasks;
    }

    if (select) {
      newTask.deadline = deadline;
    }
    mutate(newTask);
    // handleToggle();
  };

  const handleCancel = () => {
    if (!isObjectEmpty(task)) {
      if (confirm("Deseja cancelar? Os dados serão perdidos.")) {
        handleToggle();
      }
    }
    handleToggle();
  };

  return (
    <>
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
            Subtarefas ({subTasks.length})
          </p>
        </header>
        <hr className="mb-[20px]" />
        {mode === "details" ? (
          <>
            <div className="flex gap-[20px] ">
              <div className="w-2/3">
                <div className="flex flex-col">
                  <label htmlFor="title" className="font-semibold">
                    Titulo *
                  </label>
                  <TextInput
                    onChange={(e) =>
                      setTask((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                    className="mb-[20px]"
                    id="title"
                    value={task.title}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="font-semibold">
                    Descrição *
                  </label>
                  <textarea
                    value={task.description}
                    onChange={(e) =>
                      setTask((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="mb-[20px] min-h-[150px] border-[1px] border-neutral-200 rounded-md  py-[10px] px-[20px] focus:border-2 focus:border-neutral-800 transition ease-out duration-300"
                    id="description"
                  />
                </div>
              </div>
              <div className="w-1/3">
                <label htmlFor="description " className="font-semibold">
                  Tags
                </label>
                <div className="flex flex-wrap border-[1px] border-neutral-200 rounded-md items-center">
                  {tags.map((tag: any, i) => (
                    <div
                      key={tag + i}
                      className="bg-neutral-800 text-sm rounded-xl pl-[10px] flex w-fit items-center justify-center text-white mr-[10px]"
                    >
                      <span>{tag.text}</span>
                      <button onClick={() => handleRemoveTag(tag)}>
                        <IoIosClose size={30} />
                      </button>
                    </div>
                  ))}
                  <input
                    onKeyDown={(e) => handleAdd(e, "tag")}
                    className="p-[10px]"
                    id="tags"
                  />
                </div>
                <div className="flex gap-[20px] mt-[20px]">
                  <div className="flex-1 ">
                    <label
                      htmlFor="user"
                      className="mb-2 font-semibold text-gray-900 "
                    >
                      Atribuir para
                    </label>

                    <select
                      onChange={(e) =>
                        setTask((prev) => ({
                          ...prev,
                          responsable: e.target.value,
                        }))
                      }
                      value={task.responsable}
                      id="user"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
                    >
                      <option value="" disabled selected>
                        Selecione uma opção
                      </option>
                      {data?.map((user: IUser) => (
                        <option key={user._id} value={user.email}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="status"
                      className="mb-2 font-semibold text-gray-900 "
                    >
                      Status
                    </label>
                    <select
                      onChange={(e) =>
                        setTask((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      value={task.status}
                      id="status"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
                    >
                      <option value="" disabled selected>
                        Selecione uma opção
                      </option>
                      {status?.map((el: any, i) => (
                        <option key={`${el + i}`} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-[20px] mt-[20px]">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="deadline"
                      className="mb-2 font-semibold text-gray-900 "
                    >
                      Prazo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={select ? deadline.toLocaleDateString() : ""}
                        readOnly
                        className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block p-2.5 pr-10" // Estilo do input
                        onClick={() => setShowCalendar((prev) => !prev)} // Ao clicar no input, abre/fecha o calendário
                      />
                      {showCalendar && (
                        <div className="absolute top-full left-0 mt-2 z-[1000]">
                          <Calendar
                            onChange={handleDeadline}
                            value={deadline}
                          />{" "}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="priority"
                      className="mb-2 font-semibold text-gray-900 "
                    >
                      Prioridade
                    </label>
                    <select
                      onChange={(e) =>
                        setTask((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      value={task.priority}
                      id="user"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
                    >
                      <option value="" disabled selected>
                        Selecione uma opção
                      </option>
                      {priority?.map((el: string, i) => (
                        <option key={`${el + i}`} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-[20px]">
              <button
                className="bg-blue-500 hover:bg-blue-600 w-[100px] py-[5px]  rounded text-white transition ease-out duration-300"
                onClick={handleAddTask}
              >
                Criar
              </button>
              <button
                className="bg-red-500  hover:bg-red-600 w-[100px] py-[5px]  rounded text-white transition ease-out duration-300s"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <TextInput
              onKeyDown={(e) => handleAdd(e, "subtask")}
              className="w-full"
            />
            {subTasks.map((sub: any, i) => (
              <Subtask key={i} text={sub.text} />
            ))}
          </>
        )}
      </Modal>
    </>
  );
};

export default Popover;
