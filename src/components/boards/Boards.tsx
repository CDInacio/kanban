import { useTaskContext } from "@/context/taskContext";
import Doing from "./Doing";
import Done from "./Done";
import Todo from "./Todo";

const Boards = () => {
  const { tasks } = useTaskContext();
  return (
    <div className="flex gap-10 justify-between container mx-auto  mt-[150px]">
      <Todo />
      <Doing />
      <Done />
    </div>
  );
};

export default Boards;
