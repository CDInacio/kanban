"use client";

import { useMutation, useQueryClient } from "react-query";

const addTask = async (task: any) => {
  await fetch("http://localhost:3000/api/task/addTask", {
    method: "POST",
    body: JSON.stringify(task),
  });
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries("tasks"),
        queryClient.invalidateQueries("todo"),
      ]),
  });
};

export default useAddTask;
