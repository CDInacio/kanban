import Signin from "@/components/Signin/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return <Signin />;
};

export default Page;
