"use client";

import { IUser } from "@/@types/user";
import { isObjectEmpty } from "@/helpers/isEmpty";
import useAddTask from "@/queries/useAddTask";
import useGetUsers from "@/queries/useGetUsers";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { IoIosClose } from "react-icons/io";
import "react-tagsinput/react-tagsinput.css";
import TextInput from "../Forms/TextInput";
interface PopoverProps {
  handleToggle: () => void;
}

interface TagI {
  tagName: string;
  id: number;
}

interface SubTaskI {
  title: string;
  id: number;
}

const status = ["fazer", "fazendo", "feito"];
const priority = ["Baixo", "Médio", "Alto", "Urgente"];

const Popover = ({ handleToggle }: PopoverProps) => {
  const [mode, setMode] = useState<"details" | "subtask">("details");

  const [task, setTask] = useState({});
  const [subTask, setSubTask] = useState<SubTaskI[]>([]);
  const [tags, setTags] = useState<TagI[]>([]);
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
          { tagName: inputValue, id: Math.floor(Math.random() * 1000) },
        ]);
        setTask((prev) => ({ ...prev, tags }));
        (e.target as HTMLInputElement).value = "";
      } else if (type === "subtask") {
        setSubTask((prev) => [
          ...prev,
          { title: inputValue, id: Math.floor(Math.random() * 1000) },
        ]);
        setTask((prev) => ({ ...prev, subTask }));
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const handleRemoveTag = (tagId: number) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const handleAddTask = () => {
    setTask({});
    setSubTask([]);
    setTags([]);
    mutate(task);
    handleToggle();
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
      <div
        onClick={handleToggle}
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
      ></div>
      <div className="absolute flex flex-col p-[30px]  left-0 right-0 z-20 overflow-hidden  mx-auto bg-white w-[1100px] min-h-[400px] border border-gray-200 rounded shadow top-10">
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
            Subtarefas
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
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="font-semibold">
                    Descrição *
                  </label>
                  <textarea
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
                  {tags.map((tag: TagI) => (
                    <div
                      key={tag.id}
                      className="bg-neutral-800 text-sm rounded-xl pl-[10px] flex w-fit items-center justify-center text-white mr-[10px]"
                    >
                      <span>{tag.tagName}</span>
                      <button onClick={() => handleRemoveTag(tag.id)}>
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
                      className=" mb-2  text-gray-900 font-semibold"
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
                      id="user"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
                    >
                      <option value="" disabled selected>
                        Selecione uma opção
                      </option>
                      {data?.map((user: IUser) => (
                        <option key={user._id} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="status"
                      className=" mb-2  text-gray-900 font-semibold"
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
                      id="status"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
                    >
                      <option value="" disabled selected>
                        Selecione uma opção
                      </option>
                      {status?.map((el: any, i) => (
                        <>
                          <option key={`${el + i}`} value={el}>
                            {el}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-[20px] mt-[20px]">
                  <div className="flex flex-col  w-1/2">
                    <label
                      htmlFor="deadline"
                      className=" mb-2  text-gray-900 font-semibold"
                    >
                      Prazo
                    </label>
                    <TextInput id="deadline" className="" />
                  </div>
                  <div className="flex flex-col  w-1/2">
                    <label
                      htmlFor="priority"
                      className=" mb-2  text-gray-900 font-semibold"
                    >
                      Prioridade
                    </label>
                    <select
                      onChange={(e) =>
                        setTask((prev) => ({
                          ...prev,
                          responsable: e.target.value,
                        }))
                      }
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
          <div>
            <TextInput
              onKeyDown={(e) => handleAdd(e, "subtask")}
              className="w-full"
            />
            {subTask.map((sub: SubTaskI) => (
              <div
                key={sub.id}
                className="bg-neutral-100 mb-[10px] p-[10px] rounded mt-[20px] flex items-center gap-[20px]"
              >
                <input
                  type="checkbox"
                  className="appearance-none w-6 h-6 rounded border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <p>{sub.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Popover;
