"use client";

import TextInput from "@/components/Forms/TextInput";
import Card from "@/components/Surfaces/Card";
import { FormEvent, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/;

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateErrors = () => {
    let errors: any = {};

    if (credentials.username.trim() === "") {
      errors.username = "Nome de usuário é obrigatório";
    }
    if (credentials.email.trim() === "") {
      errors.email = "E-mail é obrigatório";
    }
    if (!passwordRegex.test(credentials.password)) {
      errors.password = "Senha inválida";
    }
    if (credentials.password.trim() === "") {
      errors.password = "Senha é obrigatória";
    }
    if (credentials.confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirmação de senha é obrigatória";
    }

    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateErrors();
    console.log(errors);
  };

  console.log();
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <Card className="w-[600px]">
        <h2 className="text-3xl font-bold text-neutral-800 text-center mb-[40px]">
          Cadastro
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextInput
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
            className="mb-[10px]"
            placeholder="Nome de usuário"
            type="text"
          />
          <TextInput
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mb-[10px]"
            placeholder="Email"
            type="email"
          />
          <div className="mb-[10px] ">
            <TextInput
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full"
              placeholder="Senha"
              type="password"
            />
            <p className="text-sm text-neutral-400">
              A senha deve conter letras maiúsculas, minusculas e caracteres
              especiais
            </p>
          </div>
          <TextInput
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="mb-[10px]"
            placeholder="Confirmar senha"
            type="password"
          />

          <button className="bg-neutral-800 py-[10px] rounded-sm text-white hover:bg-neutral-900 transition ease-out duration-300">
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
        <div>
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
        </div>
      </Card>
    </div>
  );
};

export default Signup;
