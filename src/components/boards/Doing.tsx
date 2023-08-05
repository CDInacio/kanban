import { Itask } from "@/@types/task";
import { useTaskContext } from "@/context/taskContext";
import { useEffect, useState } from "react";
import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Doing = () => {
  const [data, setData] = useState<Itask[]>([]);
  const { tasks } = useTaskContext();

  useEffect(() => {
    const doing = tasks.filter((task) => {
      if (task.status === "fazendo") {
        return task;
      }
    });
    setData(doing);
  }, [tasks]);

  return (
    <div className="flex-1 ">
      <h2 className="text-2xl font-bold text-slate-800">Fazendo</h2>
      {data.length !== 0 && (
        <Card>
          {data.map((item, i) => (
            <TaskItem
              key={i}
              title={item.title}
              subTasks={item.subTasks}
              createdAt={item.createdAt}
            />
          ))}
        </Card>
      )}
    </div>
  );
};

export default Doing;
