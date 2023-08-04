"use client";

import api from "@/app/services/api";
import { useQuery } from "react-query";

const getUsers = async () => {
  const response = await api.get("user/allUsers");
  return response.data;
};

const useGetUsers = () => {
  return useQuery(["users"], getUsers, {
    refetchOnWindowFocus: false,
  });
};

export default useGetUsers;
