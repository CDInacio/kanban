"use client";

import { useQuery } from "react-query";

const getTasks = async () => {
  const response = await fetch("http://localhost:3000/api/task/allTasks", {
    method: "GET",
    cache: "no-cache",
  });
  return response.json();
};

const useGetTasks = () => {
  return useQuery(["tasks"], getTasks, {
    refetchOnWindowFocus: false,
  });
};

export default useGetTasks;
