"use client";

import { Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <main className="mt-10">
      {!session ? (
        <button type="button" onClick={handleSignIn}>
          entrar
        </button>
      ) : (
        <button>sair</button>
      )}
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button
        variant="contained"
        color="primary"
        className="w-full mt-[10px]"
        type="submit"
      >
        Entrar
      </Button>
    </main>
  );
}
