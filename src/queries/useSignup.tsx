import { CredentialsI } from "@/@types/auth";
import api from "@/app/services/api";
import { useMutation } from "react-query";

const signup = async (credentials: CredentialsI) => {
  const response = await api.post("/auth/signup", credentials);
  return response.data;
};

const useSignup = () => {
  return useMutation(signup, {
    onSuccess: () => {
      // console.log("usuario cadastrado com sucesso");
    },
  });
};

export default useSignup;
