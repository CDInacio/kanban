import connectToDatabase from "@/lib/db";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const OPTIONS: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, password } = credentials as { email: string, password: string }

                try {
                    const db = await connectToDatabase()
                    const user = await db.collection('users').findOne({ email: email })
                    if (user) {
                        const passwordMatch = await bcrypt.compare(password, user.password)
                        if (passwordMatch) {
                            return user
                        }
                    }
                    return null
                } catch (error) {

                }

                return {
                    id: "1234",
                    name: "John Doe",
                    email: "john@gmail.com",
                    role: "admin",
                }
            }
        }),
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

