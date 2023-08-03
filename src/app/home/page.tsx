"use client";
import Nav from "@/components/nav/Nav";
import useGetTasks from "@/queries/usegetTasks";
import { signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  const data = useGetTasks();

  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <Nav />
      <p onClick={handleLogout}>sair</p>
    </>
  );
};

export default Home;
