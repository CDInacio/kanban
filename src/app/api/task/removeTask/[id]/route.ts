import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        const db = await connectToDatabase();
        const taskId = new ObjectId(id)
        const response = await db.collection('tasks').deleteOne({ _id: taskId })
        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
    }
}