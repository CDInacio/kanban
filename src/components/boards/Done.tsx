"use client";

import { TaskI } from "@/@types/task";
import useGetTasks from "@/queries/useGetTasks";
import { useEffect, useState } from "react";
import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Done = () => {
  const [done, setDone] = useState<TaskI[]>([]);

  const { data, isLoading } = useGetTasks();

  useEffect(() => {
    const doing = data?.filter((task: any) => {
      if (task.status === "feito") {
        return task;
      }
    });
    setDone(doing);
  }, [data]);

  return (
    <div className="flex-1 ">
      <h2 className="text-2xl font-bold text-white">Feito</h2>
      {isLoading ? (
        <span />
      ) : (
        done?.length !== 0 && (
          <Card>
            {done?.map((item: TaskI, i: number) => (
              <TaskItem
                key={item._id}
                _id={item._id}
                title={item.title}
                subTasks={item.subTasks}
                responsable={item.responsable}
                priority={item.priority}
                createdAt={item.createdAt}
                description={item.description}
                comments={item.comments}
                deadline={item.deadline}
                status={item.status}
                tags={item.tags}
              />
            ))}
          </Card>
        )
      )}
    </div>
  );
};

export default Done;
