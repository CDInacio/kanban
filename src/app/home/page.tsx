"use client";
import Boards from "@/components/boards/Boards";
import Nav from "@/components/nav/Nav";
// import useGetTasks from "@/queries/usegetTasks";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // const { data } = useGetTasks();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <Nav />
      <Boards />
    </>
  );
};

export default Home;
