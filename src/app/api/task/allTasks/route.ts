import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'

export async function GET(req: Request, res: Response) {
    const db = await connectToDatabase()

    const data = await db.collection('tasks').find().toArray()

    return NextResponse.json(data)

}