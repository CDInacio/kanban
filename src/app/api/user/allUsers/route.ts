import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        const db = await connectToDatabase()
        const user = await db.collection('users').find().toArray()
        return new Response(JSON.stringify(user))
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json({ message: "ola" })
}