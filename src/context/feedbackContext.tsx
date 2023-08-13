"use client";

// import useGetTasks from "@/queries/usegetTasks";
import React, { useState } from "react";

interface FeddbackI {
  message: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  setIsError: () => {},
  setIsSuccess: () => {},
  setMessage: () => {},
  setIsLoading: () => {},
};

const FeedbackContext = React.createContext<FeddbackI>(initialState);

export const useFeedbackContext = () => React.useContext(FeedbackContext);

export const FeedbackContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  let value = {
    isError,
    isSuccess,
    isLoading,
    message,
    setIsError,
    setIsSuccess,
    setMessage,
    setIsLoading,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};
