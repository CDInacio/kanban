import { Itask } from "@/@types/task";
import useGetTasks from "@/queries/usegetTasks";
import { useEffect, useState } from "react";
import Card from "../Surfaces/Card";
import TaskItem from "./TaskItem";

const Doing = () => {
  const [doing, setDoing] = useState<Itask[]>([]);
  const { data } = useGetTasks();
  console.log(data);

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
          {doing?.map((item, i) => (
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

export default Doing;
