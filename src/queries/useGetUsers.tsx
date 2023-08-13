"use client";

import { useQuery } from "react-query";

const getUsers = async () => {
  const response = await fetch("http://localhost:3000/api/user/allUsers", {
    next: {
      revalidate: 60,
    },
  });
  return response.json();
};

const useGetUsers = () => {
  return useQuery(["users"], getUsers, {
    refetchOnWindowFocus: false,
  });
};

export default useGetUsers;
