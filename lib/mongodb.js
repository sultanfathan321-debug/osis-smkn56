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
        console.warn('MONGODB_URI is missing');
        return null;
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
            return null;
        });
    }

    return clientPromise;
}
