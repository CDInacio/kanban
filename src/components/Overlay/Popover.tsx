"use client";

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

const Popover = ({ handleToggle }: PopoverProps) => {
  const [tags, setTags] = useState<TagI[]>([]);

  const handleTagsChange = (newTags: any) => {
    setTags(newTags);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value;
      setTags((prev) => [
        ...prev,
        { tagName: inputValue, id: Math.floor(Math.random() * 1000) },
      ]);
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleRemoveTag = (tagId: number) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
      ></div>
      <div className="absolute flex flex-col left-0 right-0 z-20 p-4 mx-auto bg-white w-[900px] border border-gray-200 rounded shadow top-10">
        <div className="flex flex-col">
          <label htmlFor="title">Titulo *</label>
          <TextInput required className="mb-[20px]" id="title" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Descrição *</label>
          <textarea
            className="mb-[20px] border-[1px] border-neutral-200 rounded-md  py-[10px] px-[20px] focus:border-2 focus:border-neutral-800 transition ease-out duration-300"
            id="description"
          />
        </div>
        <label htmlFor="description">Tags</label>
        <div className="flex border-[1px] border-neutral-200  items-center">
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
            onKeyDown={handleAddTag}
            required
            className="p-[10px]"
            id="tags"
          />
        </div>
      </div>
    </>
  );
};

export default Popover;
