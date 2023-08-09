import { Itask } from "@/@types/task";
import useGetTasks from "@/queries/usegetTasks";
import { useEffect, useState } from "react";

import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Todo = () => {
  const [todo, setTodo] = useState<Itask[]>([]);
  const { data } = useGetTasks();

  useEffect(() => {
    const doing = data?.data.filter((task: any) => {
      if (task.status === "fazer" || task.status === undefined) {
        return task;
      }
    });
    setTodo(doing);
  }, [data]);

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-slate-800">A Fazer</h2>
      {todo?.length !== 0 && (
        <Card>
          {todo?.map((item, i) => (
            <TaskItem
              _id={item._id}
              key={i}
              title={item.title}
              subTasks={item.subTasks}
              responsable={item.responsable}
              priority={item.priority}
              createdAt={item.createdAt}
              description={item.description}
            />
          ))}
        </Card>
      )}
    </div>
  );
};

export default Todo;
