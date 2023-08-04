"use client";

import api from "@/app/services/api";
import { useQuery } from "react-query";

const getTasks = async () => {
  const response = await api.get("task/allTasks");
  return response;
};

const useGetTasks = () => {
  return useQuery(["tasks"], getTasks, {
    refetchOnWindowFocus: false,
  });
};

export default useGetTasks;
