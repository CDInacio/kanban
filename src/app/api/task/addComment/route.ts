import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const comment = await req.json();
    try {
        const db = await connectToDatabase()
        const taskId = new ObjectId(comment.taskId)
        const task = await db.collection('tasks').findOne({ _id: taskId })

        if (!task) {
            return NextResponse.json({ message: 'Task not found' })
        }

        const newComment = {
            text: comment.text,
            author: {
                name: comment.author.name,
                image: comment.author.image
            },
            id: comment.id,
            createdAt: comment.createdAt
        }

        const res = await db.collection('tasks').updateOne({ _id: taskId }, {
            $push: {
                comments: newComment
            }
        })

        return NextResponse.json({ message: 'Comment created successfully' })
    } catch (error) {
        return console.log(error)
    }

}