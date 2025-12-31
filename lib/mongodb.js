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

    let connectionString = process.env.MONGODB_URI || process.env.MONGODB_URL;

    if (connectionString) {
        // Strip out accidental "MONGODB_URI=" or "MONGODB_URL=" prefix if user pasted it by mistake
        connectionString = connectionString.replace(/^(MONGODB_URI|MONGODB_URL)=/, '').trim();
    }

    if (!connectionString) {
        throw new Error('Database connection string is missing. Please add MONGODB_URI or MONGODB_URL to your Vercel Environment Variables.');
    }

    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(connectionString, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(connectionString, options);
        clientPromise = client.connect().catch(err => {
            console.error("MongoDB Connection Error:", err);
            throw new Error('Failed to connect to MongoDB Atlas. Check your credentials and IP Network Access. Details: ' + err.message);
        });
    }

    return clientPromise;
}
