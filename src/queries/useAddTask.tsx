"use client";

import api from "@/app/services/api";
import { useMutation, useQueryClient } from "react-query";

const addTask = async (task: any) => {
  await api.post("task/addTask", task);
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
};

export default useAddTask;
