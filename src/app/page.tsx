import Boards from "@/components/boards/Boards";
import Nav from "@/components/nav/Nav";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <Nav />
      <Boards />
    </>
  );
};

export default Home;
