import type { NextAuthOptions } from "next-auth";
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const OPTIONS: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    // pages: {
    //     signIn: '/auth/signin',
    // }
}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST };

