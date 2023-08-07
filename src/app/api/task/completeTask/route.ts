import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { data } = await request.json()
    try {
        const db = await connectToDatabase();
        const taskId = new ObjectId(data.taskId)
        const task = await db.collection('tasks').findOne({ _id: taskId })

        if (!task) return NextResponse.json({ message: 'Task not found' }, { status: 404 })

        const subTaskId = task.subTasks.findIndex((subTask: any) => subTask.id === data.subId)

        if (subTaskId === -1) return NextResponse.json({ message: 'Subtask not found' }, { status: 404 })

        const updatedSubtask = {
            ...task.subTasks[subTaskId],
            done: !task.subTasks[subTaskId].done,
            updatedAt: new Date(),
        }

        const response = await db.collection('tasks').updateOne({ _id: taskId }, { $set: { [`subTasks.${subTaskId}`]: updatedSubtask } })
        console.log(response)
        return NextResponse.json('response')
    } catch (error) {
        console.log(error)
    }
}