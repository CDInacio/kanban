"use client";

import { CommentI } from "@/@types/task";
import { useMutation, useQueryClient } from "react-query";

const addComment = async (data: CommentI) => {
  await fetch("http://localhost:3000/api/task/addComment", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
};

export default useAddComment;
