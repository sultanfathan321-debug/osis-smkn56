import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
    // If MONGODB_URI is missing, we don't throw an error immediately during build.
    // This allows the build to complete. It will only fail if accessed at runtime.
    if (process.env.NODE_ENV === 'production') {
        console.warn('Warning: MONGODB_URI is missing. Database features will not work.');
    }
    clientPromise = Promise.resolve(null);
} else {
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
