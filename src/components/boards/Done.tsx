import { useTaskContext } from "@/context/taskContext";
import Card from "../Surfaces/Card";

const Done = () => {
  const { tasks } = useTaskContext();

  return (
    <div className=" flex-1 ">
      <h2 className="text-slate-800 text-2xl font-bold">Feito</h2>
      <Card>das</Card>
    </div>
  );
};

export default Done;
