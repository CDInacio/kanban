"use client";

import { TaskI } from "@/@types/task";
import useGetTasks from "@/queries/useGetTasks";
import { useEffect, useState } from "react";
import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Doing = () => {
  const [doing, setDoing] = useState<TaskI[]>([]);

  const { data } = useGetTasks();

  useEffect(() => {
    const doing = data?.data.filter((task: any) => {
      if (task.status === "fazendo") {
        return task;
      }
    });
    setDoing(doing);
  }, [data]);

  return (
    <div className="flex-1 ">
      <h2 className="text-2xl font-bold text-slate-800">Fazendo</h2>
      {doing?.length !== 0 && (
        <Card>
          {doing?.map((item: TaskI, i: number) => (
            <TaskItem
              key={item._id}
              _id={item._id}
              title={item.title}
              subTasks={item.subTasks}
              responsable={item.responsable}
              priority={item.priority}
              createdAt={item.createdAt}
              description={item.description}
              deadline={item.deadline}
            />
          ))}
        </Card>
      )}
    </div>
  );
};

export default Doing;
