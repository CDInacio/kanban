// import { useSession,signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const useIsAuth = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     }
//   }, [status]);

//   return { session, signIn, signOut };
// };

// export default useIsAuth;
