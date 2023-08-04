"use client";

import { Itask } from "@/@types/task";
import useGetTasks from "@/queries/usegetTasks";
// import useGetTasks from "@/queries/usegetTasks";
import React, { useEffect } from "react";

interface TaskContexT {
  tasks: Itask[];
}

const initialState: TaskContexT = {
  tasks: [],
};

const TaskContext = React.createContext<TaskContexT>(initialState);

export const useTaskContext = () => React.useContext(TaskContext);

export const TaskContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = React.useState<Itask[]>([]);

  const { data } = useGetTasks();

  useEffect(() => {
    if (data?.data) {
      setTasks(data?.data);
    }
  }, [data]);

  return (
    <TaskContext.Provider value={{ tasks }}>{children}</TaskContext.Provider>
  );
};
