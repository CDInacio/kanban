"use client";
import TextInput from "@/components/Forms/TextInput";
import Card from "@/components/Surfaces/Card";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Signin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();

  const handleClick = () => setShow(!show);

  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/home");
  //   }
  // }, [status]);

  const handleLoginWithProvider = (provider: string) => {
    const res = signIn(provider, { callbackUrl: "/home" });
  };

  const handleLoginWithCredentials = async () => {
    const res = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: "/home",
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
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
          <TextInput
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            className="mb-[10px]"
            placeholder="Senha"
            type="password"
          />
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
          <div className="mb-[10px] flex bg-blue-700 hover:bg-blue-800 transition ease-out duration-300 cursor-pointer text-white justify-center items-center rounded-sm  py-[10px]">
            <FaFacebookF size={25} />
            <span className="ml-[10px]">Entrar com Facebook</span>
          </div>
          <div
            onClick={() => handleLoginWithProvider("google")}
            className="flex  text-neutral-600 justify-center items-center rounded-sm border-[1px] border-neutral-300 py-[10px] cursor-pointer hover:bg-neutral-100 transition ease-out duration-300"
          >
            <FcGoogle size={25} />
            <span className="ml-[10px]">Entrar com Google</span>
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
