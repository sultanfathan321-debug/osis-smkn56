import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
};

let client;
let clientPromise;

export default async function getMongoClient() {
    if (clientPromise) return clientPromise;

    if (!uri) {
        throw new Error('MONGODB_URI environment variable is missing in Vercel settings.');
    }

    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(uri, options);
        clientPromise = client.connect().catch(err => {
            console.error("MongoDB Connection Error:", err);
            throw new Error('Failed to connect to MongoDB Atlas. Check your credentials and IP Network Access. Details: ' + err.message);
        });
    }

    return clientPromise;
}
