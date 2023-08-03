import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://claudiodantas1996:general01@cluster0.yswmgtg.mongodb.net/';
const client = new MongoClient(uri)

let cachedDb: any = null;

const connectToDatabase = async () => {
    if (cachedDb && cachedDb?.serverConfig?.isConnected()) {
        return cachedDb;
    }
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        cachedDb = db;
        return db
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase;

