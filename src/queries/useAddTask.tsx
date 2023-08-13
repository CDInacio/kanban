"use client";

import { useMutation, useQueryClient } from "react-query";

const addTask = async (task: any) => {
  const response = await fetch("http://localhost:3000/api/task/addTask", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return response.json();
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onSuccess: () => Promise.all([queryClient.invalidateQueries("tasks")]),
  });
};

export default useAddTask;
