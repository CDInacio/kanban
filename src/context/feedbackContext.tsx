"use client";

// import useGetTasks from "@/queries/usegetTasks";
import React, { useState } from "react";

interface FeddbackI {
  message: string;
  isError: boolean;
  isSuccess: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
  setIsError: () => {},
  setIsSuccess: () => {},
  setMessage: () => {},
};

const FeedbackContext = React.createContext<FeddbackI>(initialState);

export const useFeedbackContext = () => React.useContext(FeedbackContext);

export const FeedbackContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  let value = {
    isError,
    isSuccess,
    message,
    setIsError,
    setIsSuccess,
    setMessage,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};
