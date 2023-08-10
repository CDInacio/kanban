import connectToDatabase from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const credentials = await req.json();
    try {
        const db = await connectToDatabase()
        const userExists = await db.collection('users').findOne({ email: credentials.email })

        if (userExists) {
            return NextResponse.json({ status: 500, message: 'Usuário já cadastrado!' })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(credentials.password, saltRounds)
        const newUser = {
            ...credentials,
            password: hashedPassword
        }
        await db.collection('users').insertOne(newUser)
        return NextResponse.json({ status: 200, message: 'Usuário cadastrado com sucesso!' })
    } catch (error) {
        return console.log(error)
    }

}