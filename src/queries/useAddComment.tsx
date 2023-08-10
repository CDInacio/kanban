"use client";

import { CommentI } from "@/@types/task";
import api from "@/app/services/api";
import { useMutation, useQueryClient } from "react-query";

const addComment = async (data: CommentI) => {
  await api.post("task/addComment", data);
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
