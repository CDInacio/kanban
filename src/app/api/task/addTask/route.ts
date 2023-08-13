import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const task = await req.json();
    task.createdAt = new Date().toISOString()
    try {
        const db = await connectToDatabase()
        const response = await db.collection('tasks').insertOne(task)
        return NextResponse.json({ message: 'Task created successfully' })
    } catch (error) {
        return console.log(error)
    }

}