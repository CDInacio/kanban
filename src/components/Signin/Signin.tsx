"use client";
import TextInput from "@/components/Forms/TextInput";
import Card from "@/components/Surfaces/Card";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();

  const handleClick = () => setShow(!show);

  const router = useRouter();

  const handleLoginWithProvider = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  const handleLoginWithCredentials = async () => {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <div className="absolute top-[50px] left-[50px] flex text-3xl italic text-white">
        <h1 className="font-thin">Easy</h1>
        <h1 className="font-bold">Task</h1>
      </div>
      <Card className="w-[600px]">
        <h2 className="text-3xl font-bold text-neutral-800 text-center mb-[40px]">
          Login
        </h2>
        <div className="flex flex-col">
          <TextInput
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mb-[10px]"
            placeholder="Email"
            type="email"
          />
          <div className="relative mb-[10px]">
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
          <button
            onClick={handleLoginWithCredentials}
            type="submit"
            className="bg-neutral-800 py-[10px] rounded-sm text-white hover:bg-neutral-900 transition ease-out duration-300"
          >
            Entrar
          </button>
        </div>
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">ou entre com</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <>
          <div
            onClick={() => handleLoginWithProvider("github")}
            className="mb-[10px] flex bg-neutral-700 hover:bg-neutral-800 transition ease-out duration-300 cursor-pointer text-white justify-center items-center rounded-sm  py-[10px]"
          >
            <FaGithub size={25} />
            <span className="ml-[10px]">Entrar com Github</span>
          </div>
          <div
            onClick={() => handleLoginWithProvider("google")}
            className="flex  text-neutral-600 justify-center items-center rounded-sm border-[1px] border-neutral-300 py-[10px] cursor-pointer hover:bg-neutral-100 transition ease-out duration-300"
          >
            <FcGoogle size={25} />
            <span className="ml-[10px]">Entrar com Google</span>
          </div>
          <div
            onClick={() => handleLoginWithProvider("twitter")}
            className="mt-[10px] flex bg-sky-700 hover:bg-sky-800 transition ease-out duration-300 cursor-pointer text-white justify-center items-center rounded-sm  py-[10px]"
          >
            <FaGithub size={25} />
            <span className="ml-[10px]">Entrar com Twitter</span>
          </div>
        </>
        <div className="mt-[100px] flex justify-center">
          <p className="text-neutral-600">Não possui uma conta?</p>
          <Link href="/signup" className="ml-[5px] text-neutral-900 font-bold">
            Cadastre-se
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signin;
