"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button, Divider, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

const Signin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <Card className=" w-[400px] px-[30px] py-[50px]">
        <Button
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          variant="outlined"
          className="w-full"
        >
          Entrar com o Google
        </Button>
        <Divider className="my-[20px]" />
        <Typography variant="body1" className="text-center">
          Entrar com email/senha
        </Typography>
        <div className="flex flex-col">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="my-[10px]"
          />
          <TextField id="outlined-basic" label="Senha" variant="outlined" />
        </div>
        <Button
          variant="contained"
          className="w-full mt-[10px] bg-sky-600 hover:bg-sky-700"
          type="submit"
        >
          Entrar
        </Button>
      </Card>
    </div>
  );
};

export default Signin;
