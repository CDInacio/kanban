import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'

export async function GET(req: Request, res: Response) {
    const db = await connectToDatabase()

    const data = await db.collection('tasks').find().sort({ createdAt: -1 }).toArray()

    return NextResponse.json(data)

}