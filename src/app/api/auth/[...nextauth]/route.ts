import connectToDatabase from "@/lib/db";
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
    callbacks: {
        async signIn({ profile }) {
            try {
                const db = await connectToDatabase()
                const user = await db.collection('users').findOne({ email: profile?.email })

                if (!user) {
                    const newUser = {
                        name: profile?.name,
                        email: profile?.email,
                        image: profile?.picture,
                    }
                    await db.collection('users').insertOne(newUser)
                }
                return true;
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST };

