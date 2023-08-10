"use client";

import { CredentialsI } from "@/@types/auth";
import TextInput from "@/components/Forms/TextInput";
import Card from "@/components/Surfaces/Card";
import useSignup from "@/queries/useSignup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/;
const usernameRegex = /^[a-zA-Z_]+$/;

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, data, isLoading, isError } = useSignup();
  const [credentials, setCredentials] = useState<CredentialsI>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateErrors = () => {
    let errors: any = {};

    if (!usernameRegex.test(credentials.name)) {
      errors.name = "Nome de usuário inválido.";
    }

    if (credentials.email.trim() === "") {
      errors.email = "E-mail é obrigatório.";
    }
    if (!passwordRegex.test(credentials.password)) {
      errors.password = "Senha inválida.";
    }
    if (credentials.password.trim() === "") {
      errors.password = "Senha é obrigatória.";
    }
    if (credentials.confirmPassword!.trim() === "") {
      errors.confirmPassword = "Confirmação de senha é obrigatória.";
    }
    if (credentials.confirmPassword !== credentials.password) {
      errors.confirmPassword = "Confirmação de senha incorreta.";
    }

    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateErrors();

    if (Object.keys(errors).length) {
      Object.values(errors).forEach((errorMsg: any) => {
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      return;
    }

    mutate({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });
  };

  useEffect(() => {
    if (data?.status === 200) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
      return;
    }

    toast.error(data?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [data]);

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <Card className="w-[600px]">
        <h2 className="text-3xl font-bold text-neutral-800 text-center mb-[40px]">
          Cadastro
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-[10px]">
            <TextInput
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full"
              placeholder="Nome de usuário"
              type="text"
            />
            <p className="ml-[5px] text-sm text-neutral-400">
              Nome de usuário deve conter apenas letras
            </p>
          </div>
          <TextInput
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mb-[10px]"
            placeholder="Email"
            type="email"
          />
          <div className="mb-[10px] ">
            <div className="relative">
              <TextInput
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
              />
              <span
                className="absolute top-[30%] right-[15px] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </span>
            </div>
            <p className="ml-[5px] text-sm text-neutral-400">
              A senha deve conter numeros, letras maiúsculas, minusculas e
              caracteres especiais
            </p>
          </div>
          <div className="relative">
            <TextInput
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="mb-[10px] w-full"
              placeholder="Confirmar senha"
              type={showConfirmPassword ? "text" : "password"}
            />
            <span
              className="absolute top-[30%] right-[15px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>

          <button
            disabled={isLoading}
            className={` ${
              isLoading
                ? "bg-neutral-400"
                : "bg-neutral-800 hover:bg-neutral-900"
            } py-[10px] rounded-sm text-white  transition ease-out duration-300`}
          >
            Enviar
          </button>
        </form>
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">
            ou cadastre com
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <>
          <div className="mb-[10px] flex bg-blue-700 hover:bg-blue-800 transition ease-out duration-300 cursor-pointer text-white justify-center items-center rounded-sm  py-[10px]">
            <FaFacebookF size={25} />
            <span className="ml-[10px]">Entrar com Facebook</span>
          </div>
          <div
            // onClick={() => handleLogin("google")}
            className="flex  text-neutral-600 justify-center items-center rounded-sm border-[1px] border-neutral-300 py-[10px] cursor-pointer hover:bg-neutral-100 transition ease-out duration-300"
          >
            <FcGoogle size={25} />
            <span className="ml-[10px]">Entrar com Google</span>
          </div>
        </>
        <div className="mt-[100px] flex justify-center">
          <p className="text-neutral-600">Já possui uma conta?</p>
          <Link href="/signin" className="ml-[5px] text-neutral-900 font-bold">
            Entre aqui
          </Link>
        </div>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default Signup;
