import { Itask } from "@/@types/task";
import { useTaskContext } from "@/context/taskContext";
import { useEffect, useState } from "react";
import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Todo = () => {
  const [todo, setTodo] = useState<Itask[]>([]);
  const { tasks } = useTaskContext();

  useEffect(() => {
    const doing = tasks.filter((task) => {
      if (task.status === "fazer") {
        return task;
      }
    });
    setTodo(doing);
  }, [tasks]);

  return (
    <div className="flex-1">
      <h2 className="text-slate-800 text-2xl font-bold">A Fazer</h2>
      <Card>
        {todo.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            createdAt={task.createdAt}
          />
        ))}
      </Card>{" "}
    </div>
  );
};

export default Todo;
