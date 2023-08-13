import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: Response) {
    const task = await req.json();
    const id = task._id
    console.log(task)
    task.updatedAt = new Date().toISOString()
    try {
        const db = await connectToDatabase();
        const taskId = new ObjectId(id)
        let { _id, ...rest } = task
        const response = await db.collection('tasks').updateOne({ _id: taskId }, { $set: rest })
        console.log(response)
        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
    }
}