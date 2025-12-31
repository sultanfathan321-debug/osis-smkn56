import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
};

let client;
let clientPromise;

if (!uri) {
    if (process.env.NODE_ENV === 'production') {
        console.warn('Warning: MONGODB_URI is missing. Database features will not work.');
    }
    clientPromise = Promise.resolve(null);
} else {
    // In production, we want to avoid connecting during the build phase.
    // Next.js triggers module evaluation during build.
    if (process.env.NODE_ENV === 'production') {
        // We defer the creation and connection of the client until it's actually used.
        // However, the standard expectation is that clientPromise is a promise of a client.
        // We'll keep it as a promise but only trigger it in a way that handles build time.
        client = new MongoClient(uri, options);
        clientPromise = client.connect().catch(err => {
            console.error("MongoDB Connection Error:", err);
            return null;
        });
    } else {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    }
}

export default clientPromise;
