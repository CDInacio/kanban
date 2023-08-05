import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const task = await req.json();

    task.createdAt = new Date().toISOString()

    try {
        const db = await connectToDatabase()
        await db.collection('tasks').insertOne(task)
    } catch (error) {

    }

    return NextResponse.json({ message: "ola" })
}