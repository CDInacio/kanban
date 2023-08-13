"use client";

import api from "@/app/services/api";
import { useMutation, useQueryClient } from "react-query";

const addUpdateTask = async (task: any) => {
  await api.put("task/updateTask", task);
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addUpdateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
};

export default useUpdateTask;
