"use client";

import { IUser } from "@/@types/user";
import useAddTask from "@/queries/useAddTask";
import useGetUsers from "@/queries/useGetUsers";
import { useState } from "react";
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

const status = ["fazer", "fazendo", "feito"];

const Popover = ({ handleToggle }: PopoverProps) => {
  const [task, setTask] = useState({});
  const [tags, setTags] = useState<TagI[]>([]);
  const { data } = useGetUsers();

  const { mutate } = useAddTask();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value;
      setTags((prev) => [
        ...prev,
        { tagName: inputValue, id: Math.floor(Math.random() * 1000) },
      ]);
      setTask((prev) => ({ ...prev, tags }));
      (e.target as HTMLInputElement).value = "";
    }
  };
  const handleRemoveTag = (tagId: number) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const handleAddTask = () => {
    mutate(task);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
      ></div>
      <div className="absolute flex flex-col left-0 right-0 z-20 p-[50px] mx-auto bg-white w-[900px] border border-gray-200 rounded shadow top-10">
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
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
            className="mb-[20px] border-[1px] border-neutral-200 rounded-md  py-[10px] px-[20px] focus:border-2 focus:border-neutral-800 transition ease-out duration-300"
            id="description"
          />
        </div>
        <label htmlFor="description " className="font-semibold">
          Tags
        </label>
        <div className="flex border-[1px] border-neutral-200 rounded-md items-center">
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
          <input onKeyDown={handleAddTag} className="p-[10px]" id="tags" />
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
                setTask((prev) => ({ ...prev, responsable: e.target.value }))
              }
              id="user"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
            >
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
              id="status"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 "
            >
              {status?.map((el: any, i) => (
                <option key={`${el + i}`} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleAddTask}>Go</button>
      </div>
    </>
  );
};

export default Popover;
