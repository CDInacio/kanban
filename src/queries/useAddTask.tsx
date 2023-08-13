"use client";

import { useMutation, useQueryClient } from "react-query";

const addTask = async (task: any) => {
  const resposne = await fetch("http://localhost:3000/api/task/addTask", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return resposne.json();
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      return "success";
    },
  });
};

export default useAddTask;
