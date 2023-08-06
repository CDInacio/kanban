"use client";

import api from "@/app/services/api";
import { useMutation, useQueryClient } from "react-query";

const completeTask = async (data: any) => {
  const response = await api.put(`task/completeTask/`, { data });
  return response;
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
