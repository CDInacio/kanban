"use client";

import { TaskI } from "@/@types/task";
import useGetTasks from "@/queries/useGetTasks";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Todo = () => {
  const [todo, setTodo] = useState<TaskI[]>([]);

  const { data, isLoading } = useGetTasks();

  useEffect(() => {
    const todo = data?.filter((task: any) => {
      if (task.status === "fazer" || task.status === undefined) {
        return task;
      }
    });
    setTodo(todo);
  }, [data]);

  return (
    <div className="flex-1">
      <div className="flex items-center font-bold">
        <h2 className="text-2xl text-white">A Fazer</h2>
      </div>
      {isLoading ? (
        <p className="font-medium text-white">Carregando informações...</p>
      ) : (
        todo?.length !== 0 && (
          <Card>
            {todo?.map((item: TaskI, i: number) => (
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

export default Todo;
