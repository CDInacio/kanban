"use client";

import { useMutation, useQueryClient } from "react-query";

const completeTask = async (data: any) => {
  await fetch("http://localhost:3000/api/task/completeTask", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

const useCompleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(completeTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
};

export default useCompleteTask;
