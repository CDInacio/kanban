import connectToDatabase from "@/lib/db";
import bcrypt from "bcrypt";

import type { NextAuthOptions } from "next-auth";
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, password } = credentials as { email: string, password: string }

                const db = await connectToDatabase()
                const user = await db.collection('users').findOne({ email: email })
                const passwordMatch = await bcrypt.compare(password, user.password)
                if (!passwordMatch) {
                    throw new Error('Password does not match')
                }
                return user

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID ?? "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET ?? ""
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ profile }) {
            try {
                const db = await connectToDatabase()
                const user = await db.collection('users').findOne({ email: profile?.email })

                if (!user) {
                    const newUser = {
                        name: profile?.name,
                        email: profile?.email,
                        // image: profile?.picture,
                    }
                    await db.collection('users').insertOne(newUser)
                }
                return true;
            } catch (error) {
                console.log(error)
                return false
            }
        },
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user as any
            session.user = user
            return session
        }

    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };

