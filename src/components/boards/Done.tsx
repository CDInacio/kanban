import { Itask } from "@/@types/task";
import { useTaskContext } from "@/context/taskContext";
import { useState } from "react";
import Card from "../Surfaces/Card";

const Done = () => {
  const [data, setData] = useState<Itask[]>([]);

  const { tasks } = useTaskContext();

  return (
    <div className="flex-1 ">
      <h2 className="text-2xl font-bold text-slate-800">Feito</h2>
      {data.length !== 0 && <Card></Card>}
    </div>
  );
};

export default Done;
