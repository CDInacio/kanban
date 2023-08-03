"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <main className="mt-10">
      {!session ? (
        <button className="bg-red-400" type="button" onClick={handleSignIn}>
          entrar
        </button>
      ) : (
        <button className="bg-red-400" onClick={handleSignOut}>
          sair
        </button>
      )}
    </main>
  );
}
